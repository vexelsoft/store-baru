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

/* 🔥 AMBIL TEXT DULU (WAJIB DEBUG AMAN) */
const text = await response.text();

console.log("RAW API RESPONSE:", text);

/* CEK KALO BUKAN JSON */
let data;
try {
data = JSON.parse(text);
} catch (e) {
return res.status(200).json({
status: false,
error: "Invalid JSON from provider",
raw: text.slice(0, 500)
});
}

/* RETURN AMAN */
return res.status(200).json(data);

} catch (e) {

return res.status(500).json({
status: false,
error: e.message
});

}

}
