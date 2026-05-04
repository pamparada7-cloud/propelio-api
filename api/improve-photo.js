export default async function handler(req, res) {
  try {
    const { imageUrl, style } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    let transformation = "";

    // 🟢 NATURAL (suave y realista)
    if (style === "natural") {
      transformation = "f_auto,q_auto,e_improve,e_sharpen:50";
    }

    // 🟡 VIBRANTE (más color pero controlado)
    if (style === "vibrant") {
      transformation = "f_auto,q_auto,e_saturation:40,e_contrast:30,e_brightness:5,e_sharpen:80";
    }

    // 🔥 PRO REAL (ESTE ES EL IMPORTANTE)
    if (style === "premium") {
      transformation = "f_auto,q_auto,e_improve,e_sharpen:120,e_contrast:25,e_brightness:10,e_color_balance:20";
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
