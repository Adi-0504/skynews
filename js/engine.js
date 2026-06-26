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
   🧪 DEBUG LOG（安全版）
========================= */

function debug(msg){
  // 不依賴 console，不會炸
  if(typeof document !== "undefined"){
    const el = document.getElementById("debugBox");
    if(el){
      el.innerText = msg;
    }
  }
}

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
  }
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
   🏪 市集
========================= */

function marketInfo(){
  const markets = ["金穗市集", "雲橋市集", "礦心交易所", "潮聲市集"];
  const items = ["雲莓", "森椒", "波光鹽", "椰子飲品", "空鷹羽飾"];

  return {
    name: markets[Math.floor(Math.random()*markets.length)],
    item: items[Math.floor(Math.random()*items.length)],
    status: skyTime.hour >= 6 && skyTime.hour <= 18 ? "營業中" : "休市"
  };
}

/* =========================
   📰 新聞生成
========================= */

function generateArticle(){

  const m = marketInfo();

  if(isBreaking()){
    return {
      title: "🚨 BREAKING：空島氣流異常",
      content: "氣流波動監測中，空鷹航線調整"
    };
  }

  return {
    title: `【空島日報】第${skyTime.day}天`,
    content: `
時間：${skyTime.hour}:${skyTime.minute}
市場：${m.name} (${m.status})
商品：${m.item}
    `
  };
}

/* =========================
   🚀 spawn
========================= */

function spawnNews(){

  updateWorld();
  tickTime();

  const count = isBreaking() ? 3 : 1;

  for(let i=0;i<count;i++){
    articles.unshift(generateArticle());
  }

  if(articles.length > 200){
    articles.length = 200;
  }

  render();
}

/* =========================
   🖥 RENDER（100%防炸）
========================= */

function render(){

  const list = document.getElementById("newsList");
  const stats = document.getElementById("stats");
  const marketBox = document.getElementById("marketBox");
  const breaking = document.getElementById("breaking");

  // 🔥 DOM 還沒好 → 不直接 return（避免白畫面）
  if(!list){
    debug("waiting DOM...");
    return;
  }

  list.innerHTML = "";

  articles.forEach(a => {
    const div = document.createElement("div");
    div.className = "news-item";
    div.innerHTML = `<b>${a.title}</b><br>${a.content}`;
    list.appendChild(div);
  });

  if(stats){
    stats.innerHTML =
`第 ${skyTime.day} 天
${skyTime.hour}:${skyTime.minute}
新聞數：${articles.length}`;
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
    breaking.innerText = "🚨 BREAKING";
  }

  debug("engine running OK");
}

/* =========================
   ▶️ INIT（超穩版本）
========================= */

function init(){

  articles = [];

  render(); // 先畫一次空畫面（不會壞）

  spawnNews(); // 🔥 立刻有內容

  setInterval(spawnNews, 4000);

  debug("engine ready");
}

/* =========================
   🚀 啟動（最穩寫法）
========================= */

init();
