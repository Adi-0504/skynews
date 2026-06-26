let world = createWorld();

function createWorld(){
  return {
    env: [],
    economy: [],
    transport: [],
    society: []
  };
}

// 初始化資料（保留你的500+變數概念）
for(let i=0;i<200;i++){
  world.env.push({
    temp: rand(10,35),
    rain: rand(0,100),
    wind: rand(0,100)
  });
}

for(let i=0;i<150;i++){
  world.economy.push({
    price: rand(50,200),
    inflation: rand(-5,10)
  });
}

for(let i=0;i<80;i++){
  world.transport.push({
    delay: rand(0,50),
    load: rand(0,100)
  });
}

for(let i=0;i<100;i++){
  world.society.push({
    production: rand(0,100),
    flow: rand(-10,10)
  });
}
