export default async function handler(req, res) {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    // Transformaciones tipo Zillow
    const improvedUrl = imageUrl.replace(
      "/upload/",
      "/upload/f_auto,q_auto,e_improve,e_sharpen/"
    );

    return res.status(200).json({ improvedUrl });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ error: "Error al mejorar imagen" });
  }
}
