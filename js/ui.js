let articles = [];
let index = 0;

/* =========================
   loading 畫面
========================= */
function showLoading(){

  document.getElementById("headline").innerText = "空島通訊社整理中";
  document.getElementById("mainText").innerText = "AI正在撰寫新聞…";
}

/* =========================
   初始化新聞（主流程）
========================= */
async function initializeNews(){

  showLoading();

  // ⏳ 5秒 loading
  await new Promise(r => setTimeout(r, 5000));

  // 🧠 載入 LLM
  if(typeof loadLLM === "function"){
    await loadLLM();
  }

  // 📰 生成新聞
  articles = await generateNewsBatch(world);

  index = 0;

  render();
}

/* =========================
   安全渲染（防炸）
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
    <div class="stat">📰 第 ${index+1} / ${articles.length} 則</div>
    <div class="stat">⏰ ${a.time}</div>
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
   下一則（安全版）
========================= */
function nextArticle(){

  if(!articles || articles.length === 0) return;

  index = (index + 1) % articles.length;

  render();
}

/* =========================
   上一則（安全版）
========================= */
function prevArticle(){

  if(!articles || articles.length === 0) return;

  index = (index - 1 + articles.length) % articles.length;

  render();
}

/* =========================
   掛到全域（必須）
========================= */
window.initializeNews = initializeNews;
window.nextArticle = nextArticle;
window.prevArticle = prevArticle;

/* =========================
   自動啟動
========================= */
window.onload = initializeNews;
