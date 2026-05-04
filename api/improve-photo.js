export default async function handler(req, res) {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    const response = await fetch("https://sdk.photoroom.com/v1/segment", {
      method: "POST",
      headers: {
        "x-api-key": process.env.PHOTOROOM_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_url: imageUrl
      })
    });

    const data = await response.arrayBuffer();

    return res.status(200).send(Buffer.from(data));
  } catch (error) {
    console.error("ERROR PHOTOROOM:", error);
    return res.status(500).json({ error: "Error al procesar imagen" });
  }
}
