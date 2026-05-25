const API_URL = "https://fayupedia.id";
const API_ID = "64416";
const API_KEY = "ahnqh6-su5urz-ip5bom-im5cy3-9qc2n4";

export default async function handler(req, res) {

  try {

    const response = await fetch(API_URL + "/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        api_id: API_ID,
        api_key: API_KEY
      })
    });

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      console.log("❌ JSON PARSE ERROR:", text);

      return res.status(200).json({
        status: false,
        error: true,
        message: "Invalid JSON from provider",
        services: []
      });
    }

    // 🔥 NORMALISASI WAJIB
    if (!data || typeof data !== "object") {
      return res.status(200).json({
        status: false,
        services: []
      });
    }

    // 🔥 pastikan services selalu array
    if (!Array.isArray(data.services)) {
      data.services = [];
    }

    // 🔥 bersihkan data rusak
    data.services = data.services.filter(s =>
      s &&
      typeof s === "object" &&
      s.id &&
      s.name &&
      s.price
    );

    // optional: limit biar tidak berat
    // data.services = data.services.slice(0, 1000);

    return res.status(200).json({
      status: true,
      msg: "OK",
      services: data.services
    });

  } catch (e) {

    return res.status(500).json({
      status: false,
      error: true,
      message: e.message,
      services: []
    });

  }
}
