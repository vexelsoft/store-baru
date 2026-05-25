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

    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(200).json({
        status: false,
        services: [],
        message: "JSON parse error"
      });
    }

    // pastikan array
    if (!Array.isArray(data.services)) {
      return res.status(200).json({
        status: false,
        services: [],
        message: "Services bukan array"
      });
    }

    // 🔥 AMBIL 1 LAYANAN SAJA
    const service = data.services[0];

    return res.status(200).json({
      status: true,
      services: service ? [service] : []
    });

  } catch (e) {

    return res.status(500).json({
      status: false,
      services: [],
      message: e.message
    });

  }

}
