/* =========================
🌍 空島世界資料
========================= */

const cities = ["莫雷","比亞","卡諾","索維","雷瓦","奧恩","拉維爾","希諾","維卡","多恩","米蘭","克羅","塔維","諾亞","薩恩","布拉","維諾","哈爾","奧瑞","利亞","格恩","索拉","米卡","杜恩","洛維"];

const villages = ["薩拉村","米諾村","洛森村","卡里村","風葉村","灰岩村","白砂村","雲谷村","木溪村","石原村","霧川村","青禾村","北嶺村","南霧村","月溪村","星落村","海風村","雨林村","火石村","銀川村","寒霜村","暖谷村","風港村","鐵木村","石橋村","草原村","雲石村","夜林村","晨曦村","風嵐村","沙灣村","黑岩村","白霧村","綠田村","藍灣村","赤土村","冷溪村","暖風村","遠山村","霜葉村","光谷村","影林村","雲岬村","風嶼村","星河村","雷鳴村","靜水村","灰谷村","白川村","風砂村"];

const world = {
  year: 1353,
  months: ["綠芽月","細雨月","花落月","熙陽月","綠葉月","秋楓月","豐饒月","星空月","寒霜月","冰雪月"]
};

/* =========================
🧠 世界記憶（v6核心）
========================= */

const state = {
  day: 1,
  lastEvent: null,
  trend: {
    logistics: 0,
    economy: 0,
    population: 0,
    info: 0
  }
};

/* =========================
工具
========================= */

const r = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* =========================
時間
========================= */

function getTime(day){
  const monthIndex = Math.floor((day-1)/35);
  const date = ((day-1)%35)+1;
  const year = world.year + Math.floor(monthIndex/10);
  const month = world.months[monthIndex % 10];
  return `浮空曆${year}年・${month}・第${date}日`;
}

/* =========================
主事件（有延續）
========================= */

function generateMainEvent(){

  const all = [...cities, ...villages];

  // 🔁 70% 延續昨天
  if(state.lastEvent && Math.random() < 0.7){
    return {
      place: state.lastEvent.place,
      type: state.lastEvent.type,
      continuation: true
    };
  }

  const types = ["物流壓力","市場波動","人口遷移","氣候異常","資訊擴散"];

  const event = {
    place: r(all),
    type: r(types),
    continuation: false
  };

  state.lastEvent = event;
  return event;
}

/* =========================
影響擴散（自然化）
========================= */

function generateImpacts(main){

  const all = [...cities, ...villages];

  return all
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
    .map(p => {

      let effect = "局部變化";

      if(main.continuation){
        effect = "連鎖反應持續擴散";
      }

      return { place: p, effect };
    });
}

/* =========================
更新世界趨勢
========================= */

function updateTrend(main){

  switch(main.type){

    case "物流壓力":
      state.trend.logistics += 1;
      break;

    case "市場波動":
      state.trend.economy += 1;
      break;

    case "人口遷移":
      state.trend.population += 1;
      break;

    case "資訊擴散":
      state.trend.info += 1;
      break;

    case "氣候異常":
      state.trend.logistics -= 0.5;
      break;
  }
}

/* =========================
生成文章（單篇）
========================= */

function generateArticle(day){

  const main = generateMainEvent();
  const impacts = generateImpacts(main);

  updateTrend(main);

  const time = getTime(day);

  let text = "";

  /* 標題 */
  text += `空島跨區域監測報導：`;

  if(main.continuation){
    text += `昨日事件持續延伸，${main.place}${main.type}進一步加劇\n\n`;
  } else {
    text += `${main.place}${main.type}引發局部變動\n\n`;
  }

  /* 開頭 */
  text += `在${time}的監測中，空島觀測系統持續追蹤各區域動態變化。`;

  if(main.continuation){
    text += `昨日於${main.place}出現的現象，在今日已進入擴散階段。\n\n`;
  } else {
    text += `${main.place}於今日首次出現明顯異常。\n\n`;
  }

  /* 主體 */
  text += `物流與市場系統開始出現不同程度的連動調整，部分航線與補給節點被迫重新分配資源，以維持整體穩定。\n\n`;

  /* 擴散 */
  text += `影響逐步向外延伸，${impacts[0].place}與${impacts[1].place}出現${impacts[0].effect}現象，而${impacts[2].place}則開始出現初期連動跡象。\n\n`;

  /* 趨勢自然寫入（不是數據） */
  if(state.trend.logistics > 2){
    text += `目前物流壓力持續累積，空鷹航線調度頻率明顯增加。\n\n`;
  }

  if(state.trend.economy > 2){
    text += `市場交易節奏出現加速現象，部分城市價格波動幅度擴大。\n\n`;
  }

  /* 收束 */
  text += `空島整體仍維持穩定結構，但事件呈現出逐步延展的趨勢，後續發展仍需持續觀測。`;

  return text;
}

/* =========================
render
========================= */

function render(){

  const content = document.getElementById("content");
  const time = document.getElementById("time");

  time.innerText = getTime(state.day);

  content.innerText = generateArticle(state.day);
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
