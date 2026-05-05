module.exports = async function handler(req, res) {

  // ✅ CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // ✅ IMPORTANTE: esto arregla tu error actual
    const { imageUrl } = req.body || {};

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    const response = await fetch("https://sdk.photoroom.com/v1/sky-replacement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.PHOTOROOM_API_KEY
      },
      body: JSON.stringify({
        imageUrl,
        sky: "sunny"
      })
    });

    const data = await response.json();

    if (!data || !data.result_url) {
      console.error("Sky error:", data);
      return res.status(500).json({
        error: "No se pudo mejorar el cielo",
        detail: data
      });
    }

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
};
