function avg(arr){

  let keys = Object.keys(arr[0]);
  let out = {};

  keys.forEach(k=>{
    out[k] = arr.reduce((a,b)=>a+(b[k]||0),0)/arr.length;
  });

  return out;
}

function generateNewsBatch(world){

  const env = avg(world.env);
  const eco = avg(world.economy);
  const trans = avg(world.transport);
  const soc = avg(world.society);

  let articles = [];

  for(let i=0;i<10;i++){

    articles.push({
      title: pickHeadline(env,eco,trans,soc),
      content: generateArticle(env,eco,trans,soc),
      time: new Date().toLocaleString()
    });
  }

  return articles;
}

function generateArticle(env,eco,trans,soc){

  let text = [];

  text.push(`空島通訊社報導：今日平均氣溫 ${env.temp.toFixed(1)} 度，氣候系統維持穩定運作。`);

  if(env.rain > 60){
    text.push("近期降雨量偏高，部分農業區域已啟動排水措施，以確保作物安全。");
  }else{
    text.push("整體天氣穩定，各島農業與生活活動維持正常運作。");
  }

  if(eco.price > 150){
    text.push("市場價格上升，部分民生物資出現供應緊縮現象。");
  }else{
    text.push("經濟系統穩定，市場交易維持正常水平。");
  }

  if(trans.delay > 30){
    text.push("空鷹物流出現延誤，跨島運輸效率受到短暫影響。");
  }else{
    text.push("空鷹交通網運作順暢，物流系統保持高效率。");
  }

  text.push("空島通訊社持續追蹤各島狀況，後續將提供最新更新。");

  return text.join(" ");
}

function pickHeadline(env,eco,trans,soc){

  if(eco.price > 150) return "市場價格上升影響空島經濟";
  if(trans.delay > 30) return "空鷹交通延誤造成物流壓力";
  if(env.rain > 60) return "森林島降雨增加引發農業關注";
  return "空島系統維持穩定運作";
}
