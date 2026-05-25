export default async function handler(req, res) {

    try {

        const {
            service,
            target,
            quantity
        } = req.body;

        const response = await fetch("https://fayupedia.id/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                api_id: "64416",
                api_key: "ahnqh6-su5urz-ip5bom-im5cy3-9qc2n4",
                service,
                target,
                quantity
            })
        });

        const data = await response.json();

        res.status(200).json(data);

    } catch (err) {

        res.status(500).json({
            status: false,
            message: err.message
        });

    }

}
