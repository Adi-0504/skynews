
/* =========================
   📊 平均
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
   🎯 主題（關鍵：一篇只選一個）
========================= */
function pickTopic(){

  const r = Math.random();

  if(r < 0.25) return "weather";
  if(r < 0.5) return "economy";
  if(r < 0.75) return "transport";
  return "society";
}

/* =========================
   📰 標題（專題型）
========================= */
function pickHeadline(topic){

  if(topic === "weather") return "空島氣候系統觀測報告";
  if(topic === "economy") return "四島經濟流動觀測專題";
  if(topic === "transport") return "空鷹航運系統運作分析";
  return "四島社會運作綜合觀察";
}

/* =========================
   🧠 專題新聞生成（核心🔥）
========================= */
function buildTopicArticle(topic, env, eco, trans, soc){

  if(topic === "weather"){

    return `
【空島通訊社氣候專題】

本日空島氣候系統整體維持穩定，但雲層結構呈現緩慢變化趨勢。觀測中心指出，目前浮空層溫度約 ${env.temp.toFixed(1)}°C，雲帶分布較過去略為分散。

森林島上空雲層厚度稍有增加，平原島則維持相對穩定的晴空環境。這種差異被認為與中層氣流循環有關。

過去數小時內曾出現短暫浮雨現象，雖然持續時間不長，但顯示雲層水氣仍在局部積累。

氣象單位指出，目前並無極端氣候跡象，但雲層流動速度的細微變化仍值得持續追蹤。

整體而言，本日氣候屬於「穩定但持續變動」的狀態。
`;
  }

  if(topic === "economy"){

    return `
【空島通訊社經濟專題】

mato damu流通系統今日維持穩定，但不同島嶼之間的交易活躍度出現差異。

平原島農業輸出略為增加，顯示市場需求正在回升；礦山島則出現短暫減速，可能與運輸調度有關。

經濟觀測單位指出，目前整體市場並未出現結構性變動，但區域性波動開始變得明顯。

部分商會認為，空鷹航線的微幅延遲可能正在影響物流節奏，進而造成短期價格差異。

整體來看，四島經濟仍處於穩定區間，但區域差異正在擴大。
`;
  }

  if(topic === "transport"){

    return `
【空島通訊社航運專題】

空鷹航運系統今日運作大致穩定，但部分航線出現微幅調整。

平均延遲率約 ${trans.delay.toFixed(0)}%，主要集中於中層氣流較不穩定的航段。

馴鷹員表示，空鷹對氣流變化相當敏感，部分個體會主動降低飛行高度以避開不穩定區域。

航運中心已調整部分航道配置，以維持四島之間的基本連結效率。

目前整體物流仍正常運作，但航線穩定性正進入觀測階段。
`;
  }

  return `
【空島通訊社社會專題】

四島社會運作今日維持穩定，各島居民生活節奏正常。

市場、教育與基礎設施均持續運行，未觀測到重大異常事件。

觀測資料顯示，居民活動密度略有上升，特別是在平原島市場區域。

社會研究單位指出，目前整體社會穩定度維持良好，但仍需持續關注人口流動變化。

整體而言，四島社會結構仍保持穩定。
`;
}

/* =========================
   🚀 50篇（每篇=不同主題專題）
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

    const title = pickHeadline(topic);
    const content = buildTopicArticle(topic, env, eco, trans, soc);

    articles.push({
      title,
      content,
      time: new Date().toLocaleString(),
      topic
    });
  }

  return articles;
}
