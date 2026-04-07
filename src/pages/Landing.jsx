// FinkHub | Phase 1 | Session 1 | Build 1 | 2026-04-07 | Hub landing page — bouncing portrait, rotating quotes, app cards

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { QUOTES } from "../quotes";

const BG      = "#0a0f1c";
const SURFACE = "#1a2234";
const BORDER  = "#2d3748";
const HEAD    = "#f1f5f9";
const MUTED   = "#94a3b8";
const DIM     = "#64748b";
const GREEN   = "#22c55e";
const TEAL    = "#14b8a6";
const SANS    = "'DM Sans', sans-serif";
const MONO    = "'IBM Plex Mono', monospace";

export default function Landing() {
  const [quoteIdx, setQuoteIdx]         = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [quoteVisible, setQuoteVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIdx(i => (i + 1) % QUOTES.length);
        setQuoteVisible(true);
      }, 400);
    }, 30000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: BG, color: HEAD,
      fontFamily: SANS, padding: "0 20px 40px",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>

      {/* ── Hero: Bouncing Portrait ── */}
      <div style={{ paddingTop: 64, display: "flex", flexDirection: "column", alignItems: "center" }}>

        <div className="fink-head-bounce" style={{ position: "relative", marginBottom: 24 }}>
          <div style={{
            position: "absolute", inset: -10, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(20,184,166,0.2) 0%, transparent 70%)",
            filter: "blur(10px)",
          }} />
          <img
            src="/fink-head.png"
            alt="Jim Fink"
            style={{
              width: 160, height: 160, borderRadius: "50%",
              objectFit: "cover", objectPosition: "center top",
              position: "relative",
              boxShadow: "0 0 40px rgba(20,184,166,0.18), 0 8px 32px rgba(0,0,0,0.45)",
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
            Real-time position monitor with risk alerts, status badges, and Fidelity import.
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: HEAD, marginBottom: 4 }}>FinkWatch</div>
            <div style={{ fontSize: 13.5, color: MUTED }}>Monitor your open positions</div>
          </div>
          <Link to="/watch" className="launch-btn" style={{ background: GREEN, marginTop: 4 }}>
            Open &rarr;
          </Link>
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
          <Link to="/ledger" className="launch-btn" style={{ background: TEAL, marginTop: 4 }}>
            Open &rarr;
          </Link>
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
