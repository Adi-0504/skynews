let articles = [];
let index = 0;

function showLoading(){

  document.getElementById("headline").innerText = "空島通訊社整理中";
  document.getElementById("mainText").innerText = "AI正在撰寫新聞…";
}

async function initializeNews(){

  showLoading();

  await new Promise(r => setTimeout(r, 5000));

  if(typeof loadLLM === "function"){
    await loadLLM();
  }

  articles = await generateNewsBatch(world);

  index = 0;

  render();
}

function render(){

  const a = articles[index];

  document.getElementById("headline").innerText = a.title;
  document.getElementById("mainText").innerText = a.content;

  document.getElementById("stats").innerHTML = `
    <div class="stat">📰 第 ${index+1} / 10 則</div>
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

function nextArticle(){
  index = (index + 1) % articles.length;
  render();
}

function prevArticle(){
  index = (index - 1 + articles.length) % articles.length;
  render();
}

/* 🔥 掛到全域（關鍵） */
window.initializeNews = initializeNews;
window.nextArticle = nextArticle;
window.prevArticle = prevArticle;

window.onload = initializeNews;
