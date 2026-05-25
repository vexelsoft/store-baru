export default async function handler(req, res) {

  const DOMAIN_SUNTIK = 'https://fayupedia.id';
  const API_ID = '64416';
  const API_KEY = 'ahnqh6-su5urz-ip5bom-im5cy3-9qc2n4';

  try {

    const {
      service,
      target,
      quantity
    } = req.body;

    const response = await fetch(`${DOMAIN_SUNTIK}/api/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        api_id: API_ID,
        api_key: API_KEY,
        service,
        target,
        quantity
      })
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (e) {

    res.status(500).json({
      success: false,
      message: e.message
    });

  }

}
