# NXT Frame site: overdracht (stand 9 oktober 2026)

Dit bestand is bedoeld om op een andere computer met Claude Code verder te werken. Claude leest het
automatisch (het staat gekoppeld in CLAUDE.md). Wat hieronder staat, zijn afspraken en de stand van
zaken die niet uit de code zelf blijken.

## Starten

1. Open deze map in Claude Code of een terminal.
2. `npm install`
3. `npm run dev`
4. Open http://localhost:3000 (draait er al iets op 3000, dan pakt Next 3001)

Next.js 16 (Turbopack), React 19, Tailwind 4. Lees AGENTS.md: deze Next-versie wijkt af van oudere.

## Werkafspraken met Justin

- **Nooit Chrome openen of besturen** (ook niet de extensie). Controleren via `npx tsc --noEmit`,
  eslint en `curl` naar localhost. Justin kijkt zelf in de browser en stuurt screenshots.
  Headless Firefox via Playwright mag wel (zie tools/).
- Justin is Justin Streur, eigenaar van NXT Frame (nxtframe.ai). Schrijf in het Nederlands, kort en direct.
- Geen AI-cases van zijn werkgever tonen: dat werk is in loondienst gedaan.
- Geen beloftes die niet waargemaakt kunnen worden (geen garantie op plek 1 in Google/ChatGPT).

## Positionering (besloten 9 okt)

Websites die gevonden worden en verkopen, gebouwd door één maker (geen bureau). AI-tools en
koppelingen groeien er in fases bij:
- **Fase 1 (nu):** site gaat over websites. Op de homepage staat alleen een teaser
  "Meer dan een website" (bento met Rekentools, Koppelingen, AI-assistent, Slimme opvolging).
  Nog niets over AI op andere pagina's zetten.
- **Fase 2 (na 2 à 3 AI-projecten):** eigen pagina /slimme-tools (inhoud staat al klaar in
  src/components/smartTools.ts), AI in hero en menu.
- **Fase 3:** AI wordt het hoofdverhaal, websites de instap.
- Eerste echte case richting tools: rekentools (maximale hypotheek e.d.) voor Hypotheekhaven.

## Design-afspraken

- Twee titelniveaus: t-hero (hero en footer-afsluiter) en t-section (elke sectietitel, 32 tot 56 px).
  t-sub alleen voor tussenkopjes op subpagina's. Uitleg bovenin de type scale in globals.css.
- Content binnen Container (max 1440 px). "Ons werk" houdt zich daar ook aan.
- Kaarten in "Wat kost het": buiten wit, midden donkergroen.

## Beelden, video en mockups

- **Raylight** (raylight.app, MCP `claude mcp add --transport http raylight https://api.raylight.app/mcp`,
  daarna `/mcp` om in te loggen) is het programma voor mockups en logo-animaties. Project
  "NXT Frame – Converterend mockup 16:9": Shot 2 = stilstaande MacBook (magenta scherm),
  Shot 3 = geanimeerde MacBook met de checkout-video (de video bij Conversie).
- Werkwijze Raylight-export: export-icoon links van Share, Scope = de shot, Image (PNG) of MP4,
  1080p, 30 fps. Gratis plan zet rechtsonder een "Made in Raylight"-badge: wegsnijden.
  Video's krijgen een achtergrond in exact de sectiekleur (#f7f1e8) en op de site
  `mix-blend-mode: darken` (.cs-video), zodat het crème wegvalt.
- Checkout-film als code: `Film` in src/components/ConvertShowcase.tsx. Opnieuw opnemen als video:
  tools/record-film.cjs (headless Firefox, frame voor frame) en daarna ffmpeg.
- Schermen in foto's/renders worden met een perspectief-matrix gevuld: src/components/quad.ts.
- **Licentie:** `phone-hand.webp` (Feel This Studio) is de voorbeeldafbeelding van een betaalde
  mockup. Kopen voor livegang, of vervangen door een eigen beeld.
- Ongebruikt, mag weg: public/images/macbook-front.webp, laptop-stoel.webp, makelaardij-laptop.webp.

## Placeholders die nog vervangen moeten worden

- Reviews op de homepage zijn **concepten** (Happy Flops, Sabrina van Hypotheekhaven): laten
  goedkeuren door de klanten. Naam van de Happy Flops-eigenaar ontbreekt.
- Cijfers nog niet bevestigd: hero "0,9 s laadtijd" en "100 PageSpeed", Happy Flops "+40% bestellingen",
  Hypotheekhaven "2x meer afspraken", Makelaardij-concept "0,8 s laadtijd".
- Prijzen (src/components/pricing.ts en menuData.ts) zijn indicatief.
- Footer: Privacy, Voorwaarden en social-iconen linken naar `#`.

## Volgende stap: de rest van de site

Homepage is zo goed als af. Pagina's die nu alleen een kop hebben: /diensten, /aanpak, /over,
/contact. Voorgesteld sitemap-plan:

**Fase 1, voor livegang**
- Eigen dienstpagina's: /website-laten-maken (bestaat), /webshop-laten-maken,
  /landingspagina-laten-maken, /website-redesign, /vindbaar-in-google-en-chatgpt.
  /diensten wordt een overzicht.
- /prijzen (wordt veel gezocht: "wat kost een website laten maken").
- /over (Justin als persoon, vertrouwen), /contact met een echt formulier of agenda,
  /aanpak (vijf stappen staan al in de Platform-component).
- Privacy, voorwaarden, sitemap.xml, robots.txt, llms.txt, `lang="nl"` in layout.tsx (staat nu op "en").
- /lab/slide is een testpagina: uit de index houden.

**Fase 2, na livegang**
- Vergelijkingspagina's (NXT Frame vs webbureau / freelancer / AI-sitebuilder); de
  Comparison-component bestaat al.
- Kennisbank met 6 à 10 sterke artikelen op echte vragen.
- /slimme-tools volgens het AI-faseplan, reviews-pagina zodra er echte reviews zijn.

**Niet doen:** stadspagina's zonder echte vestiging, lege blog/tags/auteurs, vacatures/events.

## Openstaande vragen aan Justin

1. Welke diensten wil je echt verkopen: ook webshops, of alleen websites en landingspagina's?
2. Prijzen op een eigen pagina? Kloppen de vanaf-prijzen (€ 1.950 / € 4.500 / € 7.500)?
3. Waar zit je (regio)? Helpt lokaal, als het echt is.
4. Contactformulier of agenda (bijv. Calendly)? Waar moeten aanvragen heen (mail, ActiveCampaign)?
5. Ga je zelf artikelen schrijven, of zet Claude ze op en vul jij aan?
6. Welke cijfers en reviews zijn echt (zie Placeholders)?
7. Wil je de kaarten AI-assistent en Slimme opvolging ook in de glazen 3D-stijl van
   Rekentools en Koppelingen? (prompts voor een glazen chat- en meldingen-widget)

## tools/

- `record-film.cjs`: neemt de checkout-film op als PNG-frames (headless Firefox via
  playwright-core; pad naar playwright-core en de scratch-map aanpassen op een nieuwe computer).
- `macbook-uitsnijden.cjs`: Raylight-frame met magenta scherm uitsnijden, transparant maken.
- `telefoon-scherm-opmeten.cjs`: hoeken van een schuin telefoonscherm opmeten en leegmaken.
De paden in deze scripts wijzen naar de oude computer; pas ze aan voor gebruik. Nodig: Node, ffmpeg,
en sharp (zit al in node_modules van dit project).
