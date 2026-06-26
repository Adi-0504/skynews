function randomEvent(){

  const events = [
    {
      title: "森林島雲層異常移動",
      core: "森林島上空雲層結構出現緩慢偏移",
      impact: "影響中層氣流穩定性"
    },
    {
      title: "空鷹航線短暫延遲",
      core: "平原島航線出現短時間氣流不穩",
      impact: "導致部分航班調整高度"
    },
    {
      title: "mato damu流動波動",
      core: "礦山島交易節奏出現輕微變化",
      impact: "物流節點出現短暫延遲"
    },
    {
      title: "局部浮雨現象增強",
      core: "沙灘島雲層水氣密度上升",
      impact: "短暫影響視距"
    }
  ];

  return events[Math.floor(Math.random()*events.length)];
}

/* =========================
   🧠 單篇完整新聞（重點🔥）
========================= */
function buildArticle(event){

  const lead = `空島通訊社報導：${event.core}，相關單位已展開觀測。`;

  const body1 = `根據初步數據顯示，此次變化主要表現為「${event.impact}」，目前影響範圍仍集中於局部區域。`;

  const body2 = `監測中心指出，浮空層系統整體仍維持穩定狀態，雖然出現短暫波動，但未達警戒標準。`;

  const body3 = `相關航運與物流系統已進行微幅調整，以避免潛在氣流干擾。`;

  const closing = `目前事件仍在持續監測中，空島通訊社將持續更新後續進展。`;

  return `${lead}

${body1}

${body2}

${body3}

${closing}`;
}

/* =========================
   🚀 50篇（每篇獨立事件，不拼段）
========================= */
async function generateNewsBatch(){

  let articles = [];

  for(let i=0;i<50;i++){

    const event = randomEvent();

    articles.push({
      title: `【空島通訊社報導】${event.title}`,
      content: buildArticle(event),
      time: new Date().toLocaleString()
    });
  }

  return articles;
}
