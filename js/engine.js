const world = {
  year: 1353,
  months: [
    "綠芽月","細雨月","花落月","熙陽月","綠葉月",
    "秋楓月","豐饒月","星空月","寒霜月","冰雪月"
  ],
  locations: {
    "薩拉村": ["豆餅攤","水井","補給站","廣場"],
    "卡諾交易區": ["布料攤","香料攤","木材點","鐵匠鋪"],
    "雷瓦村": ["魚乾市場","鐵匠鋪","水井","廣場"]
  }
};

const memory = {
  day: 1,
  report: null
};

const r = arr => arr[Math.floor(Math.random()*arr.length)];

/* =========================
🧠 時間
========================= */

function getTime(day){
  const m = Math.floor((day-1)/35);
  const d = ((day-1)%35)+1;

  const year = world.year + Math.floor(m/10);
  const month = world.months[m%10];

  return `浮空曆${year}年・${month}・第${d}日`;
}

/* =========================
🧠 事件
========================= */

function event(){
  return {
    region: r(Object.keys(world.locations)),
    spot: r(r(world.locations)),
    type: r(["market","logistics","move"])
  };
}

/* =========================
🧠 長篇新聞生成（核心）
========================= */

function writeArticle(group, index){

  const main = group[0];
  const region = main.region;

  let title = "";

  if(main.type === "market")
    title = "交易流動與人流變化觀測";

  if(main.type === "logistics")
    title = "物流節點運作狀態追蹤";

  if(main.type === "move")
    title = "人口流動與聚落動態報導";

  let intro = `
第${index+1}則報導｜${region}觀測紀錄

浮空曆時間：${getTime(memory.day)}

本報導由空島跨區觀測系統整理，針對${region}當日局部活動進行追蹤分析。
`;

  let body = "";

  for(const e of group){

    if(e.type === "market"){
      body += `${e.region}${e.spot}一帶出現明顯人流增加現象，部分攤位開始出現排隊情況，交易節奏較平日加快，顯示短時間內需求集中。\n\n`;
    }

    if(e.type === "logistics"){
      body += `${e.region}${e.spot}補給節點出現延遲情況，物資流動速度下降，部分居民選擇轉向鄰近節點進行補給，形成間接壓力轉移。\n\n`;
    }

    if(e.type === "move"){
      body += `${e.region}${e.spot}周邊出現人口流動集中現象，人群停留時間增加，使得局部區域活動密度提升，形成短期聚集點。\n\n`;
    }
  }

  let conclusion = `
整體觀察顯示，${region}雖然出現多點波動，但仍屬局部性調整，未觀測到跨區連鎖影響。系統判定目前狀態維持穩定。
`;

  return `
<div class="headline">${title}</div>
<p>${intro}</p>
<p>${body}</p>
<p>${conclusion}</p>
`;
}

/* =========================
📰 一天新聞（10篇長文）
========================= */

function generateReport(day){

  let events = [];

  for(let i=0;i<50;i++){
    events.push(event());
  }

  /* 切成10組 */
  const groups = [];

  for(let i=0;i<10;i++){
    groups.push(events.slice(i*5, i*5+5));
  }

  let html = `
<div class="headline">空島跨區域深度觀測日報</div>
<p>${getTime(day)}</p>
<p>本日監測資料已整理為10篇區域報導如下：</p>
`;

  groups.forEach((g,i)=>{
    html += writeArticle(g,i);
  });

  html += `
<div class="headline">總體觀察</div>
<p>今日空島整體結構穩定，雖然多區域出現人流與物流波動，但均屬短期現象。未觀測到跨區域連鎖反應，系統維持正常運作。</p>
`;

  return html;
}

/* =========================
🖥 render
========================= */

function render(){

  document.getElementById("time").innerText = getTime(memory.day);

  if(!memory.report){
    memory.report = generateReport(memory.day);
  }

  document.getElementById("content").innerHTML = memory.report;
}

/* =========================
🎯 init（一天一報）
========================= */

function init(){

  document.getElementById("prevBtn").addEventListener("click", ()=>{
    if(memory.day>1){
      memory.day--;
      memory.report = null;
      render();
    }
  });

  document.getElementById("nextBtn").addEventListener("click", ()=>{
    memory.day++;
    memory.report = null;
    render();
  });

  render();
}

init();
