
/* =========================
🌍 空島世界 v7 Engine（修正版）
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
  "沙灣村","黑岩村","白霧村","綠田村","藍灣村","赤土村","冷溪村","暖風村","遠山村","霜葉村",
  "光谷村","影林村","雲岬村","風嶼村","星河村","雷鳴村","靜水村","灰谷村","白川村","風砂村"
];

const islands = ["平原島","森林島","礦山島","沙灘島"];

/* =========================
工具
========================= */

function r(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function shuffle(arr){
  return [...arr].sort(()=>Math.random()-0.5);
}

/* =========================
⏳ 空島時間
========================= */

function getTime(day){

  const year = 1353;
  const months = [
    "綠芽月","細雨月","花落月","熙陽月","綠葉月",
    "秋楓月","豐饒月","星空月","寒霜月","冰雪月"
  ];

  const m = Math.floor((day-1)/35);
  const d = ((day-1)%35)+1;

  return `浮空曆${year}年・${months[m % 10]}・第${d}日`;
}

/* =========================
📍 事件生成
========================= */

function generateEvent(){

  const placePool = [...cities, ...villages];

  const types = [
    "市場波動","物流延遲","人口流動","氣候變化","資訊擴散",
    "資源錯配","航線震盪","補給壓力","節點過載","交易異常"
  ];

  return {
    place: r(placePool),
    type: r(types),
    island: r(islands)
  };
}

/* =========================
🌊 擴散（層級修復版）
========================= */

function spread(e){

  const pool = [...cities, ...villages];

  const shuffled = shuffle(pool);

  return {
    core: shuffled.slice(0,2),
    mid: shuffled.slice(2,4),
    outer: shuffled.slice(4,6)
  };
}

/* =========================
🧠 block system（重點修復）
========================= */

function buildBlocks(e, impacts, time){

  const blocks = [];

  const templates = [
    () => `在${time}的監測中，${e.island}觀測站首次捕捉到${e.place}的${e.type}現象。`,
    () => `${e.place}周邊節點出現非線性波動，物流系統開始進入重新排序狀態。`,
    () => `市場端交易頻率在短時間內上升，部分商品價格出現區間震盪。`,
    () => `核心影響區：${impacts.core.join("、")}，已進入高密度變動階段。`,
    () => `中層區域開始出現連鎖反應，居民活動時間逐漸偏移。`,
    () => `外圍觀測區仍維持穩定，但已出現輕微訊號漂移。`,
    () => `系統正在嘗試重新分配物流權重以穩定整體結構。`
  ];

  let count = 4 + Math.floor(Math.random()*4);

  let used = new Set();

  for(let i=0;i<count;i++){

    let t;
    do{
      t = r(templates)();
    } while(used.has(t) === false && Math.random() < 0.3);

    used.add(t);
    blocks.push(t);
  }

  return blocks;
}

/* =========================
📰 主生成（完全非模板化）
========================= */

function generateArticle(day){

  const e = generateEvent();
  const impacts = spread(e);
  const time = getTime(day);

  const title =
    `空島跨區域監測報導：${e.place}${e.type}引發局部變動`;

  const blocks = buildBlocks(e, impacts, time);

  return `
    <div class="news-title">${title}</div>

    <div class="news-body">
      ${blocks.map(b => `<p>${b}</p>`).join("")}
    </div>
  `;
}

/* =========================
render
========================= */

function render(day = 1){

  const el = document.getElementById("content");

  if(!el){
    console.error("content not found");
    return;
  }

  el.innerHTML = generateArticle(day);

  document.getElementById("time").innerText = getTime(day);
}

/* =========================
init
========================= */

let day = 1;

function init(){

  document.getElementById("prevBtn").onclick = () => {
    day = Math.max(1, day-1);
    render(day);
  };

  document.getElementById("nextBtn").onclick = () => {
    day++;
    render(day);
  };

  render(day);
}

window.onload = init;
