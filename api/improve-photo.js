export default async function handler(req, res) {
  try {
    const { imageUrl, style } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    let transformation = "";

    // 🧠 DETECCIÓN SIMPLE (mejor que antes)
    const isExterior =
      imageUrl.toLowerCase().includes("out") ||
      imageUrl.toLowerCase().includes("sky") ||
      imageUrl.toLowerCase().includes("house") ||
      imageUrl.toLowerCase().includes("building");

    // 🎨 NATURAL
    if (style === "natural") {
      transformation = "f_auto,q_auto,e_improve,e_sharpen:40";
    }

    // 🎨 VIBRANTE (WOW leve)
    if (style === "vibrant") {
      transformation =
        "f_auto,q_auto,e_saturation:90,e_contrast:50,e_brightness:10,e_sharpen:120";
    }

    // 🔥 PREMIUM (WOW REAL)
    if (style === "premium") {
      if (isExterior) {
        // 🌤️ EXTERIOR (tipo inmobiliaria top)
        transformation =
          "f_auto,q_auto,e_sky_replace:blue_sky,e_saturation:120,e_contrast:60,e_brightness:15,e_sharpen:200";
      } else {
        // 🏡 INTERIOR (tipo Airbnb)
        transformation =
          "f_auto,q_auto,e_improve,e_brightness:25,e_contrast:35,e_saturation:40,e_sharpen:120";
      }
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
