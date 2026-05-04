export default async function handler(req, res) {
  try {
    const { imageUrl, style } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Falta imageUrl" });
    }

    let baseTransformation = "";
    let skyTransformation = "";

    // 🎨 ESTILOS
    if (style === "natural") {
      baseTransformation = "f_auto,q_auto,e_improve,e_sharpen:40";
    }

    if (style === "vibrant") {
      baseTransformation = "f_auto,q_auto,e_saturation:80,e_contrast:40,e_brightness:10,e_sharpen:100";
    }

    if (style === "premium") {
      baseTransformation = "f_auto,q_auto,e_saturation:60,e_contrast:35,e_brightness:8,e_sharpen:120";

      // 🔍 DETECCIÓN SIMPLE (NO aplicar sky a interiores)
      const isExterior = imageUrl.includes("outdoor") 
        || imageUrl.includes("sky") 
        || imageUrl.includes("house") 
        || imageUrl.includes("building");

      if (isExterior) {
        skyTransformation = "e_sky_replace:blue_sky";
      }
    }

    let improvedUrl;

    // 🚀 PIPELINE
    if (skyTransformation) {
      improvedUrl = imageUrl.replace(
        "/upload/",
        `/upload/${baseTransformation}/${skyTransformation}/`
      );
    } else {
      improvedUrl = imageUrl.replace(
        "/upload/",
        `/upload/${baseTransformation}/`
      );
    }

    return res.status(200).json({ improvedUrl });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ error: "Error al mejorar imagen" });
  }
}
