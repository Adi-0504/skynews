/* =========================
   🌍 世界狀態
========================= */

let articles = [];

let skyTime = {
  day: 1,
  hour: 6,
  minute: 0
};

let worldState = {
  chaos: 0,
  economy: 100,
  weather: 0
};

/* =========================
   ⏱ 時間系統（已放慢）
========================= */

function tickTime(){
  skyTime.minute++;

  if(skyTime.minute >= 65){
    skyTime.minute = 0;
    skyTime.hour++;
  }

  if(skyTime.hour >= 20){
    skyTime.hour = 0;
    skyTime.day++;
  }
}

/* =========================
   🌍 世界變動（穩定版）
========================= */

function updateWorld(){

  worldState.weather += (Math.random() - 0.5) * 1.5;
  worldState.economy += (Math.random() - 0.5) * 1.2;
  worldState.chaos += (Math.random() - 0.5) * 1.8;

  worldState.chaos = Math.max(-15, Math.min(15, worldState.chaos));
  worldState.economy = Math.max(0, Math.min(200, worldState.economy));
}

/* =========================
   🏪 市集
========================= */

const markets = [
  "薩拉村市場",
  "莫雷鎮集市",
  "卡諾商圈",
  "雷瓦市交易區",
  "希塔城市場",
  "拉諾居民區市場",
  "索維交易站"
];

const items = [
  "雲莓",
  "森椒",
  "波光鹽",
  "椰子飲品",
  "空鷹羽飾",
  "礦石粉",
  "乾果包"
];

function marketInfo(){
  return {
    name: markets[Math.floor(Math.random() * markets.length)],
    item: items[Math.floor(Math.random() * items.length)],
    status: skyTime.hour >= 6 && skyTime.hour <= 18 ? "營業中" : "休市"
  };
}

/* =========================
   📰 長新聞生成器（重點🔥）
========================= */

function generateLongArticle(){

  const m = marketInfo();
  const time = `${skyTime.hour.toString().padStart(2,'0')}:${skyTime.minute.toString().padStart(2,'0')}`;

  const intro = [
    "本日空島通訊社持續追蹤各區域市場與物流運作情況。",
    "根據最新監測資料，多個區域呈現輕微波動。",
    "跨區觀測系統於清晨更新數據模型，結果顯示整體仍在可控範圍內。",
    "今日區域新聞整理如下，涵蓋市場、物流與氣候變化。"
  ];

  const body = [
    "市場交易維持穩定，但部分物資流通速度略有下降。",
    "物流節點顯示延遲現象，但尚未影響整體供應。",
    "居民活動維持正常，未出現大規模異常事件。",
    "氣候數據顯示雲層與風流穩定，未見極端變化。",
    "跨區運輸系統仍持續運作，但效率略有波動。"
  ];

  const analysis = [
    "分析指出，目前變化屬於正常短期波動。",
    "專家認為系統仍維持穩定結構，未進入風險區間。",
    "短期內可能出現微幅調整，但不影響整體運作。",
    "數據模型顯示市場進入觀察期，需持續追蹤。"
  ];

  let longBody = "";

  // 🔥 產生長文（穩定重複但不無聊）
  for(let i = 0; i < 50; i++){
    longBody += body[Math.floor(Math.random() * body.length)] + "\n";
  }

  return {
    title: `【深度報導】空島第${skyTime.day}天跨區域觀測報告`,
    content:
`${intro[Math.floor(Math.random() * intro.length)]}

📍 時間：${time}
🏪 觀測點：${m.name}（${m.status}）

━━━━━━━━━━━━━━━━━━

${longBody}

━━━━━━━━━━━━━━━━━━

📊 專家分析：
${analysis[Math.floor(Math.random() * analysis.length)]}

結論：整體系統維持穩定，無重大異常風險。
`
  };
}

/* =========================
   📰 新聞生成（唯一入口）
========================= */

function generateArticle(){

  // 全部統一長文（避免短文混亂）
  return generateLongArticle();
}

/* =========================
   🚀 主循環（已修 loop）
========================= */

function spawnNews(){

  updateWorld();
  tickTime();

  let count = worldState.chaos > 10 ? 2 : 1;

  for(let i = 0; i < count; i++){
    articles.unshift(generateArticle());
  }

  if(articles.length > 80){
    articles.length = 80;
  }

  render();
}

/* =========================
   🖥 UI Render（穩定全螢幕）
========================= */

function render(){

  const list = document.getElementById("newsList");
  const stats = document.getElementById("stats");
  const marketBox = document.getElementById("marketBox");
  const breaking = document.getElementById("breaking");

  if(!list) return;

  list.innerHTML = "";

  articles.forEach(a => {

    const div = document.createElement("div");
    div.className = "news-item";

    div.innerHTML = `
      <div class="news-title">${a.title}</div>
      <div class="news-content">${a.content}</div>
    `;

    list.appendChild(div);
  });

  if(stats){
    stats.innerHTML =
`第 ${skyTime.day} 天
時間 ${skyTime.hour}:${skyTime.minute}
新聞數 ${articles.length}
chaos ${worldState.chaos.toFixed(1)}
economy ${worldState.economy.toFixed(1)}`;
  }

  if(marketBox){
    const m = marketInfo();
    marketBox.innerText =
`🏪 ${m.name}
${m.status}
${m.item}`;
  }

  if(breaking){
    breaking.style.display = worldState.chaos > 10 ? "block" : "none";
    breaking.innerText = "🚨 BREAKING LIVE";
  }
}

/* =========================
   ▶️ INIT（乾淨啟動）
========================= */

function init(){

  articles = [];

  spawnNews();

  setInterval(spawnNews, 8000); // 🔥 已放慢，不再爆刷

}

init();
