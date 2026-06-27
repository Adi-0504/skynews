/* =========================
🌍 空島世界資料層
========================= */

const cities = [
  "莫雷","比亞","卡諾","索維","雷瓦","奧恩","拉維爾","希諾","維卡","多恩",
  "米蘭","克羅","塔維","諾亞","薩恩","布拉","維諾","哈爾","奧瑞","利亞",
  "格恩","索拉","米卡","杜恩","洛維"
]; // 25城

const villages = [
  "薩拉村","米諾村","洛森村","卡里村","風葉村","灰岩村","白砂村","雲谷村","木溪村","石原村",
  "霧川村","青禾村","北嶺村","南霧村","月溪村","星落村","海風村","雨林村","火石村","銀川村",
  "寒霜村","暖谷村","風港村","鐵木村","石橋村","草原村","雲石村","夜林村","晨曦村","風嵐村",
  "沙灣村","黑岩村","白霧村","綠田村","藍灣村","赤土村","冷溪村","暖風村","遠山村","霜葉村",
  "光谷村","影林村","雲岬村","風嶼村","星河村","雷鳴村","靜水村","灰谷村","白川村","風砂村"
]; // 50+

const world = {
  year: 1353,
  months: [
    "綠芽月","細雨月","花落月","熙陽月","綠葉月",
    "秋楓月","豐饒月","星空月","寒霜月","冰雪月"
  ]
};

/* =========================
🧠 系統狀態
========================= */

const memory = {
  day: 1,
  report: null
};

/* =========================
🎲 工具
========================= */

const r = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* =========================
🧭 時間系統
========================= */

function getTime(day){
  const monthIndex = Math.floor((day-1)/35);
  const date = ((day-1)%35)+1;

  const year = world.year + Math.floor(monthIndex/10);
  const month = world.months[monthIndex % 10];

  return `浮空曆${year}年・${month}・第${date}日`;
}

/* =========================
🌍 地圖選擇（城市 or 村）
========================= */

function pickLocation(){
  const isCity = Math.random() < 0.4; // 城市40%，村落60%

  if(isCity){
    return {
      type: "city",
      name: r(cities)
    };
  }else{
    return {
      type: "village",
      name: r(villages)
    };
  }
}

/* =========================
⚡ 事件類型
========================= */

function eventType(){

  const pool = [
    "market","market","market","market",
    "logistics","logistics","logistics",
    "population","population",
    "incident",
    "rumor",
    "weather"
  ];

  return r(pool);
}

/* =========================
🧠 單一事件
========================= */

function event(){

  const loc = pickLocation();

  return {
    location: loc.name,
    scope: loc.type,
    type: eventType()
  };
}

/* =========================
📰 事件轉文字（穩定輸出）
========================= */

function narrate(e){

  if(!e) return "觀測資料不足，無法生成內容。";

  const place = e.location;

  switch(e.type){

    case "market":
      return `${place}市場活動明顯上升，人流集中於主要交易點，部分攤位出現排隊現象，交易節奏加快。`;

    case "logistics":
      return `${place}補給路線出現延遲，物資流動速度下降，部分貨物流向鄰近節點調整。`;

    case "population":
      return `${place}人口流動出現集中趨勢，短時間內形成明顯聚集熱點。`;

    case "incident":
      return `${place}出現異常事件紀錄，局部系統監測到不穩定波動，但未擴散。`;

    case "rumor":
      return `${place}出現資訊流動異常，當地居民對未確認消息產生討論與關注。`;

    case "weather":
      return `${place}氣候條件出現變化，風流與雲層密度短期波動明顯。`;

    default:
      return `${place}出現一般性活動變化。`;
  }
}

/* =========================
📦 生成當日事件
========================= */

function generateEvents(){

  const events = [];

  for(let i=0;i<140;i++){
    events.push(event());
  }

  return events;
}

/* =========================
📰 生成長篇新聞（10篇）
========================= */

function generateReport(day){

  const events = generateEvents();

  let html = `
<div class="headline">空島跨區域深度觀測日報</div>
<p>${getTime(day)}</p>
<p>本日監測資料整理為10篇區域報導如下：</p>
`;

  const chunkSize = Math.floor(events.length / 10);

  for(let i=0;i<10;i++){

    const chunk = events.slice(i*chunkSize, (i+1)*chunkSize);

    html += `
<div class="article">
<div class="title">第${i+1}則｜區域觀測報導</div>
<p>
`;

    for(const e of chunk){
      html += narrate(e) + "<br><br>";
    }

    html += `
</p>
</div>
`;
  }

  html += `
<div class="headline">總體觀測</div>
<p>
今日空島整體維持穩定結構。城市層面呈現交易活躍與物流調整並行的狀態，而村落則以人口流動與補給變化為主。雖然局部區域出現短期波動，但未觀測到跨區連鎖效應，系統仍處於安全範圍內。
</p>
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
🎯 初始化
========================= */

function init(){

  document.getElementById("prevBtn").addEventListener("click", ()=>{
    if(memory.day > 1){
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
