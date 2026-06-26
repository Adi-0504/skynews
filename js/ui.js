
let articles = [];
let index = 0;

let state = {
  loading: false
};

/* =========================
   loading 畫面
========================= */
function showLoading(){

  document.getElementById("headline").innerText = "空島通訊社整理中";
  document.getElementById("mainText").innerText = "新聞生成中…請稍候";
}

/* =========================
   初始化新聞
========================= */
async function initializeNews(){

  if(state.loading) return;

  state.loading = true;

  showLoading();

  await sleep(5000);

  try{

    articles = await generateNewsBatch(world);

    index = 0;

    render();

  }catch(err){

    console.error(err);

    document.getElementById("headline").innerText = "新聞載入失敗";
    document.getElementById("mainText").innerText = "請重新整理";
  }

  state.loading = false;
}

/* =========================
   render（純新聞閱讀模式🔥）
========================= */
function render(){

  if(!articles || articles.length === 0){
    document.getElementById("headline").innerText = "尚無新聞";
    document.getElementById("mainText").innerText = "請稍候或重新整理";
    return;
  }

  const a = articles[index];

  if(!a){
    index = 0;
    return render();
  }

  document.getElementById("headline").innerText = a.title;

  // 🧠 讓新聞變「一整篇文章感」
  document.getElementById("mainText").innerText =
    `【空島通訊社報導】\n\n${a.content}\n\n📅 ${a.time}`;
}

/* =========================
   下一篇
========================= */
function nextArticle(){

  if(!articles.length) return;

  index = (index + 1) % articles.length;

  render();
}

/* =========================
   上一篇
========================= */
function prevArticle(){

  if(!articles.length) return;

  index = (index - 1 + articles.length) % articles.length;

  render();
}

/* =========================
   工具
========================= */
function sleep(ms){
  return new Promise(r => setTimeout(r, ms));
}

/* =========================
   全域掛載
========================= */
window.initializeNews = initializeNews;
window.nextArticle = nextArticle;
window.prevArticle = prevArticle;

/* =========================
   自動啟動
========================= */
window.onload = initializeNews;
