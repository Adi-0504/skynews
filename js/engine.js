
function avg(arr){

  let keys = Object.keys(arr[0]);
  let out = {};

  keys.forEach(k=>{
    out[k] = arr.reduce((a,b)=>a+(b[k]||0),0)/arr.length;
  });

  return out;
}

/* =========================
   🌪 每篇差異（關鍵）
========================= */
function jitter(obj){

  let out = {};

  for(let k in obj){
    let v = obj[k] || 0;
    out[k] = v * (0.82 + Math.random()*0.36);
  }

  return out;
}

/* =========================
   主題
========================= */
function pickTopic(){

  const r = Math.random();

  if(r < 0.22) return "weather";
  if(r < 0.44) return "economy";
  if(r < 0.66) return "transport";
  if(r < 0.88) return "society";
  return "breaking";
}

/* =========================
   標題（半正式）
========================= */
function pickHeadline(topic, env,eco,trans,soc){

  if(topic === "weather"){
    return "氣象觀測：空島雲層結構維持穩定";
  }

  if(topic === "economy"){
    return eco.price > 150
      ? "市場動態：mato damu流通出現上升"
      : "經濟觀測：四島市場維持平穩";
  }

  if(topic === "transport"){
    return trans.delay > 30
      ? "交通通報：空鷹航線出現延遲情形"
      : "空鷹航運：整體運作維持正常";
  }

  if(topic === "society"){
    return "社會觀察：四島居民活動穩定進行";
  }

  return "突發觀測：高層氣流出現短暫異動";
}

/* =========================
   🧠 半正式長文（重點🔥）
========================= */
function buildLongArticle(topic, env,eco,trans,soc){

  const intro = `
空島通訊社報導。

今日四島浮空系統整體運作維持穩定。根據觀測站資料顯示，雲層結構與氣流分布未出現異常變化，但局部區域仍有細微波動。
`;

  const weather = `
氣象單位指出，目前平均氣溫約為 ${env.temp.toFixed(1)}°C。
雲層分布整體平穩，但森林島上空仍有局部雲層增厚現象，推測與中層氣流活動有關。
短時間內曾出現輕微浮雨，但未影響地面活動。
`;

  const economy = `
經濟觀測顯示，mato damu流通維持穩定水準。
平原島農業交易量略有提升，而礦山島輸出節奏則出現輕微放緩。
市場單位表示，目前變化屬於正常供需調整範圍。
`;

  const transport = `
交通方面，空鷹航線平均延遲率約為 ${trans.delay.toFixed(0)}%。
部分航線因氣流變化進行高度調整，但整體運輸系統仍維持正常。
馴鷹員回報，空鷹狀態穩定，飛行行為無異常。
`;

  const society = `
社會層面顯示，各島居民日常活動維持穩定節奏。
市場、教育與港口運作均正常進行，未有重大事件通報。
整體社會穩定度維持在良好水平。
`;

  const observation = `
觀測站補充指出，今日雲層中段曾出現短暫回旋氣流。
該現象持續時間不長，目前已消散，但仍列入追蹤觀測項目。
`;

  const ending = `
綜合評估顯示，四島浮空系統仍維持穩定運作狀態。
空島通訊社將持續追蹤後續變化。
`;

  return intro + weather + economy + transport + society + observation + ending;
}

/* =========================
   🚀 每日50則（正式輸出）
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

    articles.push({
      title,
      content,
      time: new Date().toLocaleString(),
      topic
    });
  }

  return articles;
}
