function generate(){

  const data = generateNewsData();

  // 📰 BBC主標
  document.getElementById("headline").innerText = data.headline;
  document.getElementById("mainText").innerText = data.main;

  // 📊 東森數據
  document.getElementById("stats").innerHTML = `
    <div class="stat">🌤 ${data.weather}</div>
    <div class="stat">💰 ${data.economy}</div>
    <div class="stat">🕊 ${data.transport}</div>
  `;

  // 🧾 日本新聞列表
  const list = document.getElementById("newsList");
  list.innerHTML = "";

  data.items.forEach(n=>{
    const div = document.createElement("div");
    div.className = "news-item";
    div.innerText = n;
    list.appendChild(div);
  });
}
