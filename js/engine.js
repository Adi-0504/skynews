
/* =========================
   🌍 基礎世界狀態
========================= */

let articles = [];
let history = [];

let skyTime = {
  day: 1,
  hour: 6,
  minute: 0
};

let worldState = {
  stability: 100,
  tension: 0,
  flow: 0
};

/* =========================
   🧭 敘事方向（逆向核心）
========================= */

const narrativeTypes = [
  "stability",
  "tension",
  "growth"
];

/* =========================
   🧠 選擇敘事（不是隨機事件，是“敘事框架”）
========================= */

function chooseNarrative(){

  // 🔥 讓世界「偏移」，不是純random
  const weights = {
    stability: worldState.stability > 110 ? 0.5 : 1.2,
    tension: worldState.tension > 8 ? 1.5 : 1,
    growth: worldState.flow > 5 ? 1.3 : 1
  };

  let pool = [];

  narrativeTypes.forEach(type => {
    const w = Math.floor(weights[type] * 10);

    for(let i = 0; i < w; i++){
      pool.push(type);
    }
  });

  return pool[Math.floor(Math.random() * pool.length)];
}

/* =========================
   🧠 逆向影響世界（新聞 → 世界）
========================= */

function applyNarrativeBias(type){

  if(type === "stability"){
    worldState.stability += 2;
    worldState.tension -= 1;
    worldState.flow += 0.5;
  }

  if(type === "tension"){
    worldState.tension += 2;
    worldState.stability -= 1;
    worldState.flow += 0.2;
  }

  if(type === "growth"){
    worldState.flow += 2;
    worldState.stability += 1;
  }

  // 🔒 限制範圍
  worldState.stability = clamp(worldState.stability, 0, 150);
  worldState.tension = clamp(worldState.tension, 0, 20);
  worldState.flow = clamp(worldState.flow, 0, 20);
}

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
    skyTime.day++;
    saveHistory();
  }
}

/* =========================
   📦 歷史系統（世界記錄）
========================= */

function saveHistory(){

  history.push({
    day: skyTime.day,
    stability: worldState.stability,
    tension: worldState.tension,
    flow: worldState.flow
  });

  if(history.length > 50){
    history.shift();
  }
}

/* =========================
   🔧 工具
========================= */

function clamp(v, min, max){
  return Math.max(min, Math.min(max, v));
}

/* =========================
   📰 新聞生成（逆向核心）
========================= */

function generateArticle(){

  const narrative = chooseNarrative();

  applyNarrativeBias(narrative);

  const time = `${skyTime.hour.toString().padStart(2,'0')}:${skyTime.minute.toString().padStart(2,'0')}`;

  const templates = {
    stability: [
      "市場維持穩定運作，跨區流動未見異常。",
      "物流系統保持一致節奏。",
      "居民活動維持正常狀態。"
    ],
    tension: [
      "市場出現局部壓力，交易節奏略有不均。",
      "物流節點出現延遲跡象。",
      "跨區數據同步出現偏差。"
    ],
    growth: [
      "市場活性提升，交易頻率增加。",
      "物流效率上升，跨區連結增強。",
      "資源流動速度加快。"
    ]
  };

  let body = "";

  for(let i = 0; i < 10; i++){
    body += templates[narrative][Math.floor(Math.random() * 3)] + "\n";
  }

  return {
    title: `【空島觀測報告】第${skyTime.day}天`,
    content:
`📍 時間：${time}

━━━━━━━━━━━━━━━━━━

${body}

━━━━━━━━━━━━━━━━━━

📊 世界狀態：
穩定性：${worldState.stability.toFixed(1)}
張力：${worldState.tension.toFixed(1)}
流動性：${worldState.flow.toFixed(1)}

📡 敘事模式：${narrative}

━━━━━━━━━━━━━━━━━━

結論：本日資料由敘事模型重構。`
  };
}

/* =========================
   🚀 主循環
========================= */

function spawnNews(){

  tickTime();

  articles.unshift(generateArticle());

  if(articles.length > 40){
    articles.length = 40;
  }

  render();
}

/* =========================
   🖥 UI渲染
========================= */

function render(){

  const list = document.getElementById("newsList");
  const stats = document.getElementById("stats");
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
`DAY ${skyTime.day}
${skyTime.hour.toString().padStart(2,'0')}:${skyTime.minute.toString().padStart(2,'0')}`;
  }

  if(breaking){
    breaking.style.display = worldState.tension > 10 ? "block" : "none";
    breaking.innerText = "🚨 SYSTEM PRESSURE DETECTED";
  }
}

/* =========================
   ▶️ INIT（防重複 loop）
========================= */

function init(){

  if(window.__skyInit) return; // 🔥 防止重複啟動

  window.__skyInit = true;

  articles = [];
  spawnNews();

  setInterval(spawnNews, 6000);
}

init();
