// =======================
// 🌍 空島世界設定
// =======================

const world = {
  year: 1353,

  months: [
    "綠芽月","細雨月","花落月","熙陽月","綠葉月",
    "秋楓月","豐饒月","星空月","寒霜月","冰雪月"
  ],

  locations: {
    "薩拉村": ["北側豆餅攤","中央水井","南口補給站"],
    "卡諾交易區": ["布料攤","香料攤","木材集散點"],
    "雷瓦村": ["魚乾市場","鐵器修理鋪","入口廣場"]
  }
};

// =======================
// 🧠 記憶系統
// =======================

let memory = {
  currentDay: 1,
  reports: {}
};

// =======================
// ⏳ 時間系統
// =======================

function getTime(day){

  const mIndex = Math.floor((day-1)/35);
  const d = ((day-1)%35)+1;

  const year = world.year + Math.floor(mIndex/10);
  const month = world.months[mIndex%10];

  return `浮空曆${year}年・${month}・第${d}日`;
}

// =======================
// 🎲 工具
// =======================

function random(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

// =======================
// 📍 事件生成（攤位級）
// =======================

function generateEvent(day){

  const region = random(Object.keys(world.locations));
  const spot = random(world.locations[region]);

  const types = ["market_shift","logistics_delay","population_move"];
  const type = random(types);

  return { day, region, spot, type };
}

// =======================
// 🧠 敘事轉換（居民視角）
// =======================

function narrate(e){

  if(e.type === "market_shift"){
    return `${e.region}・${e.spot}人潮增加，出現排隊現象`;
  }

  if(e.type === "logistics_delay"){
    return `${e.region}・${e.spot}補給速度變慢，等待時間增加`;
  }

  if(e.type === "population_move"){
    return `${e.region}・${e.spot}成為臨時人流集中點`;
  }

  return `${e.region}・${e.spot}出現輕微變化`;
}

// =======================
// 📰 新聞生成（核心）
// =======================

function generateReport(day){

  if(memory.reports[day]){
    return memory.reports[day];
  }

  let events = [];

  for(let i=0;i<50;i++){
    events.push(generateEvent(day));
  }

  let text = `
<div class="headline">空島各區出現局部人流與交易變化</div>

<p>${getTime(day)}</p>

<p>今日空島多個聚落出現局部流動變化，主要集中於市場與補給節點。</p>

<p><b>【現場狀況】</b></p>
`;

  events.forEach(e=>{
    text += `<p>・${narrate(e)}</p>`;
  });

  text += `
<p><b>【居民觀察】</b><br>
整體生活秩序維持穩定，但部分攤位出現人潮集中現象。</p>

<p><b>【結語】</b><br>
空島運作正常，局部區域正在形成新的流動熱點。</p>
`;

  memory.reports[day] = text;

  return text;
}

// =======================
// 🖥️ UI 渲染
// =======================

function render(day){
  document.getElementById("content").innerHTML =
    generateReport(day);

  document.getElementById("time").innerText =
    getTime(day);
}

// =======================
// 🔁 控制
// =======================

function next(){
  memory.currentDay++;
  render(memory.currentDay);
}

function prev(){
  if(memory.currentDay > 1){
    memory.currentDay--;
    render(memory.currentDay);
  }
}

// =======================
// 🚀 初始化
// =======================

render(1);
