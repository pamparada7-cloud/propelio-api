export default async function handler(req, res) {
  try {
    const { imageUrl, style } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    let transformation = "";

    // 🟢 NATURAL - Realista mejorado
    if (style === "natural") {
      transformation = [
        "f_auto",
        "q_auto:best",        // ← q_auto:good → best
        "e_improve:50",       // ← improve con intensidad explícita
        "e_sharpen:80",       // ← era 60
        "e_contrast:20",      // ← era 15
        "e_brightness:5",     // ← era 3
        "e_vibrance:15",      // ← NUEVO: más vida sin sobresaturar
      ].join(",");
    }

    // 🟡 VIBRANTE - Más color y definición
    if (style === "vibrant") {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve:70",
        "e_sharpen:100",      // ← era 90
        "e_contrast:30",      // ← era 25
        "e_saturation:35",    // ← era 20, aquí está el color brillante
        "e_brightness:6",     // ← era 4
        "e_vibrance:25",      // ← NUEVO
      ].join(",");
    }

    // 🔵 PRO REAL ESTATE - Nivel editorial
    if (style === "premium") {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve:80",
        "e_sharpen:150",      // ← era 120
        "e_contrast:35",      // ← era 30
        "e_saturation:20",
        "e_brightness:8",     // ← era 4, más luz = más amplitud
        "e_vibrance:30",      // ← reemplaza e_clarity que NO existe
        "e_auto_color",       // ← NUEVO: balance de color automático
      ].join(",");
    }

    // 🔁 Default si no viene estilo
    if (!transformation) {
      transformation = [
        "f_auto",
        "q_auto:best",
        "e_improve:50",
        "e_sharpen:80",
        "e_contrast:20",
        "e_vibrance:15",
      ].join(",");
    }

    // ✅ Validar que la URL tenga /upload/ antes de reemplazar
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
