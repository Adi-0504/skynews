function avg(arr){

  let keys = Object.keys(arr[0]);
  let out = {};

  keys.forEach(k=>{
    out[k] = arr.reduce((a,b)=>a+(b[k]||0),0)/arr.length;
  });

  return out;
}

function generateArticle(env,eco,trans,soc){

  let text = [];

  text.push(`空島通訊社報導：氣候溫度 ${env.temp.toFixed(1)}°C，系統運作正常。`);

  if(env.rain > 60){
    text.push("降雨偏高，部分地區啟動排水系統。");
  }else{
    text.push("氣候穩定，各島運作正常。");
  }

  if(eco.price > 150){
    text.push("市場價格上升，物資供應略有壓力。");
  }else{
    text.push("經濟穩定，交易活動正常。");
  }

  if(trans.delay > 30){
    text.push("空鷹物流出現延誤。");
  }else{
    text.push("空鷹運輸正常。");
  }

  text.push(`報導編號：${Math.random().toString(36).slice(2,8)}`);

  return text.join(" ");
}

function pickHeadline(env,eco,trans,soc){

  if(eco.price > 150) return "市場價格上升";
  if(trans.delay > 30) return "空鷹交通延誤";
  if(env.rain > 60) return "降雨影響農業";
  return "空島系統穩定";
}

async function generateNewsBatch(world){

  const env = avg(world.env);
  const eco = avg(world.economy);
  const trans = avg(world.transport);
  const soc = avg(world.society);

  let articles = [];

  for(let i=0;i<10;i++){

    let title = pickHeadline(env,eco,trans,soc);

    if(Math.random() > 0.7) title = "突發：空鷹航線異常";

    let draft = generateArticle(env,eco,trans,soc);

    let prompt = `
請把以下內容改寫成正式新聞（約500字）：

${draft}
`;

    let content = await polish(prompt);

    articles.push({
      title,
      content,
      time: new Date().toLocaleString()
    });
  }

  return articles;
}
