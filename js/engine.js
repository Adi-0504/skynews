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
   ⏱ 時間系統（20h / 65min）
========================= */

function tickTime(){

  skyTime.minute += 1;

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
   🌿 季節系統（350天）
========================= */

function getSeason(day){

  const d = day % 350;
  const m = Math.floor(d / 35);

  if(m <= 2) return "綠芽季";
  if(m <= 4) return "熙陽季";
  if(m <= 6) return "豐饒季";
  if(m <= 8) return "寒霜季";
  return "冰雪季";
}

/* =========================
   🌅 時段
========================= */

function getTimePhase(hour){

  if(hour < 7) return "凌晨觀測";
  if(hour < 12) return "早間新聞";
  if(hour < 16) return "午間速報";
  if(hour < 20) return "傍晚報導";
  return "夜間觀測";
}

/* =========================
   🏪 市集
========================= */

function marketInfo(){

  const markets = ["金穗市集", "雲橋市集", "礦心交易所", "潮聲市集"];
  const items = ["雲莓momu baru", "森椒", "波光鹽", "椰子飲品", "空鷹羽飾"];

  const isOpen = skyTime.hour >= 6 && skyTime.hour <= 18;

  return {
    name: markets[Math.floor(Math.random()*markets.length)],
    item: items[Math.floor(Math.random()*items.length)],
    status: isOpen ? "營業中" : "休市"
  };
}

/* =========================
   🌍 世界變動
========================= */

function updateWorld(){

  worldState.weather += (Math.random()-0.5)*2;
  worldState.economy += (Math.random()-0.5)*1.5;
  worldState.chaos += (Math.random()-0.5)*2;
}

/* =========================
   🚨 BREAKING
========================= */

function isBreaking(){
  return Math.abs(worldState.chaos) > 7;
}

/* =========================
   📰 單篇新聞
========================= */

function generateArticle(){

  const market = marketInfo();
  const phase = getTimePhase(skyTime.hour);
  const season = getSeason(skyTime.day);

  if(isBreaking()){

    return {
      title: "🚨 BREAKING：空島氣流異常波動",
      content: `
【緊急觀測】

空島氣象中心偵測到異常氣流變動。

- 空鷹航線調整中
- 雲層密度上升
- 系統進入監測模式

時間：${skyTime.hour.toString().padStart(2,'0')}:${skyTime.minute.toString().padStart(2,'0')}
`
    };
  }

  return {
    title: `【${phase}】空島日常觀測`,
    content: `
【空島通訊社報導】

本日第 ${skyTime.day} 天（${season}）

系統觀測顯示整體運作穩定。

🏪 ${market.name}：
${market.status}｜今日商品：${market.item}

時間：${skyTime.hour.toString().padStart(2,'0')}:${skyTime.minute.toString().padStart(2,'0')}
`
  };
}

/* =========================
   🚀 新聞生成流
========================= */

function spawnNews(){

  updateWorld();
  tickTime();

  const count = isBreaking() ? 3 : 1;

  for(let i=0;i<count;i++){
    articles.unshift(generateArticle());
  }

  if(articles.length > 200){
    articles = articles.slice(0, 200);
  }

  render();
}

/* =========================
   🖥 電視台 UI
========================= */

function render(){

  const list = document.getElementById("newsList");
  const breaking = document.getElementById("breaking");
  const stats = document.getElementById("stats");
  const marketBox = document.getElementById("marketBox");

  if(!list) return;

  list.innerHTML = "";

  let hasBreaking = false;

  articles.forEach(a => {

    const div = document.createElement("div");
    div.className = "news-item";
    div.innerHTML = `<b>${a.title}</b><br>${a.content}`;
    list.appendChild(div);

    if(a.title.includes("BREAKING")){
      hasBreaking = true;
    }
  });

  /* 🚨 BREAKING 顯示 */
  if(breaking){
    if(hasBreaking){
      breaking.style.display = "block";
      breaking.innerText = "🚨 BREAKING NEWS LIVE";
    } else {
      breaking.style.display = "none";
    }
  }

  /* 📊 狀態欄 */
  stats.innerHTML = `
    🕒 第 ${skyTime.day} 天<br>
    ⏰ ${skyTime.hour.toString().padStart(2,'0')}:${skyTime.minute.toString().padStart(2,'0')}<br>
    🌿 ${getSeason(skyTime.day)}<br>
    📡 ${getTimePhase(skyTime.hour)}<br>
    📰 ${articles.length} 則新聞
  `;

  /* 🏪 市集 */
  const m = marketInfo();
  marketBox.innerText =
`🏪 ${m.name}
狀態：${m.status}
今日商品：${m.item}`;
}

/* =========================
   ▶️ 啟動
========================= */

setInterval(spawnNews, 4000);
