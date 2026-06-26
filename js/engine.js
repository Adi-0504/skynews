
function avg(arr){

  let keys = Object.keys(arr[0]);
  let out = {};

  keys.forEach(k=>{
    out[k] = arr.reduce((a,b)=>a+(b[k]||0),0)/arr.length;
  });

  return out;
}

/* =========================
   標題生成
========================= */
function pickHeadline(env,eco,trans,soc){

  const pool = [
    "空島系統維持穩定",
    "四島物流運作正常",
    "市場波動輕微",
    "氣候條件維持平穩",
    "空鷹航線順暢"
  ];

  if(eco.price > 150) return "市場價格小幅上升";
  if(trans.delay > 30) return "空鷹交通出現延誤";
  if(env.rain > 60) return "降雨影響部分農業";

  return pool[Math.floor(Math.random() * pool.length)];
}

/* =========================
   生成原始新聞草稿
========================= */
function generateArticle(env,eco,trans,soc){

  const base = [
    `氣溫 ${env.temp.toFixed(1)}°C，整體氣候穩定。`,
    `降雨指數 ${env.rain.toFixed(0)}，目前無重大異常。`,
    `經濟指數 ${eco.price.toFixed(0)}，市場運作正常。`,
    `交通延遲 ${trans.delay.toFixed(0)}%，空鷹運輸持續運作。`,
    `各島系統維持基本穩定運行。`,
    `報導編號 ${Math.random().toString(36).slice(2,8)}`
  ];

  return base.join(" ");
}

/* =========================
   生成10篇新聞（LLM版🔥）
========================= */
async function generateNewsBatch(world){

  const env = avg(world.env);
  const eco = avg(world.economy);
  const trans = avg(world.transport);
  const soc = avg(world.society);

  let articles = [];

  for(let i=0;i<10;i++){

    // 🧠 標題
    let title = pickHeadline(env,eco,trans,soc);

    // 🔥 增加隨機突發事件
    if(Math.random() > 0.7){
      title = "突發：空鷹航線短暫波動";
    }

    // 📰 草稿
    let draft = generateArticle(env,eco,trans,soc);

    // 🧠 LLM潤稿（關鍵修正 async）
    let content = draft;

    if(typeof polish === "function"){
      content = await polish(draft);
    }

    articles.push({
      title,
      content,
      time: new Date().toLocaleString()
    });
  }

  return articles;
}
