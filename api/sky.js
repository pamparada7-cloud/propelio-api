export default async function handler(req, res) {
  try {
    const { imageUrl } = req.body;

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
        imageUrl: imageUrl,
        sky: "blue" // podés cambiar a "sunset" o "cloudy" después
      })
    });

    const data = await response.json();

    if (!data || !data.result_url) {
      console.error("Error en respuesta:", data);
      return res.status(500).json({ error: "No se pudo mejorar el cielo" });
    }

    return res.status(200).json({
      improvedUrl: data.result_url
    });

  } catch (error) {
    console.error("ERROR SKY:", error);
    return res.status(500).json({ error: "Error al procesar cielo" });
  }
}
