const sharp = require('sharp');
const SRC = 'C:/Users/Gebruiker/Downloads/a6e391435a40c564b80cd5eec6706de9.jpg';
(async () => {
  const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, C = info.channels;
  const lum = (x, y) => { const i = (y * W + x) * C; return (data[i] + data[i + 1] + data[i + 2]) / 3; };
  // flood fill over light pixels from inside the screen; the black bezel encloses it
  const seen = new Uint8Array(W * H); const stack = [[380, 380]]; const pts = [];
  while (stack.length) {
    const [x, y] = stack.pop(); if (x < 0 || y < 0 || x >= W || y >= H) continue;
    const k = y * W + x; if (seen[k]) continue; seen[k] = 1;
    if (lum(x, y) < 120) continue; // bezel or text: stop (text is enclosed, fill goes round it)
    pts.push([x, y]); stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }
  console.log('filled', pts.length, 'touches edge?', pts.some(([x, y]) => x === 0 || y === 0 || x === W - 1 || y === H - 1));
  const ext = (f) => pts.reduce((b, p) => (f(p) > f(b) ? p : b));
  console.log(JSON.stringify({ tl: ext(([x, y]) => -x - y), tr: ext(([x, y]) => x - y), br: ext(([x, y]) => x + y), bl: ext(([x, y]) => -x + y) }));
})();
// pass 2: blank the screen (flooded light pixels plus everything inside a slightly shrunken quad,
// so the old text goes too) and save the base image; print the background colour at the edges
(async () => {
  const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, C = info.channels;
  const lum = (x, y) => { const i = (y * W + x) * C; return (data[i] + data[i + 1] + data[i + 2]) / 3; };
  const seen = new Uint8Array(W * H); const stack = [[380, 380]]; const fill = new Uint8Array(W * H);
  while (stack.length) {
    const [x, y] = stack.pop(); if (x < 0 || y < 0 || x >= W || y >= H) continue;
    const k = y * W + x; if (seen[k]) continue; seen[k] = 1;
    if (lum(x, y) < 120) continue; fill[k] = 1; stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }
  const q = [[326, 183], [522, 182], [431, 638], [230, 625]];
  const cx = q.reduce((s, p) => s + p[0], 0) / 4, cy = q.reduce((s, p) => s + p[1], 0) / 4;
  const shrunk = q.map(([x, y]) => [cx + (x - cx) * 0.94, cy + (y - cy) * 0.97]);
  const inside = (x, y, poly) => { let c = false; for (let i = 0, j = 3; i < 4; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
  // close small gaps: a pixel with screen on both sides (horizontally or vertically) within 16px is
  // text on the screen, not bezel (the bezel has screen on one side only)
  const R = 16; const fill2 = new Uint8Array(fill);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const k = y * W + x; if (fill[k]) continue;
    let l = 0, r = 0, u = 0, d = 0;
    for (let t = 1; t <= R; t++) { if (!l && x - t >= 0 && fill[k - t]) l = 1; if (!r && x + t < W && fill[k + t]) r = 1; if (!u && y - t >= 0 && fill[k - t * W]) u = 1; if (!d && y + t < H && fill[k + t * W]) d = 1; }
    if ((l && r) || (u && d)) fill2[k] = 1;
  }
  fill.set(fill2);
  const out = Buffer.from(data);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const k = y * W + x; if (fill[k] || inside(x, y, shrunk)) { const i = k * C; out[i] = 244; out[i + 1] = 246; out[i + 2] = 239; }
  }
  await sharp(out, { raw: { width: W, height: H, channels: C } }).webp({ quality: 88 }).toFile('public/images/phone-hand.webp');
  const px = (x, y) => { const i = (y * W + x) * C; return [data[i], data[i + 1], data[i + 2]].join(','); };
  console.log('bg', px(10, 10), px(W - 10, 10), px(W - 10, H / 2 | 0), px(W - 10, H - 10), px(10, 300), px(370, 40));
})();
