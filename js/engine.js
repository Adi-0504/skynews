// js/engine.js（已改）

/* =========================
🌍 空島世界
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

/* =========================
🌍 四島設定（你要求）
========================= */

const islands = ["平原島","森林島","礦山島","沙灘島"];

/* =========================
🧠 工具
========================= */

function r(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

/* =========================
⏳ 空島時間（已修）
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
📍 生成地點
========================= */

function generateEvent(){

  const isCity = Math.random() < 0.4;

  const place = isCity ? r(cities) : r(villages);

  const types = ["市場波動","物流延遲","人口流動","氣候變化","資訊擴散"];

  return {
    place,
    type: r(types),
    island: r(islands)
  };
}

/* =========================
🌊 擴散影響（修復 undefined）
========================= */

function spread(e){

  const pool = [...cities, ...villages];

  let list = [];

  for(let i=0;i<4;i++){
    list.push(r(pool));
  }

  return list;
}

/* =========================
📰 單篇新聞生成（重點修復）
========================= */

function generateArticle(day){

  const e = generateEvent();
  const impacts = spread(e);
  const time = getTime(day);

  const title =
    `空島跨區域監測報導：${e.place}${e.type}引發局部變動`;

  const content = `
在${time}的監測中，${e.island}觀測站記錄到${e.place}出現${e.type}現象。

初步分析顯示，此變動已開始影響周邊節點，物流與市場系統出現短期調整。

影響擴散至：
${impacts[0]}、${impacts[1]}、${impacts[2]}、${impacts[3]}

系統判定目前仍屬局部波動，未形成跨區連鎖反應，但後續仍需持續觀測。
`;

  return `
    <div class="news-title">${title}</div>
    <div class="news-body">
      <p>${content}</p>
    </div>
  `;
}

/* =========================
🖥 render（已修：保證有內容）
========================= */

function render(day = 1){

  const el = document.getElementById("content");

  if(!el){
    console.error("找不到 content");
    return;
  }

  el.innerHTML = generateArticle(day);

  document.getElementById("time").innerText = getTime(day);
}

/* =========================
🚀 啟動
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
