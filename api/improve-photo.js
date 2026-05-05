export default async function handler(req, res) {
  try {
    const { imageUrl, style } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    let transformation = "";

    // 🟢 NATURAL (realista limpio)
    if (style === "natural") {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve:50",
        "e_sharpen:70",
        "e_contrast:15",
        "e_brightness:3",
        "e_vibrance:12"
      ].join(",");
    }

    // 🟡 VIBRANTE (más atractivo sin exagerar)
    if (style === "vibrant") {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve:60",
        "e_sharpen:90",
        "e_contrast:25",
        "e_saturation:20",
        "e_brightness:5",
        "e_vibrance:22"
      ].join(",");
    }

    // 🔵 PRO REAL ESTATE (balanceado y vendible)
    if (style === "premium") {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve:70",
        "e_sharpen:120",
        "e_contrast:30",
        "e_saturation:12",
        "e_brightness:6",
        "e_vibrance:28",
        "e_auto_color"
      ].join(",");
    }

    // fallback
    if (!transformation) {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve:50",
        "e_sharpen:70",
        "e_contrast:15",
        "e_vibrance:12"
      ].join(",");
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
    console.error("ERROR:", error);
    return res.status(500).json({ error: "Error al mejorar imagen" });
  }
}
