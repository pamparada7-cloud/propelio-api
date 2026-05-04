export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    // Validación
    if (!prompt) {
      return res.status(400).json({ error: "Falta el prompt" });
    }

    // 👉 Verificar que la API key está llegando
    console.log("API KEY:", process.env.GEMINI_API_KEY);

    // 👉 Llamada correcta a Gemini
    const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("RESPONSE GEMINI:", data);

    // 👉 Manejo de error si Gemini falla
    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    // 👉 Respuesta correcta
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No se pudo generar la descripción";

    return res.status(200).json({ result: text });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
