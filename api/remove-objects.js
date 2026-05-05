export default async function handler(req, res) {

  // ✅ CORS FIX
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // ✅ ESTE ES EL ERROR QUE TE FALTABA
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    const response = await fetch("https://sdk.photoroom.com/v1/remove-object", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.PHOTOROOM_API_KEY
      },
      body: JSON.stringify({
        imageUrl
      })
    });

    const data = await response.json();

    if (!data?.result_url) {
      console.error("Remove error:", data);
      return res.status(500).json({ error: "No se pudo borrar objetos" });
    }

    return res.status(200).json({ imageUrl: data.result_url });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ error: "Error en remove-objects" });
  }
}
