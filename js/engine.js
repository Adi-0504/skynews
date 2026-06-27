/* =========================
   🌍 世界狀態
========================= */

let articles = [];
let history = []; // 🔥 新增：歷史記憶

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
   ⏱ 時間
========================= */

function tickTime(){
  skyTime.minute++;

  if(skyTime.minute >= 65){
    skyTime.minute = 0;
    skyTime.hour++;
  }

  if(skyTime.hour >= 20){
    skyTime.hour = 0;
    saveHistory(); // 🔥 每天記錄
    skyTime.day++;
  }
}

/* =========================
   📦 歷史記憶系統
========================= */

function saveHistory(){

  history.push({
    day: skyTime.day,
    chaos: worldState.chaos,
    economy: worldState.economy,
    weather: worldState.weather
  });

  // 只保留最近30天
  if(history.length > 30){
    history.shift();
  }
}

function getTrend(){

  if(history.length < 2){
    return "初始觀測期";
  }

  const last = history[history.length - 1];
  const prev = history[history.length - 2];

  const diff = last.chaos - prev.chaos;

  if(diff > 2) return "不穩定上升";
  if(diff < -2) return "趨於穩定";
  return "小幅波動";
}

/* =========================
   🌍 世界變動（帶記憶影響）
========================= */

function updateWorld(){

  let memoryFactor = history.length * 0.02;

  worldState.weather += (Math.random() - 0.5) * (1 + memoryFactor);
  worldState.economy += (Math.random() - 0.5) * (1 + memoryFactor);
  worldState.chaos += (Math.random() - 0.5) * (1.5 + memoryFactor);

  worldState.chaos = Math.max(-20, Math.min(20, worldState.chaos));
}

/* =========================
   🏪 市集
========================= */

const markets = [
  "薩拉村聚落",
  "莫雷村集市",
  "卡諾聚落交易區",
  "雷瓦村市場",
  "希塔聚落中心",
  "拉諾村集市",
  "索維交易站"
];

const items = ["雲莓", "森椒", "波光鹽", "椰子飲品", "空鷹羽飾"];

function marketInfo(){
  return {
    name: markets[Math.floor(Math.random() * markets.length)],
    item: items[Math.floor(Math.random() * items.length)],
    status: skyTime.hour >= 6 && skyTime.hour <= 18 ? "營業中" : "休市"
  };
}

/* =========================
   📰 長新聞（會引用歷史）
========================= */

function generateArticle(){

  const m = marketInfo();
  const trend = getTrend();

  const intro = [
    "空島通訊社持續追蹤跨區域變動。",
    "根據歷史資料比對，本日數據呈現延續性變化。",
    "監測中心更新歷史模型後，顯示系統仍具穩定性。",
    "今日觀測結合過去30日資料進行分析。"
  ];

  const body = [
    `與昨日相比，系統呈現${trend}特徵。`,
    "市場流動性維持正常區間，但存在細微變化。",
    "物流節點延遲情況與歷史波動高度相關。",
    "氣候變化與前期數據呈現一致趨勢。",
    "經濟指標與過去三日平均值接近。"
  ];

  const analysis = [
    "歷史模型顯示目前屬於正常循環波動。",
    "長期數據未顯示系統崩壞風險。",
    "短期變化與過去事件高度相關。",
    "整體趨勢仍維持可控範圍。"
  ];

  let longBody = "";

  for(let i = 0; i < 40; i++){
    longBody += body[Math.floor(Math.random() * body.length)] + "\n";
  }

  return {
    title: `【歷史專題】空島第${skyTime.day}天跨期觀測報告`,
    content:
`${intro[Math.floor(Math.random() * intro.length)]}

📍 市場觀測：${m.name}（${m.status}）
📊 歷史趨勢：${trend}

━━━━━━━━━━━━━━━━━━

${longBody}

━━━━━━━━━━━━━━━━━━

📈 分析：
${analysis[Math.floor(Math.random() * analysis.length)]}

結論：系統行為已納入歷史模型評估，目前維持穩定。
`
  };
}

/* =========================
   🚀 主循環
========================= */

function spawnNews(){

  updateWorld();
  tickTime();

  let count = worldState.chaos > 12 ? 2 : 1;

  for(let i = 0; i < count; i++){
    articles.unshift(generateArticle());
  }

  if(articles.length > 60){
    articles.length = 60;
  }

  render();
}

/* =========================
   🖥 UI
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
新聞 ${articles.length}
chaos ${worldState.chaos.toFixed(1)}
trend ${getTrend()}`;
  }

  if(marketBox){
    const m = marketInfo();
    marketBox.innerText =
`🏪 ${m.name}
${m.status}
${m.item}`;
  }

  if(breaking){
    breaking.style.display = worldState.chaos > 12 ? "block" : "none";
    breaking.innerText = "🚨 BREAKING HISTORY EVENT";
  }
}

/* =========================
   ▶️ INIT
========================= */

function init(){
  articles = [];
  spawnNews();
  setInterval(spawnNews, 8000);
}

init();
