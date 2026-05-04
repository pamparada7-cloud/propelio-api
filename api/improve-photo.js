export default async function handler(req, res) {
  try {
    const { imageUrl, style } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    let transformation = "";

    if (style === "natural") {
      transformation = "f_auto,q_auto,e_improve,e_sharpen";
    }

    if (style === "vibrant") {
      transformation = "f_auto,q_auto,e_improve,e_sharpen,e_saturation:50,e_contrast:40";
    }

    if (style === "premium") {
      transformation = "f_auto,q_auto,e_improve,e_sharpen,e_saturation:60,e_contrast:45,e_brightness:10,e_vibrance:40";
    }

    // 🔥 CIELO AUTOMÁTICO (solo si hay cielo)
    if (style === "premium") {
      transformation += ",e_sky_replace";
    }

    const improvedUrl = imageUrl.replace(
      "/upload/",
      `/upload/${transformation}/`
    );

    return res.status(200).json({ improvedUrl });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ error: "Error al mejorar imagen" });
  }
}
