// ============================================================
//  Snake Racing – Farewell Landing Page
// ============================================================

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
      object-fit: contain;
      object-position: center center;
      display: block;
    }
  </style>
</head>
<body>
  <div class="hero">
    <img src="/bg.png"
         alt="Thank you for your support after 40 years – the time has come to say goodbye. Email: sales@snakeracing.com.au">
  </div>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/bg.png") {
      return env.ASSETS.fetch(request);
    }

    return new Response(GOODBYE_HTML, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  },
};
