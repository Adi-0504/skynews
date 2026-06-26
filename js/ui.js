let articles = [];
let index = 0;

/* =========================
   初始化新聞（含 loading）
========================= */
async function initializeNews(){

  showLoading();

  // 等 10 秒模擬「空島通訊社整理」
  setTimeout(async ()=>{

    if(typeof loadLLM === "function"){
      await loadLLM();
    }

    articles = await generateNewsBatch(world);

    index = 0;

    render();

  }, 10000);
}

/* =========================
   畫面渲染
========================= */
function render(){

  if(!articles.length) return;

  const a = articles[index];

  document.getElementById("headline").innerText = a.title;
  document.getElementById("mainText").innerText = a.content;

  document.getElementById("stats").innerHTML = `
    <div class="stat">📰 第 ${index+1} / ${articles.length} 則</div>
    <div class="stat">⏰ ${a.time}</div>
  `;

  const list = document.getElementById("newsList");
  list.innerHTML = "";

  articles.forEach((n,i)=>{
    const div = document.createElement("div");
    div.className = "news-item";
    div.innerText = n.title;
    list.appendChild(div);
  });
}

/* =========================
   下一則
========================= */
function nextArticle(){

  if(!articles.length) return;

  index++;

  if(index >= articles.length){
    index = 0;
  }

  render();
}

/* =========================
   上一則
========================= */
function prevArticle(){

  if(!articles.length) return;

  index--;

  if(index < 0){
    index = articles.length - 1;
  }

  render();
}

/* =========================
   loading 畫面
========================= */
function showLoading(){

  document.getElementById("headline").innerText = "空島通訊社整理中";
  document.getElementById("mainText").innerText = "正在整理今日新聞資料…";
}

/* =========================
   5分鐘更新新聞
========================= */
setInterval(async ()=>{

  if(articles.length === 0) return;

  articles = await generateNewsBatch(world);

  index = 0;

  render();

}, 300000);

/* =========================
   🔥 關鍵修復：掛到 window
========================= */
window.initializeNews = initializeNews;
window.nextArticle = nextArticle;
window.prevArticle = prevArticle;

/* =========================
   自動啟動
========================= */
window.onload = initializeNews;
