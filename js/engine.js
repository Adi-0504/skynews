
function avg(arr){

  let keys = Object.keys(arr[0]);
  let out = {};

  keys.forEach(k=>{
    out[k] = arr.reduce((a,b)=>a+(b[k]||0),0)/arr.length;
  });

  return out;
}

/* =========================
   🌪 微變動
========================= */
function jitter(obj){

  let out = {};

  for(let k in obj){
    let v = obj[k] || 0;
    out[k] = v * (0.85 + Math.random()*0.3);
  }

  return out;
}

/* =========================
   主題
========================= */
function pickTopic(){

  const r = Math.random();

  if(r < 0.25) return "weather";
  if(r < 0.5) return "economy";
  if(r < 0.7) return "transport";
  if(r < 0.9) return "society";
  return "breaking";
}

/* =========================
   標題
========================= */
function pickHeadline(topic, env,eco,trans,soc){

  if(topic === "weather"){
    return "氣候觀測：空島天氣系統維持穩定";
  }

  if(topic === "economy"){
    return eco.price > 150
      ? "市場價格出現上升趨勢"
      : "經濟活動維持穩定運作";
  }

  if(topic === "transport"){
    return trans.delay > 30
      ? "空鷹航線出現延誤情況"
      : "空鷹運輸系統正常運行";
  }

  if(topic === "society"){
    return "四島社會運作持續穩定";
  }

  return "突發：空鷹航線氣流異常事件";
}

/* =========================
   🧠 核心長文生成（重點🔥）
========================= */
function buildLongArticle(topic, env,eco,trans,soc){

  const baseIntro = `
空島通訊社綜合報導指出，本日四島系統仍維持穩定運作。根據最新觀測數據顯示，各項指標雖出現微幅波動，但整體仍在安全範圍內。
`;

  const weather = `
【氣候分析】
目前平均氣溫約 ${(env.temp).toFixed(1)}°C，降雨指數 ${(env.rain).toFixed(0)}。
氣象中心表示，本週雲層結構呈現周期性變化，部分區域可能出現短暫降雨，但不影響整體活動。
`;

  const economy = `
【經濟觀察】
市場指數目前約 ${(eco.price).toFixed(0)}，顯示市場仍處於穩定狀態。
然而部分農產品與礦產交易價格出現波動，分析指出這與物流調整及需求變化有關。
`;

  const transport = `
【交通運輸】
空鷹航線延遲率約 ${(trans.delay).toFixed(0)}%。
雖然部分航線受到氣流影響，但整體運輸效率仍維持穩定。
`;

  const society = `
【社會狀態】
各島居民生活節奏穩定，市場與教育活動正常進行。
社會信心維持高點，未觀測到重大異常事件。
`;

  const expand = `
【延伸觀察】
專家指出，目前系統穩定性雖高，但仍需持續監控氣候與物流變化。
未來幾日可能出現輕微波動，相關單位已啟動預防機制。
`;

  const conclusion = `
綜合評估顯示，四島系統整體維持穩定運作狀態，短期內無重大風險。
`;

  return baseIntro + weather + economy + transport + society + expand + conclusion;
}

/* =========================
   🚀 每日50則（長文版）
========================= */
async function generateNewsBatch(world){

  const baseEnv = avg(world.env);
  const baseEco = avg(world.economy);
  const baseTrans = avg(world.transport);
  const baseSoc = avg(world.society);

  let articles = [];

  for(let i=0;i<50;i++){

    const topic = pickTopic();

    const env = jitter(baseEnv);
    const eco = jitter(baseEco);
    const trans = jitter(baseTrans);
    const soc = jitter(baseSoc);

    const title = pickHeadline(topic, env,eco,trans,soc);

    let content = buildLongArticle(topic, env,eco,trans,soc);

    /* ⚠️ 重點修正：
       LLM 只能「加長」，不能「摘要」
    */
    if(typeof polish === "function"){
      const extra = await polish(content);

      // 🧠 避免被縮短
      if(extra && extra.length > content.length){
        content = extra;
      }
    }

    articles.push({
      title,
      content,
      time: new Date().toLocaleString(),
      topic
    });
  }

  return articles;
}
