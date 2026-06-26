let LLM_READY = true;

/* =========================
   假 LLM 初始化（秒完成）
========================= */
async function loadLLM(){

  console.log("⚡ Fast LLM ready (no model download)");

  LLM_READY = true;
}

/* =========================
   超快「潤稿器」（不用AI模型）
========================= */
function polish(text){

  if(!LLM_READY) return text;

  const styles = [
    "本社報導指出，",
    "最新消息顯示，",
    "據空島通訊社觀察，",
    "相關單位表示，"
  ];

  const suffix = [
    "目前情勢仍持續觀察中。",
    "後續發展將持續追蹤。",
    "各島運作仍維持基本穩定。",
    "詳細情況仍待進一步確認。"
  ];

  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  return `
${pick(styles)}${text}

${pick(suffix)}
`;
}
