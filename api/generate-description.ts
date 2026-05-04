// @ts-ignore
export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Falta el prompt" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    console.log("API KEY:", apiKey);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
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

    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No se pudo generar la descripción";

    return res.status(200).json({ result: text });
  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
