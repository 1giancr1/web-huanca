// Función Serverless en Vercel: /api/ruc?numero=20114915026
module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const numero = String(req.query.numero || "").trim();
  if (!/^\d{11}$/.test(numero)) {
    return res.status(400).json({ ok: false, message: "El RUC debe tener 11 dígitos." });
  }

  const token = process.env.SUNAT_TOKEN || "";

  // 1. Si configuraste SUNAT_TOKEN en Vercel (apis.net.pe v2)
  if (token) {
    try {
      const r2 = await fetch(`https://api.apis.net.pe/v2/sunat/ruc?numero=${numero}`, {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (r2.ok) {
        const d = await r2.json();
        const nombre = d.razonSocial || d.nombre || "";
        if (nombre) {
          return res.status(200).json({
            ok: true,
            ruc: numero,
            razonSocial: nombre.trim(),
            estado: d.estado || "",
            condicion: d.condicion || ""
          });
        }
      }
    } catch (e) {}

    // Respaldo con token para apiperu.dev
    try {
      const rPeru = await fetch("https://apiperu.dev/api/ruc", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ ruc: numero })
      });
      if (rPeru.ok) {
        const j = await rPeru.json();
        const nombre = j?.data?.nombre_o_razon_social || "";
        if (nombre) {
          return res.status(200).json({
            ok: true,
            ruc: numero,
            razonSocial: nombre.trim(),
            estado: j?.data?.estado || "",
            condicion: j?.data?.condicion || ""
          });
        }
      }
    } catch (e) {}
  }

  // 2. Consulta pública sin token (apis.net.pe v1)
  try {
    const r1 = await fetch(`https://api.apis.net.pe/v1/ruc?numero=${numero}`, {
      headers: { "Accept": "application/json" }
    });
    if (r1.ok) {
      const d = await r1.json();
      const nombre = d.nombre || d.razonSocial || "";
      if (nombre) {
        return res.status(200).json({
          ok: true,
          ruc: numero,
          razonSocial: nombre.trim(),
          estado: d.estado || "",
          condicion: d.condicion || ""
        });
      }
    }
  } catch (e) {}

  return res.status(200).json({
    ok: false,
    message: "No se pudo obtener automáticamente. Escribe la Razón Social manualmente."
  });
};
