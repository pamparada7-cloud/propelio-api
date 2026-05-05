module.exports = async function handler(req, res) {

  // ✅ CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { imageUrl, style } = req.body || {};

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    if (!imageUrl.includes("/upload/")) {
      return res.status(400).json({ error: "URL inválida de Cloudinary" });
    }

    let transformation = "";

    // 🟢 NATURAL (realista)
    if (style === "natural") {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve",
        "e_sharpen:80",
        "e_contrast:15",
        "e_brightness:3",
        "e_vibrance:10"
      ].join(",");
    }

    // 🟡 VIBRANTE
    if (style === "vibrant") {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve",
        "e_sharpen:100",
        "e_contrast:25",
        "e_saturation:20",
        "e_brightness:4",
        "e_vibrance:20"
      ].join(",");
    }

    // 🔵 PRO REAL ESTATE (el bueno)
    if (style === "premium") {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve",
        "e_sharpen:120",
        "e_contrast:30",
        "e_saturation:15",
        "e_brightness:6",
        "e_vibrance:25"
      ].join(",");
    }

    // 🔁 fallback
    if (!transformation) {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve",
        "e_sharpen:80",
        "e_contrast:20",
        "e_vibrance:15"
      ].join(",");
    }

    const improvedUrl = imageUrl.replace(
      "/upload/",
      `/upload/${transformation}/`
    );

    return res.status(200).json({
      imageUrl: improvedUrl
    });

  } catch (error) {
    console.error("ERROR IMPROVE:", error);
    return res.status(500).json({
      error: "Error en improve-photo",
      detail: error.message
    });
  }
};
