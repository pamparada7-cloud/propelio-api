export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // DEBUG (puedes borrarlo después)
    console.log("API KEY:", process.env.OPENAI_API_KEY);

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Falta el prompt" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "user",
            content: `Crea una descripción inmobiliaria atractiva, persuasiva y profesional para la siguiente propiedad: ${prompt}`,
          },
        ],
      }),
    });

    const data = await response.json();

    // 🔍 DEBUG IMPORTANTE
    console.log("OPENAI RESPONSE:", JSON.stringify(data, null, 2));

    // 👉 Si OpenAI devuelve error
    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    const result = data.choices?.[0]?.message?.content;

    return res.status(200).json({ result });

  } catch (error) {
    console.error("ERROR GENERAL:", error);
    return res.status(500).json({ error: "Error interno" });
  }
}
