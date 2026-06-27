const world = {
  year: 1353,
  months: [
    "綠芽月","細雨月","花落月","熙陽月","綠葉月",
    "秋楓月","豐饒月","星空月","寒霜月","冰雪月"
  ],
  locations: {
    "薩拉村": ["豆餅攤","水井","補給站"],
    "卡諾交易區": ["布料攤","香料攤","木材點"],
    "雷瓦村": ["魚乾市場","鐵匠鋪","廣場"]
  }
};

const memory = {
  day: 1,
  reports: {}
};

function getTime(day){
  const m = Math.floor((day-1)/35);
  const d = ((day-1)%35)+1;

  const year = world.year + Math.floor(m/10);
  const month = world.months[m%10];

  return `浮空曆${year}年・${month}・第${d}日`;
}

const r = arr => arr[Math.floor(Math.random()*arr.length)];

function event(){
  return {
    region: r(Object.keys(world.locations)),
    spot: r(world.locations[r(Object.keys(world.locations))]),
    type: r(["market","logistics","move"])
  };
}

function narrate(e){
  if(e.type==="market") return `${e.region}・${e.spot}人潮增加`;
  if(e.type==="logistics") return `${e.region}・${e.spot}補給變慢`;
  if(e.type==="move") return `${e.region}・${e.spot}出現人流集中`;
  return "局部變化";
}

function report(day){

  if(memory.reports[day]) return memory.reports[day];

  let ev = [];
  for(let i=0;i<50;i++) ev.push(event());

  let html = `
<div class="headline">空島各區局部流動變化報導</div>
<p>${getTime(day)}</p>
<p>今日空島各聚落出現輕微人流與交易調整。</p>
<p><b>現場觀察</b></p>
`;

  ev.forEach(e=>{
    html += `<p>・${narrate(e)}</p>`;
  });

  html += `
<p><b>結論</b></p>
<p>整體系統穩定，局部區域形成短暫熱點。</p>
`;

  memory.reports[day] = html;
  return html;
}

function render(){
  document.getElementById("content").innerHTML = report(memory.day);
  document.getElementById("time").innerText = getTime(memory.day);
}

/* 🧠 零 onclick 綁定 */
function init(){

  document.getElementById("prevBtn")
    .addEventListener("click", ()=>{
      if(memory.day>1){
        memory.day--;
        render();
      }
    });

  document.getElementById("nextBtn")
    .addEventListener("click", ()=>{
      memory.day++;
      render();
    });

  render();
}

init();
