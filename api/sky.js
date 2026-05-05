export default async function handler(req, res) {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    // descargar imagen
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();

    const formData = new FormData();
    formData.append("image_file", new Blob([imageBuffer]), "photo.jpg");

    const response = await fetch("https://sdk.photoroom.com/v1/segment", {
      method: "POST",
      headers: {
        "x-api-key": process.env.PHOTOROOM_API_KEY
      },
      body: formData
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: text });
    }

    const resultBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from(resultBuffer));

  } catch (error) {
    console.error("ERROR SKY:", error);
    res.status(500).json({ error: "Error al procesar cielo" });
  }
}
