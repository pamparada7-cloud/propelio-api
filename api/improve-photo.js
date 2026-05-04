export default async function handler(req, res) {
  try {
    const { imageUrl, style, sky } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    let transformation = "f_auto,q_auto";

    // 🎨 ESTILOS
    if (style === "natural") {
      transformation += ",e_improve,e_sharpen:50";
    } else if (style === "vibrant") {
      transformation += ",e_saturation:120,e_contrast:80,e_brightness:10,e_sharpen:150";
    } else if (style === "premium") {
      transformation += ",e_improve,e_sharpen:120,e_contrast:40,e_saturation:30,e_brightness:5";
    }

    // ☁️ MEJORAR CIELO (seguro)
    if (sky === true) {
  transformation += ",e_sky_replace:blue_sky";
}

    // 🔁 GENERAR URL FINAL (con validación)
    if (!imageUrl.includes("/upload/")) {
      return res.status(400).json({ error: "URL inválida de Cloudinary" });
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
