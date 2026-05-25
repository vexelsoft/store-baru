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

        const data = await response.json();

        res.status(200).json(data);

    } catch (e) {

        res.status(500).json({
            status: false,
            message: e.message
        });

    }

}
