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
   🧠 防重複記憶系統
========================= */

const worldMemory = {
  lastEvent: null,
  streak: 0
};

function isRepeat(type){

  if(worldMemory.lastEvent === type){
    worldMemory.streak++;
  } else {
    worldMemory.lastEvent = type;
    worldMemory.streak = 0;
  }

  return worldMemory.streak > 3;
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
  }
}

/* =========================
   🌍 世界變動
========================= */

function updateWorld(){

  worldState.weather += (Math.random() - 0.5) * 2;
  worldState.economy += (Math.random() - 0.5) * 1.5;
  worldState.chaos += (Math.random() - 0.5) * 2;

  // 限制範圍（避免爆）
  worldState.chaos = Math.max(-15, Math.min(15, worldState.chaos));
  worldState.economy = Math.max(0, Math.min(200, worldState.economy));
}

/* =========================
   🚨 狀態判定
========================= */

function isBreaking(){
  return worldState.chaos > 10;
}

/* =========================
   🏪 市集
========================= */

const markets = [
  "薩拉村市場",
  "莫雷鎮集市",
  "卡諾商圈",
  "雷瓦市交易區",
  "希塔城市場"
];

const items = [
  "雲莓",
  "森椒",
  "波光鹽",
  "椰子飲品",
  "空鷹羽飾"
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
  const time = `${skyTime.hour.toString().padStart(2,'0')}:${skyTime.minute.toString().padStart(2,'0')}`;

  // 🚨 災難新聞
  if(worldState.chaos > 10 && !isRepeat("crisis")){
    return {
      type:"crisis",
      title:"🚨 區域緊急通報",
      content:
`多地交通異常
市場流通受影響
時間：${time}`
    };
  }

  // 📉 經濟新聞
  if(worldState.economy < 70 && !isRepeat("economy")){
    return {
      type:"economy",
      title:"【經濟觀測】市場降溫",
      content:
`交易量下降
供應鏈緊縮
時間：${time}`
    };
  }

  // 🌪 氣候新聞
  if(worldState.weather > 8 && !isRepeat("weather")){
    return {
      type:"weather",
      title:"【氣候觀測】異常波動",
      content:
`氣流變動增加
雲層厚度上升
時間：${time}`
    };
  }

  // 🌿 一般新聞
  return {
    type:"normal",
    title:`【日常觀測】第${skyTime.day}天`,
    content:
`市場：${m.name} (${m.status})
商品：${m.item}
時間：${time}`
  };
}

/* =========================
   🚀 主循環（已修 loop）
========================= */

function spawnNews(){

  updateWorld();
  tickTime();

  let count = 1;

  // 🔥 不是固定 loop，而是狀態驅動
  if(worldState.chaos > 10) count = 3;
  else if(worldState.chaos < -10) count = 2;

  for(let i = 0; i < count; i++){
    articles.unshift(generateArticle());
  }

  // 防爆
  if(articles.length > 120){
    articles.length = 120;
  }

  render();
}

/* =========================
   🖥 UI Render（穩定版）
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

    // 🎨 分層 UI
    div.innerHTML = `
      <div class="news-title">${a.title}</div>
      <div class="news-content">${a.content}</div>
    `;

    list.appendChild(div);
  });

  if(stats){
    stats.innerHTML =
`第 ${skyTime.day} 天
時間：${skyTime.hour}:${skyTime.minute}
新聞數：${articles.length}
chaos：${worldState.chaos.toFixed(1)}
economy：${worldState.economy.toFixed(1)}`;
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
   ▶️ INIT（不會重複 loop）
========================= */

function init(){

  articles = [];

  spawnNews();

  setInterval(spawnNews, 4000);

}

init();
