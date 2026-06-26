let generator = null;

async function loadLLM(){

  const { pipeline } = await import(
    "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2"
  );

  generator = await pipeline(
    "text-generation",
    "Xenova/distilgpt2"
  );

  console.log("🧠 LLM loaded");
}

async function polish(text){

  if(!generator) return text;

  const result = await generator(text, {
    max_new_tokens: 120,
    temperature: 0.7
  });

  return result[0].generated_text;
}
