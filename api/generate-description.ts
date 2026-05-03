export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Falta el prompt" });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log("API KEY:", process.env.GEMINI_API_KEY);
const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY,
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

if (!data.candidates) {
  return res.status(500).json({ error: data });
}

const text = data.candidates[0].content.parts[0].text;

res.status(200).json({ text });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
