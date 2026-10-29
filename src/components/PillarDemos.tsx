import type { CSSProperties } from "react";

/**
 * The three little product demos inside the pillar panels. They are plain markup: every bit of
 * movement is a CSS keyframe in globals.css, so nothing here needs to run on the client. Each
 * demo loops, and the loops only run once the panel around it scrolls into view.
 *
 * Everything is drawn, not photographed: no screenshots to keep up to date, and the whole thing
 * recolours with the theme.
 */
const i = (n: number) => ({ "--i": n }) as CSSProperties;

/* ---------- Snelheid: a page painting itself while the score runs up ---------- */
export function SpeedDemo() {
  return (
    <div className="demo demo-speed">
      <div className="demo-bar">
        <span className="demo-dot" />
        <span className="demo-dot" />
        <span className="demo-dot" />
        <span className="demo-url">jouwsite.nl</span>
      </div>
      <div className="demo-body">
        <div className="sp-page">
          <div className="sp-blk sp-nav" style={i(0)} />
          <div className="sp-blk sp-h1" style={i(1)} />
          <div className="sp-blk sp-h2" style={i(2)} />
          <div className="sp-blk sp-img" style={i(3)} />
          <div className="sp-blk sp-col" style={i(4)} />
          <div className="sp-blk sp-col" style={i(5)} />
        </div>
        <div className="sp-side">
          <div className="sp-gauge">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle className="sp-track" cx="60" cy="60" r="52" />
              <circle className="sp-arc" cx="60" cy="60" r="52" />
            </svg>
            <span className="sp-num" aria-hidden="true" />
          </div>
          <p className="sp-label">Prestatiescore</p>
          <ul className="sp-metrics">
            <li style={i(0)}>
              <span>Laadtijd</span>
              <b>0,4 s</b>
            </li>
            <li style={i(1)}>
              <span>Reactietijd</span>
              <b>12 ms</b>
            </li>
            <li style={i(2)}>
              <span>Verschuiving</span>
              <b>0,00</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- Vindbaar: a query types itself, the results and the AI answer follow ---------- */
export function SearchDemo() {
  return (
    <div className="demo demo-search">
      <div className="se-panel">
        <div className="se-field">
          <svg viewBox="0 0 24 24" className="se-glass" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m16.5 16.5 4 4" strokeLinecap="round" />
          </svg>
          <span className="se-query">makelaar in Assen</span>
          <i className="se-caret" aria-hidden="true" />
        </div>
        <ul className="se-results">
          <li className="se-hit" style={i(0)}>
            <span className="se-rank">1</span>
            <div className="se-lines">
              <b>Jouw bedrijf, makelaar in Assen</b>
              <span className="se-url">jouwsite.nl</span>
              <em className="se-snip" />
              <em className="se-snip se-snip-short" />
            </div>
          </li>
          <li style={i(1)}>
            <span className="se-rank">2</span>
            <div className="se-lines">
              <em className="se-snip se-snip-title" />
              <em className="se-snip" />
            </div>
          </li>
          <li style={i(2)}>
            <span className="se-rank">3</span>
            <div className="se-lines">
              <em className="se-snip se-snip-title" />
              <em className="se-snip" />
            </div>
          </li>
        </ul>
      </div>
      <div className="se-ai">
        <p className="se-ai-head">
          <svg viewBox="0 0 24 24" className="se-spark" fill="currentColor" aria-hidden="true">
            <path d="M12 2l1.8 5.6L19.5 9l-4.6 3.3L16.4 18 12 14.8 7.6 18l1.5-5.7L4.5 9l5.7-1.4z" />
          </svg>
          Antwoord van de AI
        </p>
        <p className="se-ai-text">
          <span>Voor een woning in Assen kun je terecht bij</span> <b>Jouw bedrijf</b>
          <span>, gespecialiseerd in verkoop en taxatie in de regio.</span>
        </p>
        <p className="se-cite">Bron: jouwsite.nl</p>
      </div>
    </div>
  );
}

/* ---------- Design: a wireframe that turns into a designed page ---------- */
export function DesignDemo() {
  return (
    <div className="demo demo-design">
      <div className="de-canvas">
        <div className="de-block de-nav" style={i(0)} />
        <div className="de-block de-hero" style={i(1)}>
          <span className="de-line de-line-xl" />
          <span className="de-line de-line-lg" />
          <span className="de-cta" />
        </div>
        <div className="de-block de-img" style={i(2)} />
        <div className="de-block de-col" style={i(3)} />
        <div className="de-block de-col" style={i(4)} />
        <span className="de-cursor" aria-hidden="true" />
      </div>
      <div className="de-side">
        <p className="de-side-head">Merkstijl</p>
        <ul className="de-swatches">
          <li style={i(0)} />
          <li style={i(1)} />
          <li style={i(2)} />
          <li style={i(3)} />
        </ul>
        <div className="de-type">
          <span className="de-type-lg">Aa</span>
          <span className="de-type-sm">
            Display 64
            <br />
            Tekst 16
          </span>
        </div>
        <ul className="de-checks">
          <li style={i(0)}>Eén doel per pagina</li>
          <li style={i(1)}>Rust in het raster</li>
          <li style={i(2)}>Knop waar de vraag valt</li>
        </ul>
      </div>
    </div>
  );
}
