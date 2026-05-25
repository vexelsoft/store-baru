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

    try {

      const data = JSON.parse(text);

      return res.status(200).json(data);

    } catch {

      return res.status(200).json({
        error: true,
        raw: text
      });

    }

  } catch (e) {

    return res.status(500).json({
      error: true,
      message: e.message
    });

  }

}
