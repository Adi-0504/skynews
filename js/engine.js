/* =========================
   🌍 空島世界狀態
========================= */

let skyTime = {
  day: 1,
  hour: 6,
  minute: 0
};

let articles = [];

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
   🌅 時段系統
========================= */

function getTimePhase(hour){

  if(hour < 7) return "凌晨觀測";
  if(hour < 12) return "早間新聞";
  if(hour < 16) return "午間速報";
  if(hour < 20) return "傍晚報導";
  return "夜間觀測";
}

/* =========================
   🏪 市集系統（時間控制）
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
   📡 BREAKING 判定
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

  const breaking = isBreaking();

  if(breaking){

    return {
      title: "🚨 BREAKING：空島氣流異常波動",
      content: `
【緊急觀測】

空島氣象中心偵測到異常氣流變動。

目前：
- 空鷹航線調整中
- 雲層密度上升
- 系統進入觀測模式

時間：${skyTime.hour}:${skyTime.minute}
`
    };
  }

  return {
    title: `【${phase}】空島日常觀測`,
    content: `
【空島通訊社】

本日第 ${skyTime.day} 天（${season}）

觀測顯示：
氣候與市場維持穩定運作。

🏪 市集資訊：
${market.name}（${market.status}）
今日商品：${market.item}

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

  articles = articles.slice(0, 200);

  render();
}

/* =========================
   🖥 UI
========================= */

function render(){

  const list = document.getElementById("newsList");
  if(!list) return;

  list.innerHTML = "";

  articles.forEach(a=>{
    const div = document.createElement("div");
    div.className = "news-item";
    div.innerHTML = `<b>${a.title}</b><br>${a.content}`;
    list.appendChild(div);
  });

  const stats = document.getElementById("stats");
  if(stats){

    stats.innerHTML = `
      🕒 第 ${skyTime.day} 天
      ⏰ ${skyTime.hour.toString().padStart(2,'0')}:${skyTime.minute.toString().padStart(2,'0')}
      🌿 ${getSeason(skyTime.day)}
      📡 ${getTimePhase(skyTime.hour)}
      📰 ${articles.length} 則新聞
    `;
  }
}

/* =========================
   ▶️ 啟動
========================= */

setInterval(spawnNews, 4000);
