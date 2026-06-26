
function avg(arr){

  let keys = Object.keys(arr[0]);
  let out = {};

  keys.forEach(k=>{
    out[k] = arr.reduce((a,b)=>a+(b[k]||0),0)/arr.length;
  });

  return out;
}

/* =========================
   標題
========================= */
function pickHeadline(env,eco,trans,soc){

  const pool = [
    "空島系統維持穩定運作",
    "四島物流體系持續正常",
    "市場波動幅度有限",
    "氣候條件整體平穩",
    "空鷹航線運行順暢"
  ];

  if(eco.price > 150) return "市場價格出現小幅上升趨勢";
  if(trans.delay > 30) return "空鷹航線出現短暫延誤情況";
  if(env.rain > 60) return "降雨量增加影響部分農業活動";

  return pool[Math.floor(Math.random() * pool.length)];
}

/* =========================
   🔥 生成長新聞（核心）
========================= */
function generateArticle(env,eco,trans,soc){

  const intro = `
空島通訊社綜合報導指出，目前四島系統仍維持穩定運作狀態。根據最新觀測資料顯示，各項基礎數據包含氣候、經濟、交通與社會運作皆在正常範圍內波動，並未出現大規模異常情形。
`;

  const weather = `
在氣候方面，平原島與森林島溫度平均維持在 ${env.temp.toFixed(1)}°C 左右，降雨指數約為 ${env.rain.toFixed(0)}。氣象單位指出，目前雲層分布均勻，未觀測到極端氣候事件，但部分區域仍可能出現短暫降雨變化。
`;

  const economy = `
經濟方面，整體市場指數約為 ${eco.price.toFixed(0)}，顯示市場活動仍處於穩定區間。然而部分農產品與礦產交易價格出現輕微波動，專家指出這可能與近期物流調整有關，但目前尚未對整體經濟造成明顯影響。
`;

  const transport = `
交通系統方面，空鷹航線延遲率約為 ${trans.delay.toFixed(0)}%，整體運輸仍維持正常運作。交通管理中心表示，目前航線調度效率穩定，但仍將持續監測風向與氣流變化，以確保跨島運輸安全。
`;

  const society = `
社會層面觀察顯示，各島居民生活節奏穩定，基礎設施運作正常。教育與市場活動持續進行，並未出現大規模中斷情況。社會指標顯示整體穩定度維持在高水準。
`;

  const conclusion = `
綜合以上資訊，空島通訊社判斷目前四島系統仍處於穩定運作階段。相關單位將持續監測各項數據變化，以確保未來可能出現的環境或經濟波動能被即時應對。
`;

  return intro + weather + economy + transport + society + conclusion;
}

/* =========================
   生成10篇新聞（LLM optional）
========================= */
async function generateNewsBatch(world){

  const env = avg(world.env);
  const eco = avg(world.economy);
  const trans = avg(world.transport);
  const soc = avg(world.society);

  let articles = [];

  for(let i=0;i<10;i++){

    let title = pickHeadline(env,eco,trans,soc);

    if(Math.random() > 0.7){
      title = "突發：空鷹航線出現短暫氣流異常";
    }

    let draft = generateArticle(env,eco,trans,soc);

    let content = draft;

    // 🧠 如果有 LLM 就潤稿（可選）
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
