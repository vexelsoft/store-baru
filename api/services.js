const API_URL = "https://fayupedia.id";
const API_ID = "64416";
const API_KEY = "ahnqh6-su5urz-ip5bom-im5cy3-9qc2n4";

// simple in-memory cache (Vercel runtime)
let cache = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 1000; // 60 detik

export default async function handler(req, res) {

  try {

    // 🔥 CACHE CHECK
    const now = Date.now();
    if (cache && (now - cacheTime < CACHE_TTL)) {
      return res.status(200).json(cache);
    }

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
      return res.status(200).json({
        status: false,
        services: [],
        message: "Invalid JSON from provider"
      });
    }

    if (!data || typeof data !== "object") {
      data = { services: [] };
    }

    if (!Array.isArray(data.services)) {
      data.services = [];
    }

    // 🔥 CLEAN DATA
    const clean = data.services
      .filter(s =>
        s &&
        typeof s === "object" &&
        s.id &&
        s.name &&
        s.price
      )
      .map(s => ({
        id: s.id,
        name: s.name,
        category: s.category || "Unknown",
        price: s.price,
        min: s.min,
        max: s.max
      }));

    const result = {
      status: true,
      msg: "OK",
      total: clean.length,
      services: clean
    };

    // 🔥 SAVE CACHE
    cache = result;
    cacheTime = now;

    return res.status(200).json(result);

  } catch (e) {

    return res.status(500).json({
      status: false,
      services: [],
      message: e.message
    });

  }
}
