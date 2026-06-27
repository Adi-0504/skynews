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

function debug(msg){
  const el = document.getElementById("debugBox");
  if(el) el.innerText = msg;
}

/* ⏱ 時間 */
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

/* 🌍 世界 */
function updateWorld(){
  worldState.weather += (Math.random()-0.5)*2;
  worldState.economy += (Math.random()-0.5)*1.5;
  worldState.chaos += (Math.random()-0.5)*2;
}

function isBreaking(){
  return Math.abs(worldState.chaos) > 7;
}

/* 🏪 市集 */
const markets = ["金穗市集", "雲橋市集", "礦心交易所", "潮聲市集"];
const items = ["雲莓", "森椒", "波光鹽", "椰子飲品", "空鷹羽飾"];

function marketInfo(){
  return {
    name: markets[Math.floor(Math.random()*markets.length)],
    item: items[Math.floor(Math.random()*items.length)],
    status: skyTime.hour >= 6 && skyTime.hour <= 18 ? "營業中" : "休市"
  };
}

/* 📰 新聞 */
function generateArticle(){

  const m = marketInfo();
  const time = `${skyTime.hour.toString().padStart(2,'0')}:${skyTime.minute.toString().padStart(2,'0')}`;

  let type = isBreaking() ? "breaking"
            : Math.random() < 0.4 ? "weather"
            : Math.random() < 0.7 ? "economy"
            : "transport";

  if(type === "weather"){
    return {
      type,
      title: "【氣候專題】森林島雲層觀測",
      content: "雲層穩定，無異常氣候變化。"
    };
  }

  if(type === "economy"){
    return {
      type,
      title: "【經濟觀測】mato damu流通",
      content: "市場交易穩定，無大幅波動。"
    };
  }

  if(type === "transport"){
    return {
      type,
      title: "【空鷹航運】路線觀測",
      content: "航線略有延遲，但整體正常。"
    };
  }

  return {
    type: "breaking",
    title: "🚨 BREAKING：氣流異常",
    content: "空鷹航線調整中，持續監測。"
  };
}

/* 🚀 主循環 */
function spawnNews(){

  updateWorld();
  tickTime();

  articles.unshift(generateArticle());

  if(articles.length > 200){
    articles = articles.slice(0, 200);
  }

  render();
}

/* 🖥 UI */
function render(){

  const list = document.getElementById("newsList");
  const stats = document.getElementById("stats");
  const marketBox = document.getElementById("marketBox");
  const breaking = document.getElementById("breaking");

  if(!list) return;

  list.innerHTML = "";

  articles.slice(0, 30).forEach(a => {

    const div = document.createElement("div");
    div.className = "news-item";

    if(a.type === "breaking"){
      div.classList.add("breaking");
    }

    div.innerHTML = `<b>${a.title}</b><br>${a.content}`;
    list.appendChild(div);
  });

  if(stats){
    stats.innerHTML =
`第 ${skyTime.day} 天
${skyTime.hour}:${skyTime.minute}
新聞數：${articles.length}
chaos ${worldState.chaos.toFixed(1)}`;
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
  }
}

function init(){
  articles = [];
  spawnNews();
  setInterval(spawnNews, 4000);
}

init();
