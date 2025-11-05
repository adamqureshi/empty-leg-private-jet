// /api/lead.js — Vercel/Netlify-compatible serverless handler
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok:false, error:'Method not allowed' });
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body) return res.status(400).json({ ok:false, error:'Empty body' });
    if (!body.seats) return res.status(400).json({ ok:false, error:'Missing seats' });
    if (!(body.phone || body.email)) return res.status(400).json({ ok:false, error:'Phone or email required' });

    const lead = {
      ts: new Date().toISOString(),
      origin: (body.origin || '').trim(),
      earliest: body.earliest || null,
      latest: body.latest || null,
      seats: String(body.seats || '').trim(),
      deal_target: body.deal_target || '',
      phone: (body.phone || '').trim(),
      email: (body.email || '').toLowerCase().trim(),
      notes: (body.notes || '').trim(),
      lat: body.lat || null,
      lng: body.lng || null,
      timezone: body.timezone || '',
      ua: body.user_agent || '',
      utm_source: body.utm_source || '',
      utm_medium: body.utm_medium || '',
      utm_campaign: body.utm_campaign || ''
    };

    // Optional Slack notification
    if (process.env.SLACK_WEBHOOK_URL) {
      const text =
        `✈️ *EMILY Lead* — ${lead.seats} seat(s)\n` +
        `• From: ${lead.origin || '(GPS only)'} ${lead.lat ? `(${lead.lat},${lead.lng})` : ''}\n` +
        `• Window: ${lead.earliest || '—'} → ${lead.latest || '—'}\n` +
        `• Deal: ${lead.deal_target || 'Cheapest'}\n` +
        `• Phone: ${lead.phone || '—'} • Email: ${lead.email || '—'}\n` +
        (lead.notes ? `• Notes: ${lead.notes}\n` : '') +
        `• UTM: ${lead.utm_source}/${lead.utm_medium}/${lead.utm_campaign}`;
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text })
      });
    }

    console.log('EMILY lead', lead);
    return res.status(200).json({ ok:true });
  } catch (err) {
    console.error('Lead error', err);
    return res.status(500).json({ ok:false, error:'Server error' });
  }
}
