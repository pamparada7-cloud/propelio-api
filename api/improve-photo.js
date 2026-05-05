export default async function handler(req, res) {
  try {
    const { imageUrl, style } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    let transformation = "";

    // 🟢 NATURAL (realista pero mejorado)
    if (style === "natural") {
      transformation =
        "f_auto,q_auto:good," +
        "e_improve," +
        "e_sharpen:60," +
        "e_contrast:15," +
        "e_brightness:3";
    }

    // 🟡 VIBRANTE (más color y definición)
    if (style === "vibrant") {
      transformation =
        "f_auto,q_auto:good," +
        "e_improve," +
        "e_sharpen:90," +
        "e_contrast:25," +
        "e_saturation:20," +
        "e_brightness:4";
    }

    // 🔵 PRO REAL ESTATE (nivel profesional)
    if (style === "premium") {
      transformation =
        "f_auto,q_auto:good," +
        "e_improve," +
        "e_sharpen:120," +
        "e_contrast:30," +
        "e_saturation:10," +
        "e_brightness:4," +
        "e_clarity:20";
    }

    // 🔁 Si no viene estilo, usar NATURAL por defecto
    if (!transformation) {
      transformation =
        "f_auto,q_auto:good,e_improve,e_sharpen:60,e_contrast:15";
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
