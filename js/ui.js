let articles = [];
let index = 0;

function initializeNews(){

  document.getElementById("headline").innerText = "空島通訊社整理中";
  document.getElementById("mainText").innerText = "正在整理今日新聞資料…";

  setTimeout(()=>{

    articles = generateNewsBatch(world);
    index = 0;

    render();

  }, 10000);
}

function render(){

  let a = articles[index];

  document.getElementById("headline").innerText = a.title;
  document.getElementById("mainText").innerText = a.content;

  document.getElementById("stats").innerHTML = `
    <div class="stat">📰 第 ${index+1} / 10 則</div>
    <div class="stat">⏰ ${a.time}</div>
  `;

  let list = document.getElementById("newsList");
  list.innerHTML = "";

  articles.forEach((n,i)=>{
    let div = document.createElement("div");
    div.className = "news-item";
    div.innerText = n.title;
    list.appendChild(div);
  });
}

function nextArticle(){
  index++;
  if(index >= articles.length) index = 0;
  render();
}

function prevArticle(){
  index--;
  if(index < 0) index = articles.length - 1;
  render();
}

// 5分鐘更新一次新聞
setInterval(()=>{

  if(articles.length > 0){
    articles = generateNewsBatch(world);
    index = 0;
    render();
  }

}, 300000);

window.onload = initializeNews;
