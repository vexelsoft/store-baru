export default async function handler(req, res) {

  try {

    const response = await fetch("https://fayupedia.id/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        api_id: "64416",
        api_key: "ahnqh6-su5urz-ip5bom-im5cy3-9qc2n4"
      })
    });

    const text = await response.text();

    console.log("RAW RESPONSE:");
    console.log(text);

    return res.status(200).json({
      ok: true,
      type: typeof text,
      length: text?.length,
      preview: text?.slice(0, 500)
    });

  } catch (e) {

    return res.status(500).json({
      ok: false,
      error: e.message
    });

  }

}
