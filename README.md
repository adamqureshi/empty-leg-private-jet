# EMILY™ — Empty‑Leg Alerts (Standalone)

A dead-simple, mobile‑first landing page that captures empty‑leg alert leads and posts them to a serverless endpoint.

## Files
- `index.html` — the EMILY form (grayscale, conversion‑focused).
- `api/lead.js` — Vercel/Netlify serverless function that accepts JSON and (optionally) posts to Slack.
- `README.md` — these instructions.

## One‑click deploy (Vercel)
1. Push this folder to a GitHub repo (e.g., `flyswifttail-emily-standalone`).
2. Import to **Vercel** → Framework preset: *Other*. Vercel will serve `index.html` and map `/api/lead`.
3. In **Vercel → Settings → Environment Variables**, add (optional):
   - `SLACK_WEBHOOK_URL = https://hooks.slack.com/services/XXX/YYY/ZZZ`
4. Visit your deployment URL and test the form.

## Netlify
- Keep `index.html` at repo root.
- Move `api/lead.js` to `netlify/functions/lead.js` or set a redirect from `/api/lead` to your function path.
- Enable form submission via JS `fetch` as in `index.html`.

## Static‑only fallback (no functions)
If you’re hosting purely static (no serverless), swap the `<form action>` to a form backend like Formspree or Basin and remove the JS `fetch`. (Not recommended for production.)

## Data captured
- Origin (plus optional GPS), date window, seats, deal target
- Phone/email, notes, timezone, user agent
- UTM source/medium/campaign

## Privacy/Compliance
- SMS consent checkbox included (reply STOP).
- Honeypot input to deter bots.

---
© Fly Swift Tail — EMILY™ Empty‑Leg Alerts
