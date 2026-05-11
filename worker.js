// ============================================================
//  Snake Racing – Cloudflare Worker Cutover
//  Before CUTOVER_DATE: proxies to origin (current site)
//  On/after CUTOVER_DATE: serves goodbye landing page
// ============================================================

// 1 June 2026 00:00 AEST = 31 May 2026 14:00 UTC
const CUTOVER_DATE = new Date('2026-05-31T14:00:00Z');

// Inline goodbye page HTML (self-contained, no external dependencies)
const GOODBYE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Snake Racing – Thank You</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; background: #000; }
    .hero {
      position: relative;
      width: 100%;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .hero img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
    }
  </style>
</head>
<body>
  <div class="hero">
    <img src="https://rough-paper-384a.pages.dev/bg.png"
         alt="Thank you for your support after 40 years – the time has come to say goodbye. Email: sales@snakeracing.com.au">
  </div>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    const now = new Date();

    // --- AFTER CUTOVER: serve goodbye page ---
    if (now >= CUTOVER_DATE) {
      return new Response(GOODBYE_HTML, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    // --- BEFORE CUTOVER: pass through to origin ---
    try {
      const response = await fetch(request);
      return response;
    } catch (err) {
      return new Response('Service temporarily unavailable.', { status: 503 });
    }
  },
};
