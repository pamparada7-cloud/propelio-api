export default async function handler(req, res) {
  try {
    const { imageUrl, style } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    let transformation = "";

    // 🟢 NATURAL (suave pero visible)
    if (style === "natural") {
      transformation = "f_auto,q_auto,e_improve,e_sharpen:30,e_contrast:10";
    }

    // 🟡 VIBRANTE (sí se nota)
    if (style === "vibrant") {
      transformation = "f_auto,q_auto,e_saturation:25,e_contrast:20,e_brightness:5,e_sharpen:60";
    }

    // 🔵 PRO REAL (equilibrado y nítido)
    if (style === "premium") {
      transformation = "f_auto,q_auto,e_improve,e_sharpen:90,e_contrast:20,e_brightness:8";
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
