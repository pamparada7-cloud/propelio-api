export default async function handler(req, res) {

  // ✅ CORS FIX (OBLIGATORIO)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // ✅ INPUT
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    // ✅ LLAMADA A PHOTOROOM (sky replacement)
    const response = await fetch("https://sdk.photoroom.com/v1/sky-replacement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.PHOTOROOM_API_KEY
      },
      body: JSON.stringify({
        imageUrl: imageUrl,
        sky: "sunny" // podés cambiar a: sunset, blue-sky, cloudy
      })
    });

    const data = await response.json();

    // ❌ ERROR CONTROLADO
    if (!data?.result_url) {
      console.error("Sky error:", data);
      return res.status(500).json({
        error: "No se pudo mejorar el cielo",
        detail: data
      });
    }

    // ✅ OK
    return res.status(200).json({
      imageUrl: data.result_url
    });

  } catch (error) {
    console.error("ERROR SKY:", error);
    return res.status(500).json({
      error: "Error en sky",
      detail: error.message
    });
  }
}
