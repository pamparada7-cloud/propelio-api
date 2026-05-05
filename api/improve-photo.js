export default async function handler(req, res) {
  try {
    const { imageUrl, style } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    let transformation = "";

    // 🟢 NATURAL
    if (style === "natural") {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve",
        "e_sharpen:80",
        "e_contrast:18",
        "e_brightness:4",
        "e_vibrance:15"
      ].join(",");
    }

    // 🟡 VIBRANTE
    if (style === "vibrant") {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve",
        "e_sharpen:110",
        "e_contrast:28",
        "e_saturation:25",
        "e_brightness:5",
        "e_vibrance:25"
      ].join(",");
    }

    // 🔵 PRO REAL ESTATE (el importante)
    if (style === "premium") {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve",
        "e_sharpen:140",
        "e_contrast:35",
        "e_saturation:15",
        "e_brightness:8",
        "e_vibrance:30",
        "e_auto_color"
      ].join(",");
    }

    // fallback
    if (!transformation) {
      transformation = "f_auto,q_auto:best,e_improve,e_sharpen:80,e_contrast:20";
    }

    if (!imageUrl.includes("/upload/")) {
      return res.status(400).json({ error: "URL de Cloudinary inválida" });
    }

    const improvedUrl = imageUrl.replace(
      "/upload/",
      `/upload/${transformation}/`
    );

    return res.status(200).json({ improvedUrl });

  } catch (error) {
    console.error("ERROR BASE:", error);
    return res.status(500).json({ error: "Error en mejora base" });
  }
}
