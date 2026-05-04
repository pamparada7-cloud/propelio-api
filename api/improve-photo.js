export default async function handler(req, res) {
  try {
    const { imageUrl, mode } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    // 🔥 PROMPTS SEGÚN MODO
    let prompt = "";

    if (mode === "sky") {
      prompt = `
Enhance this real estate photo by replacing the sky with a natural blue sky.
Keep lighting realistic and consistent with the scene.
      `;
    }

    if (mode === "remove") {
      prompt = `
Remove unwanted objects from this real estate photo.
Fill the space naturally, keeping textures and lighting realistic.
      `;
    }

    if (mode === "pro") {
      prompt = `
Enhance this real estate photo professionally:
- improve brightness and lighting
- balance colors naturally
- sharpen details
- make it look clean and attractive for selling property
- keep it realistic, not over-processed
      `;
    }

    // 🔥 LLAMADA A OPENAI
    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        image: imageUrl,
        size: "1024x1024"
      })
    });

    const data = await response.json();

    if (!data || !data.data || !data.data[0]) {
      console.error("ERROR OPENAI:", data);
      return res.status(500).json({ error: "Error generando imagen IA" });
    }

    const improvedUrl = data.data[0].url;

    return res.status(200).json({ improvedUrl });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ error: "Error interno IA" });
  }
}
