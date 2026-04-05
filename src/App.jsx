// FinkHub | Session 5 | Build 7 | 2026-04-01 11:00 ET | Bouncing head, italic larger quotes

import { useState, useEffect } from "react";
import { QUOTES } from "./quotes";

const styleEl = document.createElement("style");
styleEl.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #111827; }
  button, a { font-family: 'DM Sans', sans-serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #1f2937; }
  ::-webkit-scrollbar-thumb { background: #374151; border-radius: 2px; }
  .app-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative;
  }
  .app-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.4) !important;
  }
  .launch-btn {
    transition: filter 0.15s ease, transform 0.1s ease;
    display: block; width: 100%; padding: 13px 0;
    border: none; border-radius: 8px; font-size: 15px;
    font-weight: 700; text-align: center; text-decoration: none;
    cursor: pointer; min-height: 48px; line-height: 22px;
    font-family: 'DM Sans', sans-serif; color: #fff;
  }
  .launch-btn:hover { filter: brightness(1.15); transform: translateY(-1px); }
  .launch-btn:active { transform: translateY(0px); }
  .tooltip {
    position: absolute; bottom: calc(100% + 10px); left: 50%;
    transform: translateX(-50%);
    background: #0f1724; border: 1px solid #2d3748;
    border-radius: 8px; padding: 10px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; color: #9ca3af; line-height: 1.6;
    width: 240px; text-align: center;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    pointer-events: none; z-index: 10;
    opacity: 0; transition: opacity 0.18s ease;
  }
  .tooltip::after {
    content: '';
    position: absolute; top: 100%; left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #2d3748;
  }
  .app-card:hover .tooltip { opacity: 1; }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
  .fink-head-bounce { animation: float 3s ease-in-out infinite; }
  @media (max-width: 640px) {
    .tooltip { width: 200px; font-size: 11px; }
  }
`;
document.head.appendChild(styleEl);

const BG      = "#111827";
const SURFACE = "#1f2937";
const BORDER  = "#2d3748";
const HEAD    = "#f1f5f9";
const MUTED   = "#9ca3af";
const DIM     = "#6b7280";
const GREEN   = "#4CAF50";
const TEAL    = "#00BCD4";
const SANS    = "'DM Sans', sans-serif";
const MONO    = "'IBM Plex Mono', monospace";

const FINKWATCH_URL  = "https://finkwatch.netlify.app/";
const FINKLEDGER_URL = "https://finkledger.netlify.app/";

// ── Login Placeholder ─────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  return (
    <div style={{
      minHeight: "100vh", background: BG,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: SANS, color: HEAD, padding: 24,
    }}>
      <div style={{
        background: SURFACE, border: "1px solid " + BORDER,
        borderRadius: 16, padding: "40px 32px",
        textAlign: "center", maxWidth: 360, width: "100%",
      }}>
        <img src="/fink-head.png" alt=""
          style={{ width: 72, height: 72, borderRadius: "50%", marginBottom: 20,
                   objectFit: "cover", objectPosition: "center top" }} />
        <div style={{ fontFamily: MONO, fontSize: 22, color: TEAL, marginBottom: 8 }}>FinkHub</div>
        <div style={{ color: DIM, fontSize: 14, marginBottom: 28 }}>Login coming soon</div>
        <button onClick={onLogin} style={{
          padding: "12px 32px", background: TEAL, color: "#fff",
          border: "none", borderRadius: 8, fontSize: 15,
          fontWeight: 700, cursor: "pointer", fontFamily: SANS, minHeight: 44,
        }}>
          Continue
        </button>
      </div>
    </div>
  );
}

// ── Hub Screen ────────────────────────────────────────────────────────────────

function HubScreen() {
  const [quoteIdx, setQuoteIdx]         = useState(function() { return Math.floor(Math.random() * QUOTES.length); });
  const [quoteVisible, setQuoteVisible] = useState(true);

  useEffect(function() {
    const iv = setInterval(function() {
      setQuoteVisible(false);
      setTimeout(function() {
        setQuoteIdx(function(i) { return (i + 1) % QUOTES.length; });
        setQuoteVisible(true);
      }, 400);
    }, 30000);
    return function() { clearInterval(iv); };
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: BG, color: HEAD,
      fontFamily: SANS, padding: "0 20px 40px",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>

      {/* ── Hero: Head ── */}
      <div style={{ paddingTop: 72, display: "flex", flexDirection: "column", alignItems: "center" }}>

        <div className="fink-head-bounce" style={{ position: "relative", marginBottom: 24 }}>
          <div style={{
            position: "absolute", inset: -10, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,188,212,0.2) 0%, transparent 70%)",
            filter: "blur(10px)",
          }} />
          <img
            src="/fink-head.png"
            alt="Jim Fink"
            style={{
              width: 160, height: 160, borderRadius: "50%",
              objectFit: "cover", objectPosition: "center top",
              position: "relative",
              boxShadow: "0 0 40px rgba(0,188,212,0.18), 0 8px 32px rgba(0,0,0,0.45)",
            }}
          />
        </div>

        {/* Title + BETA */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <h1 style={{
            fontFamily: SANS, fontSize: "clamp(28px, 5vw, 38px)",
            fontWeight: 700, color: HEAD, letterSpacing: -1,
          }}>
            FinkHub
          </h1>
          <span style={{
            fontSize: 10, color: DIM,
            background: "#ffffff0d", border: "1px solid " + BORDER,
            padding: "3px 8px", borderRadius: 10, letterSpacing: 0.8,
            fontFamily: MONO, marginTop: 4,
          }}>
            BETA
          </span>
        </div>

        {/* Rotating quote */}
        <div style={{
          minHeight: 52, display: "flex", alignItems: "center",
          justifyContent: "center", maxWidth: 500,
          marginBottom: 52, padding: "0 8px",
        }}>
          <p style={{
            fontFamily: SANS, fontSize: 18, color: MUTED,
            fontStyle: "italic",
            lineHeight: 1.7, textAlign: "center",
            opacity: quoteVisible ? 1 : 0,
            transform: quoteVisible ? "translateY(0)" : "translateY(4px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}>
            {QUOTES[quoteIdx]}
          </p>
        </div>
      </div>

      {/* ── App Cards ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 20, width: "100%", maxWidth: 700, marginBottom: 52,
      }}>

        {/* FinkWatch */}
        <div className="app-card" style={{
          background: SURFACE, borderRadius: 12,
          border: "1px solid " + BORDER, borderLeft: "3px solid " + GREEN,
          padding: "24px 24px 20px",
          display: "flex", flexDirection: "column", gap: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        }}>
          <div className="tooltip">
            Real-time position monitor with risk alerts, status badges, and Fidelity import. Updates weekly.
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: HEAD, marginBottom: 4 }}>FinkWatch</div>
            <div style={{ fontSize: 13.5, color: MUTED }}>Monitor your open positions</div>
          </div>
          <a href={FINKWATCH_URL} target="_blank" rel="noopener noreferrer"
            className="launch-btn" style={{ background: GREEN, marginTop: 4 }}>
            Launch &rarr;
          </a>
        </div>

        {/* FinkLedger */}
        <div className="app-card" style={{
          background: SURFACE, borderRadius: 12,
          border: "1px solid " + BORDER, borderLeft: "3px solid " + TEAL,
          padding: "24px 24px 20px",
          display: "flex", flexDirection: "column", gap: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        }}>
          <div className="tooltip">
            Realized P&amp;L tracker with roll grouping, assignment handling, and Fidelity CSV import.
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: HEAD, marginBottom: 4 }}>FinkLedger</div>
            <div style={{ fontSize: 13.5, color: MUTED }}>Track your P&amp;L</div>
          </div>
          <a
            href={FINKLEDGER_URL === "#" ? undefined : FINKLEDGER_URL}
            target="_blank" rel="noopener noreferrer"
            className="launch-btn"
            style={{
              background: FINKLEDGER_URL === "#" ? "#374151" : TEAL,
              marginTop: 4,
              pointerEvents: FINKLEDGER_URL === "#" ? "none" : "auto",
              opacity: FINKLEDGER_URL === "#" ? 0.5 : 1,
            }}
          >
            {FINKLEDGER_URL === "#" ? "Coming Soon" : "Launch \u2192"}
          </a>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{ textAlign: "center" }}>
        <div style={{ fontSize: 12, color: DIM }}>
          Built on Jim Fink's Options for Income strategy
        </div>
      </footer>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // set false to show LoginScreen

  if (!isAuthenticated) {
    return <LoginScreen onLogin={function() { setIsAuthenticated(true); }} />;
  }

  return <HubScreen />;
}
