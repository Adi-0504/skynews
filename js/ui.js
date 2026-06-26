function generate(){

  try{

    const data = generateNewsData();

    if(!data){
      throw new Error("No data from generateNewsData()");
    }

    document.getElementById("headline").innerText = data.headline || "無標題";
    document.getElementById("mainText").innerText = data.main || "";

    document.getElementById("stats").innerHTML = `
      <div class="stat">🌤 ${data.weather || "-"}</div>
      <div class="stat">💰 ${data.economy || "-"}</div>
      <div class="stat">🕊 ${data.transport || "-"}</div>
    `;

    const list = document.getElementById("newsList");
    list.innerHTML = "";

    (data.items || []).forEach(n=>{
      const div = document.createElement("div");
      div.className = "news-item";
      div.innerText = n;
      list.appendChild(div);
    });

  }catch(err){
    console.log("ERROR:", err);

    document.getElementById("headline").innerText =
      "系統錯誤（請檢查 engine.js）";

    document.getElementById("mainText").innerText =
      "資料生成失敗，但UI仍可運作";
    window.generate = generate;
  }
}
