let generator = null;

/* =========================
   載入 LLM（穩定版🔥）
========================= */
async function loadLLM(){

  if(generator) return;

  const { pipeline } = await import(
    "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js"
  );

  generator = await pipeline(
    "text-generation",
    "Xenova/gpt2"
  );

  console.log("🧠 LLM ready (route 2)");
}

/* =========================
   潤稿（新聞用）
========================= */
async function polish(text){

  if(!generator) return text;

  const result = await generator(text, {
    max_new_tokens: 80,
    temperature: 0.7,
    repetition_penalty: 1.1
  });

  return result[0].generated_text;
}
