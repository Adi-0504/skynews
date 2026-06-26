function rand(min,max){
  return Math.random()*(max-min)+min;
}

function avg(arr){
  let keys = Object.keys(arr[0]);
  let out = {};

  keys.forEach(k=>{
    out[k] = arr.reduce((a,b)=>a+b[k],0)/arr.length;
  });

  return out;
}
