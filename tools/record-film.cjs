// Records the Happy Flops checkout film (ConvertShowcase) frame by frame in headless Firefox:
// a copy of the film is put on its own, full screen without the browser bar, every CSS
// animation is paused and seeked to each frame time, and each frame is screenshotted.
const { firefox } = require("C:/Users/Gebruiker/Desktop/clipping/node_modules/playwright-core");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "frames");
const W = 460, LOOP_MS = 18000, FPS = 30;
const OUT_W = 1920, OUT_H = 1200;
const DSF = OUT_W / W;

(async () => {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await firefox.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: W, height: Math.ceil(OUT_H / DSF) }, deviceScaleFactor: DSF });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.querySelector("#ons-werk")?.scrollIntoView());
  await page.waitForTimeout(500);

  const ok = await page.evaluate(() => {
    const url = [...document.querySelectorAll(".cs3-url1")][0];
    const film = url?.closest(".rounded-xl");
    if (!film) return false;
    const copy = film.cloneNode(true);
    const stage = document.createElement("div");
    stage.className = "cs2";
    stage.style.setProperty("--T", "18s");
    Object.assign(stage.style, { position: "fixed", inset: "0", zIndex: "2147483647", background: "#fff", overflow: "hidden" });
    Object.assign(copy.style, { position: "absolute", left: "0", top: "-30px", borderRadius: "0", boxShadow: "none", outline: "none" });
    copy.classList.remove("ring-1", "shadow-[0_30px_80px_-24px_rgba(68,2,32,0.5)]", "rounded-xl");
    stage.appendChild(copy);
    document.body.appendChild(stage);
    document.documentElement.style.overflow = "hidden";
    return true;
  });
  if (!ok) throw new Error("film not found on the page");
  await page.waitForTimeout(800); // images in the copy

  const frames = Math.round((LOOP_MS / 1000) * FPS);
  for (let f = 0; f < frames; f++) {
    const t = (f * 1000) / FPS;
    await page.evaluate((t) => {
      const stage = document.querySelector("body > .cs2");
      for (const a of stage.getAnimations({ subtree: true })) { a.pause(); a.currentTime = t; }
    }, t);
    await page.screenshot({ path: path.join(OUT, String(f).padStart(4, "0") + ".png") });
    if (f % 60 === 0) console.log("frame", f, "/", frames);
  }
  await browser.close();
  console.log("done", frames);
})().catch((e) => { console.error(e); process.exit(1); });
