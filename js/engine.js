/* =========================
   📊 平均值
========================= */
function avg(arr){

  let keys = Object.keys(arr[0]);
  let out = {};

  keys.forEach(k=>{
    out[k] = arr.reduce((a,b)=>a+(b[k]||0),0)/arr.length;
  });

  return out;
}

/* =========================
   🌪 每篇微變動
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
   🎯 主題
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
   📰 標題
========================= */
function pickHeadline(topic, env,eco,trans,soc){

  if(topic === "weather"){
    return "氣象觀測：空島雲層結構維持穩定";
  }

  if(topic === "economy"){
    return eco.price > 150
      ? "市場動態：mato damu流通略有上升"
      : "經濟觀測：四島市場維持平穩";
  }

  if(topic === "transport"){
    return trans.delay > 30
      ? "交通通報：空鷹航線出現延遲"
      : "空鷹運輸：整體運作正常";
  }

  if(topic === "society"){
    return "社會觀察：四島居民生活穩定";
  }

  return "突發觀測：高層氣流短暫異動";
}

/* =========================
   🧠 核心長文（真正新聞版）
========================= */
function buildLongArticle(topic, env, eco, trans, soc){

  const intro = `
【空島通訊社報導】

空島通訊社觀測中心指出，今日四島浮空系統整體維持穩定運作。雲層結構與氣流軌道未出現明顯異常，但局部區域仍有細微變化持續監測中。
`;

  const weather = `
【氣象觀測】

目前平均氣溫約 ${env.temp.toFixed(1)}°C，降雨指數約 ${env.rain.toFixed(0)}。
森林島上空雲層略有增厚現象，平原島則維持較為穩定的晴空狀態。

上午曾觀測到短暫浮雨現象，持續時間不長，未對地面活動造成影響。
`;

  const economy = `
【經濟動態】

mato damu流通維持穩定。
平原島農業交易活動略有增加，而礦山島出口速度則出現輕微放緩。

市場觀測指出，目前變化屬於正常供需調整，未影響整體經濟結構。
`;

  const transport = `
【交通運輸】

空鷹航線平均延遲率約 ${trans.delay.toFixed(0)}%。
部分航線因中層氣流變化進行臨時調整，部分高空路線出現繞行。

馴鷹員回報，空鷹整體狀態穩定，未觀測到異常行為。
`;

  const society = `
【社會狀態】

四島居民生活節奏維持穩定。
市場、教育與港口活動均正常進行，未有重大事件通報。

社會穩定度維持在高水平。
`;

  const extra = `
【補充觀測】

觀測站於今日下午記錄到短暫雲層回旋現象，持續數分鐘後消散。
同時偵測到輕微氣流波動，但未影響浮空結構安全。
`;

  const conclusion = `
【總結】

整體而言，四島浮空系統仍維持穩定運作。
雖存在細微變化，但均在可控範圍內。

空島通訊社將持續追蹤後續發展。
`;

  const filler = `
補充監測資料顯示，雲層流動維持規律節奏。
空鷹航線整體運行穩定，未出現大規模異常。
`;

  return intro + weather + economy + transport + society + extra + conclusion + filler + filler;
}

/* =========================
   🚀 50則生成
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

    const title = pickHeadline(topic, env, eco, trans, soc);

    const content = buildLongArticle(topic, env, eco, trans, soc);

    articles.push({
      title,
      content,
      time: new Date().toLocaleString(),
      topic
    });
  }

  return articles;
}
