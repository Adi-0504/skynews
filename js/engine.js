/* =========================
   🌍 世界狀態
========================= */

let articles = [];
let history = [];

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
   ⏱ 時間系統
========================= */

function tickTime(){
  skyTime.minute++;

  if(skyTime.minute >= 65){
    skyTime.minute = 0;
    skyTime.hour++;
  }

  if(skyTime.hour >= 20){
    skyTime.hour = 0;
    saveHistory();
    skyTime.day++;
  }
}

/* =========================
   📦 歷史記錄
========================= */

function saveHistory(){

  history.push({
    day: skyTime.day,
    chaos: worldState.chaos,
    economy: worldState.economy,
    weather: worldState.weather
  });

  if(history.length > 30){
    history.shift();
  }
}

/* =========================
   🌍 世界影響判斷
========================= */

function detectWorldEvents(){

  let events = [];

  if(worldState.weather > 6){
    events.push("weatherHigh");
  }

  if(worldState.chaos > 8){
    events.push("logisticsDelay");
  }

  if(worldState.economy < 80){
    events.push("marketDrop");
  }

  return events;
}

/* =========================
   ⚙️ 影響規則（因果核心）
========================= */

const impactRules = [
  {
    if: "weatherHigh",
    effect: () => {
      worldState.chaos += 1;
      return "強風干擾空鷹航線";
    }
  },
  {
    if: "logisticsDelay",
    effect: () => {
      worldState.economy -= 1.2;
      return "物流延遲影響市場流動";
    }
  },
  {
    if: "marketDrop",
    effect: () => {
      worldState.chaos += 0.6;
      return "市場波動引發短期不穩";
    }
  }
];

/* =========================
   🔁 套用影響
========================= */

function applyImpacts(){

  const events = detectWorldEvents();
  let results = [];

  events.forEach(e => {

    const rule = impactRules.find(r => r.if === e);

    if(rule){
      results.push(rule.effect());
    }

  });

  return results;
}

/* =========================
   🌍 世界更新（因果版）
========================= */

function updateWorld(){

  worldState.weather += (Math.random() - 0.5) * 1.2;
  worldState.economy += (Math.random() - 0.5) * 1.0;
  worldState.chaos += (Math.random() - 0.5) * 1.5;

  // 🔥 連鎖反應
  if(worldState.weather > 7){
    worldState.economy -= 0.2;
  }

  if(worldState.chaos > 10){
    worldState.weather += 0.3;
  }

  worldState.chaos = Math.max(-20, Math.min(20, worldState.chaos));
  worldState.economy = Math.max(50, Math.min(150, worldState.economy));
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

const items = [
  "雲莓",
  "森椒",
  "波光鹽",
  "椰子飲品",
  "空鷹羽飾",
  "礦石粉"
];

function marketInfo(){
  return {
    name: markets[Math.floor(Math.random() * markets.length)],
    item: items[Math.floor(Math.random() * items.length)],
    status: skyTime.hour >= 6 && skyTime.hour <= 18 ? "營業中" : "休市"
  };
}

/* =========================
   📰 新聞生成（核心）
========================= */

function generateArticle(){

  const m = marketInfo();
  const impacts = applyImpacts();

  const time = `${skyTime.hour.toString().padStart(2,'0')}:${skyTime.minute.toString().padStart(2,'0')}`;

  const intro = "空島通訊社持續進行跨區域監測，本日資料整理如下。";

  let impactText = "";

  if(impacts.length === 0){
    impactText = "系統未出現明顯連鎖異常反應。";
  } else {
    impactText = impacts.map(i => `• ${i}`).join("\n");
  }

  let body = "";

  const baseLines = [
    "市場交易維持基本穩定，但流動速度略有變化。",
    "物流節點顯示輕微延遲，但仍維持運作。",
    "居民活動正常，未出現大規模異常事件。",
    "氣候數據保持穩定，無極端變化。",
    "跨區運輸系統仍持續運作。"
  ];

  for(let i = 0; i < 35; i++){
    body += baseLines[Math.floor(Math.random() * baseLines.length)] + "\n";
  }

  return {
    title: `【空島深度報導】第${skyTime.day}天系統觀測`,
    content:
`${intro}

📍 時間：${time}
🏪 市場：${m.name}（${m.status}）

━━━━━━━━━━━━━━━━━━

🧭 事件分析：
${impactText}

━━━━━━━━━━━━━━━━━━

${body}

━━━━━━━━━━━━━━━━━━

📊 專家結論：
本日系統已納入因果模型分析。
目前仍維持穩定，但存在輕微波動連鎖可能。

結論：整體可控。`
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
    breaking.style.display = worldState.chaos > 12 ? "block" : "none";
    breaking.innerText = "🚨 BREAKING SYSTEM EVENT";
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
