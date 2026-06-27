
/* =========================
🌍 世界資料
========================= */

const cities = ["莫雷","比亞","卡諾","索維","雷瓦","奧恩","拉維爾","希諾","維卡","多恩","米蘭","克羅","塔維","諾亞","薩恩","布拉","維諾","哈爾","奧瑞","利亞","格恩","索拉","米卡","杜恩","洛維"];

const villages = ["薩拉村","米諾村","洛森村","卡里村","風葉村","灰岩村","白砂村","雲谷村","木溪村","石原村","霧川村","青禾村","北嶺村","南霧村","月溪村","星落村","海風村","雨林村","火石村","銀川村","寒霜村","暖谷村","風港村","鐵木村","石橋村","草原村","雲石村","夜林村","晨曦村","風嵐村","沙灣村","黑岩村","白霧村","綠田村","藍灣村","赤土村","冷溪村","暖風村","遠山村","霜葉村","光谷村","影林村","雲岬村","風嶼村","星河村","雷鳴村","靜水村","灰谷村","白川村","風砂村"];

const world = {
  year: 1353,
  months: ["綠芽月","細雨月","花落月","熙陽月","綠葉月","秋楓月","豐饒月","星空月","寒霜月","冰雪月"]
};

const memory = {
  day: 1,
  reports: {} // 👈 改：存歷史
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
事件生成（40個，不再爆炸）
========================= */

function makeEvents(){
  const pool = ["market","logistics","population","incident","rumor","weather"];

  const locations = [...cities, ...villages];

  return Array.from({length:40}).map(()=>({
    place: r(locations),
    type: r(pool)
  }));
}

/* =========================
事件分類（關鍵升級）
========================= */

function classify(events){

  const groups = {
    market: [],
    logistics: [],
    population: [],
    incident: [],
    rumor: [],
    weather: []
  };

  for(const e of events){
    groups[e.type].push(e);
  }

  return groups;
}

/* =========================
轉成「故事」不是句子
========================= */

function buildStory(type, list){

  const placeCount = {};

  for(const e of list){
    placeCount[e.place] = (placeCount[e.place] || 0) + 1;
  }

  const topPlaces = Object.entries(placeCount)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,3)
    .map(x=>x[0]);

  switch(type){

    case "market":
      return `
今日空島多個地區市場活動同步升溫，其中 ${topPlaces.join("、")} 成為主要交易集中區。

觀測顯示，這些區域的貨物流動明顯加快，尤其是糧食與手工製品需求上升最為明顯。部分攤位出現長時間排隊現象，顯示短期需求正在集中爆發。

專家認為，這種現象通常與跨島補給週期有關，可能代表下一輪物流調整即將開始。
`;

    case "logistics":
      return `
本日空島物流系統出現局部延遲，主要集中於 ${topPlaces.join("、")} 一帶。

空鷹運輸節點回報顯示，部分航線調度時間延長，導致貨物流轉效率下降。雖然整體系統仍維持運作，但部分物資已改道至鄰近城市處理。

若此狀態持續，可能會影響下一階段的市場供應節奏。
`;

    case "population":
      return `
人口流動在 ${topPlaces.join("、")} 出現明顯集中趨勢。

短時間內大量居民向特定區域移動，使得部分市場與補給點承受額外壓力。此類現象通常與交易機會或資源分配變化有關。

目前尚未觀測到擁擠失控，但區域管理已開始進行流量調整。
`;

    case "weather":
      return `
空島氣候系統在 ${topPlaces.join("、")} 出現短期波動。

風流密度與雲層結構變化，使部分空鷹航線需調整飛行高度。雖未造成中斷，但已影響運輸效率。

氣象觀測中心表示，此類變動通常持續時間不長，但仍需持續監控。
`;

    case "rumor":
      return `
資訊流動異常在 ${topPlaces.join("、")} 擴散。

當地居民之間出現大量未經確認的消息交流，主要集中在資源分配與市場變動議題上。雖未造成實質混亂，但已影響部分交易信心。

目前管理單位已開始介入資訊整理。
`;

    case "incident":
      return `
局部區域在 ${topPlaces.join("、")} 出現異常事件紀錄。

監測系統顯示短暫不穩定波動，但未形成跨區連鎖反應。事件細節仍在調查中，目前未影響主要城市運作。

系統評估為低風險等級。
`;

    default:
      return `系統出現一般性變化。`;
  }
}

/* =========================
生成專題
========================= */

function generateReport(day){

  const events = makeEvents();
  const groups = classify(events);

  const stories = [];

  for(const key in groups){
    if(groups[key].length > 0){
      stories.push(buildStory(key, groups[key]));
    }
  }

  // 只取 3~5篇
  const finalStories = stories.slice(0,5);

  const title = `
<div class="headline">
空島跨區域觀測報導
</div>
<p>${getTime(day)}</p>
`;

  const body = finalStories.map((s,i)=>`
<div class="article">
<div class="title">專題 ${i+1}</div>
<p>${s}</p>
</div>
`).join("");

  const footer = `
<div class="article">
<div class="title">總體觀測</div>
<p>
今日空島整體維持穩定，但局部市場與物流系統出現輕微波動。
事件未形成連鎖效應，系統仍處於可控範圍。
</p>
</div>
`;

  return title + body + footer;
}

/* =========================
render + history
========================= */

function render(){

  document.getElementById("time").innerText = getTime(memory.day);

  if(!memory.reports[memory.day]){
    memory.reports[memory.day] = generateReport(memory.day);
  }

  document.getElementById("content").innerHTML = memory.reports[memory.day];
}

/* =========================
init
========================= */

function init(){

  document.getElementById("prevBtn").addEventListener("click", ()=>{
    if(memory.day > 1){
      memory.day--;
      render();
    }
  });

  document.getElementById("nextBtn").addEventListener("click", ()=>{
    memory.day++;
    render();
  });

  render();
}

init();
