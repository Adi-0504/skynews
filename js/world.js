let world = createWorld();

function createWorld(){

  const islands = ["平原島","森林島","礦山島","沙灘島"];

  let w = {
    env: [],
    eco: [],
    trans: [],
    soc: []
  };

  // 🌤 環境（200）
  islands.forEach(island=>{
    for(let i=0;i<50;i++){
      w.env.push({
        island,
        temp: rand(10,35),
        rain: rand(0,100),
        wind: rand(0,100)
      });
    }
  });

  // 💰 經濟（150）
  for(let i=0;i<150;i++){
    w.eco.push({
      price: rand(50,200),
      inflation: rand(-5,10)
    });
  }

  // 🕊 交通（80）
  for(let i=0;i<80;i++){
    w.trans.push({
      delay: rand(0,50),
      load: rand(0,100)
    });
  }

  // 📊 社會（100）
  for(let i=0;i<100;i++){
    w.soc.push({
      production: rand(0,100),
      flow: rand(-10,10)
    });
  }

  return w;
}let world = createWorld();

function createWorld(){

  const islands = ["平原島","森林島","礦山島","沙灘島"];

  let w = {
    env: [],
    eco: [],
    trans: [],
    soc: []
  };

  // 🌤 環境（200）
  islands.forEach(island=>{
    for(let i=0;i<50;i++){
      w.env.push({
        island,
        temp: rand(10,35),
        rain: rand(0,100),
        wind: rand(0,100)
      });
    }
  });

  // 💰 經濟（150）
  for(let i=0;i<150;i++){
    w.eco.push({
      price: rand(50,200),
      inflation: rand(-5,10)
    });
  }

  // 🕊 交通（80）
  for(let i=0;i<80;i++){
    w.trans.push({
      delay: rand(0,50),
      load: rand(0,100)
    });
  }

  // 📊 社會（100）
  for(let i=0;i<100;i++){
    w.soc.push({
      production: rand(0,100),
      flow: rand(-10,10)
    });
  }

  return w;
}
