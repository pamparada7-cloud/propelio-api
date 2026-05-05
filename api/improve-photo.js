export default async function handler(req, res) {
  try {
    const { imageUrl, style } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    let transformation = "";

    // 🟢 NATURAL (realista con vida)
    if (style === "natural") {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve",
        "e_sharpen:100",
        "e_unsharp_mask:200:1.5:0.5:0",
        "e_contrast:18",
        "e_brightness:4",
        "e_vibrance:15"
      ].join(",");
    }

    // 🟡 VIBRANTE (más impacto visual)
    if (style === "vibrant") {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve",
        "e_sharpen:130",
        "e_unsharp_mask:200:2:0.5:0",
        "e_contrast:28",
        "e_saturation:25",
        "e_brightness:5",
        "e_vibrance:25"
      ].join(",");
    }

    // 🔵 PRO REAL ESTATE - HD Edition
    if (style === "premium") {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve",
        "e_sharpen:160",
        "e_unsharp_mask:200:2.5:0.5:0",
        "e_contrast:35",
        "e_saturation:15",
        "e_brightness:8",
        "e_vibrance:30",
        "e_auto_color",
        "e_gamma:-10"
      ].join(",");
    }

    // 🔁 Fallback si no viene estilo
    if (!transformation) {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve",
        "e_sharpen:100",
        "e_unsharp_mask:200:1.5:0.5:0",
        "e_contrast:20",
        "e_vibrance:15"
      ].join(",");
    }

    // ✅ Validar URL de Cloudinary
    if (!imageUrl.includes("/upload/")) {
      return res.status(400).json({ error: "URL de Cloudinary inválida" });
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
