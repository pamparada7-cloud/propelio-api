export default async function handler(req, res) {
  try {
    const { imageUrl, mode } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    // 🔥 PROMPT
    let prompt = "";

    if (mode === "pro") {
      prompt = `Enhance this real estate photo professionally with better lighting, colors and sharpness. Keep it realistic.`;
    }

    if (mode === "sky") {
      prompt = `Replace the sky with a natural blue sky, realistic lighting.`;
    }

    if (mode === "remove") {
      prompt = `Remove unwanted objects and fill naturally.`;
    }

    // 🔥 DESCARGAR IMAGEN
    const imageResponse = await fetch(imageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 🔥 FORM DATA (IMPORTANTE)
    const formData = new FormData();
    formData.append("model", "gpt-image-1");
    formData.append("prompt", prompt);
    formData.append("image", new Blob([buffer]), "image.png");

    // 🔥 LLAMADA A OPENAI
    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!data?.data?.[0]) {
      console.error(data);
      return res.status(500).json({ error: "Error IA" });
    }

    const improvedUrl = data.data[0].url;

    return res.status(200).json({ improvedUrl });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno" });
  }
}
