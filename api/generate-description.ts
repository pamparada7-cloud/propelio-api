export default async function handler(req: any, res: any) {
  const { prompt } = req.body;

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
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

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "Error generando texto";

  res.status(200).json({ text });
}
