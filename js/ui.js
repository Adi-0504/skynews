let articles = [];
let index = 0;
let INIT_DONE = false;

/* =========================
   loading
========================= */
function showLoading(){

  document.getElementById("headline").innerText = "空島通訊社整理中";
  document.getElementById("mainText").innerText = "新聞生成中…";
}

/* =========================
   初始化（只跑一次🔥）
========================= */
async function initializeNews(){

  if(INIT_DONE) return;
  INIT_DONE = true;

  showLoading();

  await new Promise(r => setTimeout(r, 5000));

  articles = await generateNewsBatch(world);

  index = 0;

  render();
}

/* =========================
   render（安全版）
========================= */
function render(){

  if(!articles || articles.length === 0){
    document.getElementById("headline").innerText = "尚未生成新聞";
    document.getElementById("mainText").innerText = "請稍候…";
    return;
  }

  const a = articles[index];

  if(!a){
    index = 0;
    return render();
  }

  document.getElementById("headline").innerText = a.title;
  document.getElementById("mainText").innerText = a.content;

  document.getElementById("stats").innerHTML = `
    <div>📰 第 ${index+1} / ${articles.length} 則</div>
    <div>⏰ ${a.time}</div>
  `;

  const list = document.getElementById("newsList");
  list.innerHTML = "";

  articles.forEach(n=>{
    const div = document.createElement("div");
    div.className = "news-item";
    div.innerText = n.title;
    list.appendChild(div);
  });
}

/* =========================
   翻頁
========================= */
function nextArticle(){
  if(!articles.length) return;
  index = (index + 1) % articles.length;
  render();
}

function prevArticle(){
  if(!articles.length) return;
  index = (index - 1 + articles.length) % articles.length;
  render();
}

/* =========================
   全域掛載
========================= */
window.initializeNews = initializeNews;
window.nextArticle = nextArticle;
window.prevArticle = prevArticle;

/* ⚡ 自動啟動（只一次） */
window.onload = initializeNews;
