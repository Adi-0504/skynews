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
   🧪 DEBUG SYSTEM
========================= */

function debugLog(msg, data){
  console.log(`[空島DEBUG] ${msg}`, data || "");
}

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
   🌿 季節
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

  debugLog("world update", worldState);
}

/* =========================
   🚨 BREAKING
========================= */

function isBreaking(){
  return Math.abs(worldState.chaos) > 7;
}

/* =========================
   📰 新聞
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

氣流監測中心回報異常波動。

- 空鷹航線調整中
- 雲層密度變化
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

🏪 ${market.name}
狀態：${market.status}
商品：${market.item}

時間：${skyTime.hour.toString().padStart(2,'0')}:${skyTime.minute.toString().padStart(2,'0')}
`
  };
}

/* =========================
   🚀 生成
========================= */

function spawnNews(){

  try{

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

    debugLog("spawn ok", articles.length);

  } catch(e){
    console.error("❌ spawnNews crash:", e);
  }
}

/* =========================
   🖥 UI RENDER（防炸版）
========================= */

function render(){

  try{

    const list = document.getElementById("newsList");
    const stats = document.getElementById("stats");
    const breaking = document.getElementById("breaking");
    const marketBox = document.getElementById("marketBox");

    if(!list){
      console.warn("⚠️ newsList not found");
      return;
    }

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

    if(stats){
      stats.innerHTML = `
        🕒 第 ${skyTime.day} 天
        ⏰ ${skyTime.hour.toString().padStart(2,'0')}:${skyTime.minute.toString().padStart(2,'0')}
        📰 ${articles.length} 則
        🔥 chaos ${worldState.chaos.toFixed(2)}
      `;
    }

    if(breaking){
      breaking.style.display = hasBreaking ? "block" : "none";
      breaking.innerText = "🚨 BREAKING LIVE";
    }

    if(marketBox){
      const m = marketInfo();
      marketBox.innerText =
`🏪 ${m.name}
${m.status}
${m.item}`;
    }

  } catch(e){
    console.error("❌ render crash:", e);
  }
}

/* =========================
   ▶️ INIT（關鍵修復🔥）
========================= */

function init(){
  debugLog("engine init start");

  articles = [];

  render(); // 先畫第一幀

  setInterval(spawnNews, 4000);

  debugLog("engine ready");
}

window.addEventListener("DOMContentLoaded", init);
