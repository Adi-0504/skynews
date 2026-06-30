
/* =========================
🌍 空島世界記憶系統 v4
========================= */

/* =========================
🌍 世界資料
========================= */

const cities = [
  "莫雷","比亞","卡諾","索維","雷瓦","奧恩","拉維爾","希諾","維卡","多恩",
  "米蘭","克羅","塔維","諾亞","薩恩","布拉","維諾","哈爾","奧瑞","利亞",
  "格恩","索拉","米卡","杜恩","洛維"
];

const villages = [
  "薩拉村","米諾村","洛森村","卡里村","風葉村","灰岩村","白砂村","雲谷村","木溪村","石原村",
  "霧川村","青禾村","北嶺村","南霧村","月溪村","星落村","海風村","雨林村","火石村","銀川村",
  "寒霜村","暖谷村","風港村","鐵木村","石橋村","草原村","雲石村","夜林村","晨曦村","風嵐村",
  "沙灣村","黑岩村","白霧村","綠田村","藍灣村","赤土村","冷溪村","暖風村","遠山村","霜葉村"
];

const islands = ["平原島","森林島","礦山島","沙灘島"];

/* =========================
🧠 世界記憶（🔥 v4核心）
========================= */

let worldState = {};

/* 初始化所有村莊狀態 */
function initWorld(){

  [...cities, ...villages].forEach(p => {

    worldState[p] = {
      pressure: 0,   // 壓力
      economy: 1,    // 經濟
      mobility: 1    // 流動性
    };

  });
}

/* =========================
工具
========================= */

function r(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

/* =========================
🌍 即時時間
========================= */

function getIslandTime(){

  const now = new Date();

  const months = [
    "綠芽月","細雨月","花落月","熙陽月","綠葉月",
    "秋楓月","豐饒月","星空月","寒霜月","冰雪月"
  ];

  return {
    year: 1353,
    month: months[now.getMonth() % 10],
    day: now.getDate()
  };
}

/* =========================
🌍 事件生成（會影響世界）
========================= */

function generateEvent(){

  const types = [
    { type:"市場波動", level:1 },
    { type:"物流延遲", level:2 },
    { type:"人口流動", level:2 },
    { type:"氣候變化", level:2 },
    { type:"資訊擴散", level:3 },
    { type:"空鷹異常", level:3 }
  ];

  const t = r(types);

  return {
    place: r([...cities, ...villages]),
    type: t.type,
    level: t.level,
    island: r(islands)
  };
}

/* =========================
🔥 世界更新（v4核心）
========================= */

function applyEvent(e){

  const target = worldState[e.place];

  if(!target) return;

  // 壓力增加
  target.pressure += e.level * 2;

  // 經濟下降（小幅）
  target.economy -= e.level * 0.1;

  // 流動性下降
  target.mobility -= e.level * 0.05;

}

/* =========================
📊 擴散（基於世界狀態，不是random）
========================= */

function spread(e){

  let affected = [];

  Object.entries(worldState).forEach(([name, state]) => {

    if(state.pressure > 3){
      affected.push(name);
    }

  });

  // fallback
  if(affected.length < 3){
    affected = r(villages) ? villages.slice(0,3) : cities.slice(0,3);
  }

  return affected.slice(0,4);
}

/* =========================
📰 生成新聞（依世界狀態）
========================= */

function article(e, timeStr){

  const state = worldState[e.place];

  const title =
    `空島跨區域監測報導：${e.place}${e.type}`;

  return `
    <div class="news-title">${title}</div>

    <div class="news-body">

      <p>${e.place}出現${e.type}，${timeStr}首次觀測到變化。</p>

      <p>該區目前壓力值：${state.pressure.toFixed(1)}</p>

      <p>周邊節點（${spread(e).join("、")}）出現連動現象。</p>

      <p>空鷹航線已進行臨時調整以降低壓力。</p>

    </div>
  `;
}

/* =========================
🖥 render（v4核心）
========================= */

function render(){

  const el = document.getElementById("content");

  const time = getIslandTime();

  const events = [];

  // 🔥 世界「自然生成事件」
  for(let i=0;i<3;i++){

    const e = generateEvent();

    applyEvent(e); // 💣 事件會影響世界

    events.push(e);

  }

  const articles = events.map(e =>
    article(e, `${time.year}年・${time.month}・第${time.day}日`)
  );

  el.innerHTML = articles.join("<hr>");

  document.getElementById("time").innerText =
    `${time.year}年・${time.month}・第${time.day}日`;
}

/* =========================
🚀 init
========================= */

function init(){

  initWorld();

  render();

  setInterval(render, 1000 * 60 * 10); // 持續更新
}

window.onload = init;
