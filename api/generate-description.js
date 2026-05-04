export default async function handler(req, res) {
  try {
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
            content: `Crea una descripción inmobiliaria atractiva para: ${prompt}`
          }
        ],
      }),
    });

    const data = await response.json();

    const text =
      data.choices?.[0]?.message?.content ||
      "No se pudo generar la descripción";

    return res.status(200).json({ result: text });

  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
