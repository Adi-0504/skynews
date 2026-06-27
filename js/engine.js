/* =========================
   🌍 SKY NEWS 3.0
========================= */

let articles = [];
let eventMemory = new Set();

let skyTime = {
  day: 1,
  hour: 6,
  minute: 0
};

let worldState = {
  chaos: 0,
  economy: 100,
  logistics: 0,
  climate: 0
};

/* =========================
   🧠 事件池（變多＝不會膩）
========================= */

const markets = [
  "薩拉村聚落", "卡諾聚落交易區", "雷瓦村市場",
  "莫爾聚落", "塔西聚落市集", "烏拉聚落交易站"
];

const items = [
  "空鷹羽飾", "雲莓", "波光鹽", "森椒", "椰子飲品"
];

const eventTypes = [
  "climate", "logistics", "economy", "population"
];

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
    skyTime.day++;
    eventMemory.clear(); // 🔥 每天才重置事件記憶
  }
}

/* =========================
   🧠 世界演化（互相影響）
========================= */

function updateWorld(eventType){

  if(eventType === "economy"){
    worldState.economy += (Math.random() * 2 - 1);
    worldState.logistics += Math.random() * 0.5;
  }

  if(eventType === "logistics"){
    worldState.logistics += (Math.random() * 2 - 1);
    worldState.chaos += 0.3;
  }

  if(eventType === "climate"){
    worldState.climate += (Math.random() * 2 - 1);
    worldState.logistics += 0.2;
  }

  if(eventType === "population"){
    worldState.chaos += (Math.random() * 0.5);
    worldState.economy += 0.3;
  }

  // 限制
  worldState.chaos = clamp(worldState.chaos, -10, 10);
}

/* =========================
   🔧 工具
========================= */

function clamp(v, min, max){
  return Math.max(min, Math.min(max, v));
}

/* =========================
   🧠 生成「不重複事件」
========================= */

function createEvent(){

  let type = eventTypes[Math.floor(Math.random() * eventTypes.length)];

  let market = markets[Math.floor(Math.random() * markets.length)];
  let item = items[Math.floor(Math.random() * items.length)];

  let id = `${type}-${market}-${item}-${skyTime.hour}-${skyTime.minute}`;

  // 🔥 去重核心
  if(eventMemory.has(id)){
    return null;
  }

  eventMemory.add(id);
  updateWorld(type);

  return {
    id,
    type,
    market,
    item
  };
}

/* =========================
   📰 新聞生成（真正去重）
========================= */

function generateArticle(){

  let event = createEvent();

  if(!event) return null;

  let time = `${skyTime.hour.toString().padStart(2,'0')}:${skyTime.minute.toString().padStart(2,'0')}`;

  let content = "";

  if(event.type === "economy"){
    content =
`市場交易出現變動跡象。
${event.market} 出現 ${event.item} 流動異常。`;
  }

  if(event.type === "logistics"){
    content =
`跨區運輸節點出現延遲。
${event.market} 物流效率下降。`;
  }

  if(event.type === "climate"){
    content =
`氣候數據出現微幅波動。
空島氣流對 ${event.market} 產生影響。`;
  }

  if(event.type === "population"){
    content =
`居民活動密度改變。
${event.market} 人流出現重新分布。`;
  }

  return {
    title: `【空島觀測】第${skyTime.day}天`,
    content:
`📍 ${time}

━━━━━━━━━━━━━━

${content}

━━━━━━━━━━━━━━

📊 世界狀態
經濟：${worldState.economy.toFixed(1)}
混亂：${worldState.chaos.toFixed(1)}
物流：${worldState.logistics.toFixed(1)}
氣候：${worldState.climate.toFixed(1)}`
  };
}

/* =========================
   🚀 主循環
========================= */

function spawnNews(){

  tickTime();

  let article = generateArticle();

  // 🔥 防 null + 防重複
  if(article){
    articles.unshift(article);
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
`DAY ${skyTime.day}
${skyTime.hour.toString().padStart(2,'0')}:${skyTime.minute.toString().padStart(2,'0')}`;
  }
}

/* =========================
   ▶️ INIT（完全防loop）
========================= */

function init(){

  if(window.__skynews_v3) return;
  window.__skynews_v3 = true;

  articles = [];
  spawnNews();

  setInterval(spawnNews, 5000);
}

init();
