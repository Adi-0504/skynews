function generateNewsData(){

  const env = avg(world.env);
  const eco = avg(world.economy);
  const trans = avg(world.transport);
  const soc = avg(world.society);

  return {
    headline: pickHeadline(env,eco,trans,soc),

    main: "四島系統維持運作，各項指標穩定更新中。",

    weather: `溫度 ${env.temp.toFixed(1)}°C`,
    economy: `物價 ${eco.price.toFixed(0)}`,
    transport: `延遲 ${trans.delay.toFixed(0)}%`,

    items:[
      "平原島農業穩定",
      "森林島供應正常",
      "礦山島出口微降",
      "沙灘島運作正常"
    ]
  };
}

function pickHeadline(env,eco,trans,soc){

  if(eco.price > 150)
    return "市場價格上升，糧食供應緊縮";

  if(trans.delay > 30)
    return "空鷹交通延誤影響物流";

  if(env.rain > 70)
    return "森林島降雨增加影響農業";

  if(soc.production > 70)
    return "四島生產維持成長";

  return "空島系統運作正常";
}
