
/* =========================
   🌍 世界事件
========================= */
function randomEvent(){

  const events = [
    {
      title: "雲層穩定流動",
      desc: "森林島上空氣流維持自然循環"
    },
    {
      title: "空鷹航線順暢",
      desc: "平原島航班準點率提升"
    },
    {
      title: "mato damu市場穩定",
      desc: "礦山島交易節奏正常"
    },
    {
      title: "居民活動活躍",
      desc: "各島市場與學校維持運作"
    }
  ];

  return events[Math.floor(Math.random()*events.length)];
}

/* =========================
   🏪 市集資訊
========================= */
function marketInfo(){

  const markets = [
    "金穗市集（平原島）",
    "雲橋市集（森林島）",
    "礦心交易所（礦山島）",
    "潮聲市集（沙灘島）"
  ];

  const items = [
    "雲莓momu baru 8折",
    "森椒新鮮到貨",
    "波光鹽特價",
    "椰子飲品買一送一",
    "空鷹羽飾限量"
  ];

  const status = [
    "正常營業",
    "人潮適中",
    "早市熱絡",
    "午後補貨中"
  ];

  const m = markets[Math.floor(Math.random()*markets.length)];
  const i = items[Math.floor(Math.random()*items.length)];
  const s = status[Math.floor(Math.random()*status.length)];

  return `📍 ${m}
狀態：${s}
特價：${i}`;
}

/* =========================
   🌿 趣事系統（重點🔥）
========================= */
function funFact(){

  const fun = [
    "有一隻空鷹今天在雲層裡繞了三圈才找到航道",
    "森林島的商人說今天的雲莓比昨天甜一點點",
    "有人在市集看到椰子自己滾下坡，被當成好兆頭",
    "礦山島的鐘聲比平常慢了三秒，但沒人知道原因",
    "沙灘島的小販今天把波光鹽排成了星星形狀",
    "一群學生在雲橋市集比賽誰能聽懂空鷹叫聲"
  ];

  return fun[Math.floor(Math.random()*fun.length)];
}

/* =========================
   🧠 新聞生成
========================= */
function buildArticle(event){

  const intro = `【空島通訊社報導】${event.title}`;

  const body = `觀測顯示：${event.desc}，整體系統維持穩定運作。`;

  const market = marketInfo();

  const fun = funFact();

  const closing = `今日空島運作維持正常，生活節奏平穩。`;

  return `${intro}

${body}

---

🏪 市集情報
${market}

---

🌿 空島趣事
${fun}

---

${closing}`;
}

/* =========================
   🚀 50篇生成
========================= */
async function generateNewsBatch(){

  let articles = [];

  for(let i=0;i<50;i++){

    const event = randomEvent();

    articles.push({
      title: `【空島通訊社】${event.title}`,
      content: buildArticle(event),
      time: new Date().toLocaleString()
    });
  }

  return articles;
}
