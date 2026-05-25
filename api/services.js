const API_URL = "https://fayupedia.id";
const API_ID = "64416";
const API_KEY = "ahnqh6-su5urz-ip5bom-im5cy3-9qc2n4";

export default async function handler(req, res) {

  try {

    const response = await fetch(API_URL + "/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      body: new URLSearchParams({
        api_id: API_ID,
        api_key: API_KEY
      })
    });

    const text = await response.text();

    // 🔥 DETECT HTML / NON JSON
    if (!text.trim().startsWith("{")) {
      return res.status(200).json({
        status: false,
        message: "Invalid response format (not JSON)",
        services: []
      });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(200).json({
        status: false,
        message: "JSON parse error",
        services: []
      });
    }

    // 🔥 HARD GUARD (INI YANG PENTING)
    let services = [];

    if (Array.isArray(data.services)) {
      services = data.services;
    }

    // kalau ternyata string → paksa kosong
    if (typeof data.services === "string") {
      services = [];
    }

    // kalau object aneh → reset
    if (!Array.isArray(services)) {
      services = [];
    }

    // 🔥 CLEAN + VALIDATE STRICT
    services = services
      .filter(s =>
        s &&
        typeof s === "object" &&
        typeof s.id !== "undefined" &&
        typeof s.name === "string"
      )
      .map(s => ({
        id: s.id,
        name: s.name,
        category: s.category || "Unknown",
        price: Number(s.price || 0)
      }));

    return res.status(200).json({
      status: true,
      total: services.length,
      services
    });

  } catch (e) {

    return res.status(500).json({
      status: false,
      message: e.message,
      services: []
    });

  }
}
