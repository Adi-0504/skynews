/* =========================
   🌍 空島世界狀態
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
   🧪 DEBUG
========================= */

function debug(msg){
  const el = document.getElementById("debugBox");
  if(el) el.innerText = msg;
}

/* =========================
   ⏱ 時間系統（20h / 65min）
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
}

/* =========================
   🚨 BREAKING
========================= */

function isBreaking(){
  return Math.abs(worldState.chaos) > 7;
}

/* =========================
   🏪 市集（穩定版本）
========================= */

const markets = ["金穗市集", "雲橋市集", "礦心交易所", "潮聲市集"];
const items = ["雲莓", "森椒", "波光鹽", "椰子飲品", "空鷹羽飾"];

function marketInfo(){
  return {
    name: markets[Math.floor(Math.random() * markets.length)],
    item: items[Math.floor(Math.random() * items.length)],
    status: skyTime.hour >= 6 && skyTime.hour <= 18 ? "營業中" : "休市"
  };
}

/* =========================
   📰 新聞生成（優化版）
========================= */

function generateArticle(){

  const m = marketInfo();

  const time = `${skyTime.hour.toString().padStart(2,'0')}:${skyTime.minute.toString().padStart(2,'0')}`;

  if(isBreaking()){
    return {
      title: "🚨 BREAKING：空島氣流異常",
      content: `氣流波動監測中，空鷹航線調整\n時間：${time}`
    };
  }

  return {
    title: `【空島日報】第${skyTime.day}天`,
    content:
`時間：${time}
市場：${m.name} (${m.status})
商品：${m.item}`
  };
}

/* =========================
   🚀 主循環
========================= */

function spawnNews(){

  updateWorld();
  tickTime();

  const count = isBreaking() ? 3 : 1;

  for(let i = 0; i < count; i++){
    articles.unshift(generateArticle());
  }

  // 防爆（只保留最新 100）
  if(articles.length > 100){
    articles = articles.slice(0, 100);
  }

  render();
}

/* =========================
   🖥 RENDER（電視台版）
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
    stats.innerHTML = `
      🕒 第 ${skyTime.day} 天<br>
      ⏰ ${skyTime.hour}:${skyTime.minute}<br>
      📰 ${articles.length}<br>
      🌪 chaos ${worldState.chaos.toFixed(1)}
    `;
  }

  if(marketBox){
    const m = marketInfo();
    marketBox.innerText =
`🏪 ${m.name}
${m.status}
${m.item}`;
  }

  if(breaking){
    breaking.style.display = isBreaking() ? "block" : "none";
    breaking.innerText = "🚨 BREAKING LIVE";
  }
}

/* =========================
   ▶️ INIT
========================= */

function init(){

  articles = [];

  spawnNews();

  setInterval(spawnNews, 4000);

  debug("engine ready");
}

init();
