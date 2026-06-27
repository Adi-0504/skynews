const cities = ["莫雷","比亞","卡諾","索維","雷瓦","奧恩","拉維爾","希諾","維卡","多恩","米蘭","克羅","塔維","諾亞","薩恩","布拉","維諾","哈爾","奧瑞","利亞","格恩","索拉","米卡","杜恩","洛維"];

const villages = ["薩拉村","米諾村","洛森村","卡里村","風葉村","灰岩村","白砂村","雲谷村","木溪村","石原村","霧川村","青禾村","北嶺村","南霧村","月溪村","星落村","海風村","雨林村","火石村","銀川村","寒霜村","暖谷村","風港村","鐵木村","石橋村","草原村","雲石村","夜林村","晨曦村","風嵐村","沙灣村","黑岩村","白霧村","綠田村","藍灣村","赤土村","冷溪村","暖風村","遠山村","霜葉村","光谷村","影林村","雲岬村","風嶼村","星河村","雷鳴村","靜水村","灰谷村","白川村","風砂村"];

const world = {
  year: 1353,
  months: ["綠芽月","細雨月","花落月","熙陽月","綠葉月","秋楓月","豐饒月","星空月","寒霜月","冰雪月"]
};

const state = {
  day: 1,
  lastEvent: null
};

const r = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* =========================
🕰️ 空島時間
========================= */

function getTime(day){

  const daysPerMonth = 35;
  const monthIndex = Math.floor((day - 1) / daysPerMonth);
  const date = ((day - 1) % daysPerMonth) + 1;

  const year = world.year + Math.floor(monthIndex / 10);
  const month = world.months[monthIndex % 10];

  return `浮空曆${year}年・${month}・第${date}日`;
}

/* =========================
🌍 事件生成（克羅式結構）
========================= */

function generateEvent(){

  const all = [...cities, ...villages];

  const types = [
    "資訊擴散",
    "物流壓力",
    "市場波動",
    "人口流動",
    "氣候異常"
  ];

  // 延續機制（讓世界有連續性）
  if(state.lastEvent && Math.random() < 0.6){
    return {
      place: state.lastEvent.place,
      type: state.lastEvent.type,
      continuation: true
    };
  }

  const e = {
    place: r(all),
    type: r(types),
    continuation: false
  };

  state.lastEvent = e;
  return e;
}

/* =========================
🌍 影響擴散（固定新聞邏輯）
========================= */

function spread(main){

  const all = [...cities, ...villages];

  return all
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(p => p);
}

/* =========================
📰 固定新聞模板（核心）
========================= */

function generateArticle(day){

  const e = generateEvent();
  const impacts = spread(e);
  const time = getTime(day);

  let title = `空島跨區域監測報導：${e.place}${e.type}引發局部變動`;

  /* =========================
  🧠 ① 導言（固定）
  ========================= */

  let intro = `
在${time}的監測中，空島觀測系統持續追蹤各區域動態變化。
${e.place}於今日首次出現明顯${e.type}現象。
`;

  /* =========================
  🌍 ② 系統反應
  ========================= */

  let system = `
物流與市場系統開始出現不同程度的連動調整，
部分航線與補給節點被迫重新分配資源，以維持整體穩定。
`;

  /* =========================
  🚧 ③ 擴散
  ========================= */

  let spreadText = `
影響逐步向外延伸，${impacts[0]}與${impacts[1]}出現局部變化現象，
而${impacts[2]}則開始出現初期連動跡象。
`;

  /* =========================
  🌍 ④ 狀態判定
  ========================= */

  let stateText = `
空島整體仍維持穩定結構，但事件呈現出逐步延展的趨勢。
`;

  if(e.continuation){
    stateText += `該事件為延續型變動，目前已進入擴散階段。`;
  }

  /* =========================
  📰 合成
  ========================= */

  return `
    <div class="news-title">${title}</div>
    <div class="news-body">

      <p>${intro}</p>
      <p>${system}</p>
      <p>${spreadText}</p>
      <p>${stateText}</p>

    </div>
  `;
}

/* =========================
render
========================= */

function render(){
  document.getElementById("time").innerText = getTime(state.day);
  document.getElementById("content").innerHTML = generateArticle(state.day);
}

/* =========================
init
========================= */

function init(){

  document.getElementById("prevBtn").addEventListener("click", () => {
    if(state.day > 1){
      state.day--;
      render();
    }
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    state.day++;
    render();
  });

  render();
}

init();
