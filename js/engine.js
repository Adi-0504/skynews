
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
   🧠 主題分配器
========================= */
function pickTopic(){

  const r = Math.random();

  if(r < 0.25) return "weather";
  if(r < 0.5)  return "economy";
  if(r < 0.7)  return "transport";
  if(r < 0.9)  return "society";
  return "breaking";
}

/* =========================
   標題生成（依主題）
========================= */
function pickHeadline(topic, env, eco, trans, soc){

  if(topic === "weather"){
    return "氣候觀測：空島天氣系統穩定運作";
  }

  if(topic === "economy"){
    if(eco.price > 150) return "市場價格出現上升壓力";
    return "經濟活動維持穩定";
  }

  if(topic === "transport"){
    if(trans.delay > 30) return "空鷹航線出現延誤";
    return "空鷹運輸系統正常運行";
  }

  if(topic === "society"){
    return "四島社會運作穩定";
  }

  if(topic === "breaking"){
    return "突發：空鷹航線氣流異常事件";
  }

  return "空島新聞更新";
}

/* =========================
   📰 依主題生成內文
========================= */
function generateArticle(topic, env,eco,trans,soc){

  const noise = Math.random();

  if(topic === "weather"){

    return `
空島通訊社氣象中心指出，目前四島氣候系統維持穩定運作。

觀測數據顯示，平均氣溫約 ${(env.temp+noise).toFixed(1)}°C，降雨指數 ${(env.rain+noise*10).toFixed(0)}。
雲層分布呈現輕微變化，但尚未達到警戒標準。

氣象單位表示，目前沒有極端氣候事件發生，各島居民活動可正常進行。
`;
  }

  if(topic === "economy"){

    return `
經濟觀測報告指出，目前市場活動持續穩定。

市場指數約 ${(eco.price+noise*5).toFixed(0)}，部分商品價格出現小幅波動。
分析指出，這與近期物流調整與需求變化有關。

整體而言，經濟系統仍維持健康運作狀態。
`;
  }

  if(topic === "transport"){

    return `
空鷹交通中心發布最新運輸報告。

目前航線延遲率約 ${(trans.delay+noise*3).toFixed(0)}%，部分航班受到氣流影響。
但整體航運系統仍維持穩定，未出現大規模延誤。

交通單位持續監控風場變化，以確保安全。
`;
  }

  if(topic === "society"){

    return `
社會運作觀察報告指出，各島居民生活秩序穩定。

教育、市場與日常活動均正常進行，社會信心維持高點。
目前未觀察到重大社會事件或異常情況。
`;
  }

  return `
突發事件通報：空鷹航線出現短暫氣流異常。

相關單位已介入調查，目前部分航線延後，但未造成重大影響。
`;
}

/* =========================
   🚀 每日50則（主題版）
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

    let content = generateArticle(topic, env,eco,trans,soc);

    if(typeof polish === "function"){
      content = await polish(content);
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
