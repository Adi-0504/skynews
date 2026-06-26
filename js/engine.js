
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
   🌪 微變動（讓每篇不同）
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
   🧠 事件池（核心）
========================= */
function randomEvent(){

  const events = [
    {
      lead: "森林島上空觀測到雲層結構輕微異常",
      detail: "雲層在中層氣流帶出現短暫偏移現象"
    },
    {
      lead: "空鷹航線於平原島區域出現短暫延遲",
      detail: "部分航道因氣流變化進行高度調整"
    },
    {
      lead: "mato damu流通在礦山島出現波動",
      detail: "交易節奏受到物流節點影響而略為放緩"
    },
    {
      lead: "沙灘島觀測到局部浮雨增強現象",
      detail: "雲層水氣密度短時間內上升"
    },
    {
      lead: "浮空層監測到輕微氣流回旋",
      detail: "該現象持續時間短暫，目前已逐步消散"
    }
  ];

  return events[Math.floor(Math.random()*events.length)];
}

/* =========================
   🎯 主題
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
   📰 標題（半正式）
========================= */
function pickHeadline(e){

  return `【空島通訊社報導】${e.lead}，相關單位持續監測中`;
}

/* =========================
   🧠 新聞稿生成（核心）
========================= */
function buildLongArticle(topic, env, eco, trans, soc){

  const e = randomEvent();

  const intro = `
空島通訊社報導。

空島監測中心指出，今日觀測到一項浮空層變化事件，目前已啟動持續追蹤機制。
`;

  const lead = `
本次事件為：${e.lead}。
相關單位表示已完成初步數據收集。
`;

  const body1 = `
根據觀測資料顯示，${e.detail}。
該變化主要集中於局部區域，尚未影響整體浮空結構穩定性。
`;

  const body2 = `
氣象與浮空技術單位補充指出，目前系統整體運作正常。
雖有短暫波動，但仍維持在安全監測範圍內。
`;

  const body3 = `
空鷹航運系統已針對相關區域進行航線微調，以避免氣流不穩定區域。
物流運作目前僅出現輕微延遲。
`;

  const body4 = `
專家表示，此類浮空現象屬於常態性變化之一，通常會在短時間內自然消散。
`;

  const closing = `
空島通訊社將持續追蹤本次事件後續發展，並更新最新觀測資訊。
`;

  return intro + lead + body1 + body2 + body3 + body4 + closing;
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

    const env = jitter(baseEnv);
    const eco = jitter(baseEco);
    const trans = jitter(baseTrans);
    const soc = jitter(baseSoc);

    const e = randomEvent();

    const title = pickHeadline(e);
    const content = buildLongArticle("event", env, eco, trans, soc);

    articles.push({
      title,
      content,
      time: new Date().toLocaleString(),
      event: e
    });
  }

  return articles;
}
