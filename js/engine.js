/* =========================
🌍 空島世界資料
========================= */

const cities = ["莫雷","比亞","卡諾","索維","雷瓦","奧恩","拉維爾","希諾","維卡","多恩","米蘭","克羅","塔維","諾亞","薩恩","布拉","維諾","哈爾","奧瑞","利亞","格恩","索拉","米卡","杜恩","洛維"];

const villages = ["薩拉村","米諾村","洛森村","卡里村","風葉村","灰岩村","白砂村","雲谷村","木溪村","石原村","霧川村","青禾村","北嶺村","南霧村","月溪村","星落村","海風村","雨林村","火石村","銀川村","寒霜村","暖谷村","風港村","鐵木村","石橋村","草原村","雲石村","夜林村","晨曦村","風嵐村","沙灣村","黑岩村","白霧村","綠田村","藍灣村","赤土村","冷溪村","暖風村","遠山村","霜葉村","光谷村","影林村","雲岬村","風嶼村","星河村","雷鳴村","靜水村","灰谷村","白川村","風砂村"];

const world = {
  year: 1353,
  months: [
    "綠芽月","細雨月","花落月","熙陽月","綠葉月",
    "秋楓月","豐饒月","星空月","寒霜月","冰雪月"
  ]
};

/* =========================
🧠 世界記憶
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
🌍 季節影響
========================= */

function timeInfluence(day){

  const monthIndex = Math.floor((day - 1) / 35);
  const season = world.months[monthIndex % 10];

  return {
    season,
    isStormSeason: season === "秋楓月" || season === "寒霜月",
    isTradeSeason: season === "熙陽月" || season === "豐饒月"
  };
}

/* =========================
主事件（會延續）
========================= */

function generateMainEvent(){

  const all = [...cities, ...villages];

  // 70% 延續
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
影響擴散
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
更新趨勢
========================= */

function updateTrend(main){

  switch(main.type){

    case "物流壓力":
      state.trend.logistics++;
      break;

    case "市場波動":
      state.trend.economy++;
      break;

    case "人口遷移":
      state.trend.population++;
      break;

    case "資訊擴散":
      state.trend.info++;
      break;
  }
}

/* =========================
📰 生成新聞（完整長篇）
========================= */

function generateArticle(day){

  const main = generateMainEvent();
  const impacts = generateImpacts(main);
  const t = timeInfluence(day);

  updateTrend(main);

  const time = getTime(day);

  let title = "";

  if(main.continuation){
    title = `【連鎖觀測】${main.place}${main.type}持續擴散，空島進入區域調整期`;
  } else {
    title = `【空島觀測】${main.place}${main.type}引發局部變動`;
  }

  let body = "";

  body += `在${time}的監測週期中（${t.season}季節），空島觀測系統於${main.place}記錄到${main.type}現象。\n\n`;

  body += `該變化初期僅影響局部區域，但隨著時間推進，其影響開始沿著物流與市場路線逐步擴散。\n\n`;

  if(main.continuation){
    body += `該事件延續自前一周期，目前已進入持續擴散階段，並對周邊節點形成穩定壓力。\n\n`;
  }

  body += `在影響範圍內，${impacts[0].place}與${impacts[1].place}首先出現明顯變化，主要集中在補給節奏與市場流動速度上。\n\n`;

  body += `${impacts[2].place}與${impacts[3].place}則進入次級影響階段，呈現出較為緩慢但持續的調整現象。\n\n`;

  if(t.isTradeSeason){
    body += `由於目前處於貿易活躍週期，各城市之間的物流頻率本身較高，使得本次變化擴散速度略為加快。\n\n`;
  }

  if(t.isStormSeason){
    body += `氣候系統進入不穩定階段，空鷹航線調度受到額外影響。\n\n`;
  }

  body += `目前觀測站評估，系統仍處於可控範圍內，但建議持續監測後續24至48小時內的連鎖變化。\n\n`;

  body += `空島整體結構維持穩定，尚未出現跨區崩解現象。`;

  return `
    <div class="news-title">${title}</div>
    <div class="news-body">${body.replace(/\n\n/g,"<p></p>")}</div>
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
初始化
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
