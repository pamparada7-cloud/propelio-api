export default async function handler(req, res) {
  try {
    const { imageUrl, style } = req.body;

    // Validación básica
    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    if (!["natural", "vibrant", "premium"].includes(style)) {
      return res.status(400).json({ error: "Style inválido" });
    }

    let transformation = "";

    // 🟢 NATURAL (suave)
    if (style === "natural") {
      transformation = "f_auto,q_auto,e_improve,e_sharpen:50";
    }

    // 🟠 VIBRANTE (más impacto visual)
    if (style === "vibrant") {
      transformation = "f_auto,q_auto,e_saturation:120,e_contrast:80,e_brightness:10,e_sharpen:150";
    }

    // 🔴 PREMIUM (efecto pro inmobiliario)
    if (style === "premium") {
      transformation = "f_auto,q_auto,e_saturation:150,e_contrast:100,e_brightness:20,e_sharpen:250,e_auto_color,e_auto_brightness";
    }

    // Generar nueva URL con transformación
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
