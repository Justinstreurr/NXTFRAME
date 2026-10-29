const sharp = require('sharp');
const SRC = 'C:/Users/Gebruiker/Downloads/nxt-frame-converterend-mockup-16-9-frame-13.90s.png';
const CROP = { left: 270, top: 110, width: 1380, height: 900 };
const BG = [235, 227, 214];
const FG = [24, 24, 26]; // the laptop's edge colour, for unmixing anti-aliased edge pixels
(async () => {
  const { data, info } = await sharp(SRC).extract(CROP).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  const px = (x, y) => { const i = (y * W + x) * 3; const p = [data[i], data[i + 1], data[i + 2]];
    if (x + CROP.left >= 1636 && y + CROP.top >= 988) return BG.slice(); // the Raylight badge
    return p; };
  const diff = (p) => Math.max(...p.map((v, k) => Math.abs(v - BG[k])));
  // background = everything reachable from the corners through near-background pixels
  const bg = new Uint8Array(W * H); const stack = [[0, 0], [W - 1, 0], [0, H - 1], [W - 1, H - 1]];
  while (stack.length) { const [x, y] = stack.pop(); if (x < 0 || y < 0 || x >= W || y >= H) continue; const k = y * W + x; if (bg[k]) continue;
    if (diff(px(x, y)) > 90) continue; bg[k] = 1; stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]); }
  const out = Buffer.alloc(W * H * 4);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const k = y * W + x, o = k * 4; let p = px(x, y);
    // the magenta screen and its anti-aliased rim turn near-black, so a seam reads as bezel
    if (p[0] > 120 && p[2] > 120 && p[1] < p[0] - 60 && p[1] < p[2] - 60) p = [17, 17, 17];
    if (!bg[k]) { out[o] = p[0]; out[o + 1] = p[1]; out[o + 2] = p[2]; out[o + 3] = 255; continue; }
    // edge or background: coverage of the dark laptop colour over the sand
    const lum = (q) => 0.3 * q[0] + 0.59 * q[1] + 0.11 * q[2];
    const a = Math.max(0, Math.min(1, (lum(BG) - lum(p)) / (lum(BG) - lum(FG))));
    if (a < 0.03) continue;
    for (let c = 0; c < 3; c++) out[o + c] = Math.max(0, Math.min(255, Math.round((p[c] - BG[c] * (1 - a)) / a)));
    out[o + 3] = Math.round(a * 255);
  }
  await sharp(out, { raw: { width: W, height: H, channels: 4 } }).webp({ quality: 90, alphaQuality: 100 }).toFile('public/images/macbook-front.webp')
    .then((i) => console.log('macbook', i.width, i.height, i.size));
})();
