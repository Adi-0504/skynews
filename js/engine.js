function avg(arr){

  let keys = Object.keys(arr[0]);
  let out = {};

  keys.forEach(k=>{
    out[k] = arr.reduce((a,b)=>a+(b[k]||0),0)/arr.length;
  });

  return out;
}

function pickHeadline(env,eco,trans,soc){

  if(eco.price > 150) return "市場價格上升";
  if(trans.delay > 30) return "空鷹交通延誤";
  if(env.rain > 60) return "降雨影響農業";
  return "空島系統穩定";
}

function generateArticle(env,eco,trans,soc){

  return `
空島通訊社報導：氣溫 ${env.temp.toFixed(1)}°C。

降雨狀況：${env.rain.toFixed(0)}。
經濟指數：${eco.price.toFixed(0)}。
交通延遲：${trans.delay.toFixed(0)}%。

各島系統維持基本穩定運作。
報導編號：${Math.random().toString(36).slice(2,8)}
`;
}

async function generateNewsBatch(world){

  const env = avg(world.env);
  const eco = avg(world.economy);
  const trans = avg(world.transport);
  const soc = avg(world.society);

  let articles = [];

  for(let i=0;i<10;i++){

    let title = pickHeadline(env,eco,trans,soc);

    if(Math.random() > 0.7){
      title = "突發：空鷹航線異常";
    }

    let draft = generateArticle(env,eco,trans,soc);

    let content = draft;

    // 🧠 如果 LLM 存在就潤稿
    if(typeof polish === "function"){
      content = await polish(draft);
    }

    articles.push({
      title,
      content,
      time: new Date().toLocaleString()
    });
  }

  return articles;
}
