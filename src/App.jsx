// FinkHub | Session 5 | Build 3 | 2026-03-31 09:00 ET | Remove hero portrait, larger quote font, 30s rotation

import { useState, useEffect } from "react";

const styleEl = document.createElement("style");
styleEl.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #111827; }
  button { font-family: 'DM Sans', sans-serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #1f2937; }
  ::-webkit-scrollbar-thumb { background: #374151; border-radius: 2px; }
  .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.4) !important; }
  .launch-btn { transition: filter 0.15s ease, transform 0.1s ease; }
  .launch-btn:hover { filter: brightness(1.15); transform: translateY(-1px); }
  .launch-btn:active { transform: translateY(0px); }
`;
document.head.appendChild(styleEl);

const BG       = "#111827";
const SURFACE  = "#1f2937";
const BORDER   = "#2d3748";
const DIM      = "#4b5563";
const HEAD     = "#f1f5f9";
const BODY_CLR = "#9ca3af";
const GREEN    = "#4CAF50";
const TEAL     = "#00BCD4";
const MUTED    = "#6b7280";
const SANS     = "'DM Sans', sans-serif";
const MONO     = "'IBM Plex Mono', monospace";

const FINKWATCH_URL  = "https://globalgoldstein-ai-f-7vz9.bolt.host/";
const FINKLEDGER_URL = "https://globalgoldstein-ai-f-7x9u.bolt.host/";

const QUOTES = [
  "Options Spreads: It's basically sports betting for people who own too many Patagonia vests and like to pretend their parlays are \"mathematical models.\"",
  "The \"Hedge\": Using a spread is just losing money with a seatbelt on\u2014it's like betting on Red at the casino while also betting on \"Not-Quite-As-Red\" so you can call it risk management.",
  "Iron Condors: This strategy involves picking two numbers the stock won't hit; it's the financial version of charging the market rent for staying in its room\u2014right up until the market decides to move out in the middle of the night.",
  "Covered Calls: The \"I'm the House\" strategy, until the stock moons and you realize you're the only person who sold their house at 2019 prices while your neighbors are all retiring on Mars.",
  "0DTE (Zero Days to Expiration): Buying these is just paying a premium to watch a countdown timer tell you your net worth is now officially a tax write-off.",
  "Buying Puts: It's like buying fire insurance on your neighbor's house, except you're secretly standing in their driveway with a match praying for a \"market correction.\"",
  "The Greeks: Delta, Gamma, and Theta aren't math; they're just the names of the monsters under an options trader's bed that eat their account balance while they sleep.",
  "Theta Decay: The slow, agonizing process of watching your portfolio evaporate purely because the Earth continues to rotate around the Sun.",
  "Implied Volatility (IV) Crush: This is the market's way of saying, \"I know you were right about the earnings report, but I'm still going to take your lunch money because you were too excited about it.\"",
  "Margin Calls: The ultimate \"Game Over\" screen that proves your \"sophisticated strategy\" was actually just three casinos stacked on top of each other in a trench coat.",
  "The Ice Cube: Buying an option is like buying a literal ice cube in the desert. You might have a great plan for it, but Theta is the sun that doesn't care about your \"thesis.\"",
  "The Weekend Tax: Theta is the only thief that works Saturdays. You go to sleep Friday feeling like a genius and wake up Monday to find your portfolio evaporated 15% just because the Earth kept spinning.",
  "The \"Hope\" Drain: Theta is the realization that even if the stock finally goes your way, you spent more on time decay than the profit is worth. It's like winning a race but spending the prize money on gas to get to the track.",
  "The Seller's Employee: If you're selling options, Theta is your loyal worker who never takes a day off. If you're buying them, Theta is the high-interest credit card you forgot to pay.",
  "The Wash Sale Rule: The IRS's way of reminding you that you can't just delete your mistakes and start over like it's a video game.",
  "The PDT Rule: A velvet rope designed to keep you out of the \"VIP section of losing money\" until you have at least $25,000 to set on fire.",
  "LEAPS: Buying these is like watching a slow-motion car crash that takes two years to actually hit the wall.",
  "Early Assignment: The financial equivalent of a \"surprise party\" where the only guest is a massive debt you didn't see coming.",
  "Bid-Ask Spreads: The hidden tax on your optimism. You're down 5% the second you click \"buy\" just for the privilege of participating in your own demise.",
  "Technical Analysis: Drawing lines on a chart until they look like a staircase to heaven, right before the market pushes you down the elevator shaft.",
  "RSI & MACD: Financial astrology for people who think a \"Golden Cross\" is a sign from God instead of a lagging indicator of their own hubris.",
  "Paper Trading: The only time you'll ever be a millionaire. It's like being the world's best driver while sitting in a parked car.",
  "Risk Management: The thing you promise to start doing tomorrow, right after this one last \"guaranteed\" play recovers the losses from the previous three \"guaranteed\" plays.",
  "Max Pain: The theory that the market will gravitate toward the price that makes the most people miserable. It's not a conspiracy; it's just the market's personality.",
  "Jerome Powell: The only man on Earth who can turn your life savings into a cautionary tale just by clearing his throat during a press conference.",
  "Market Makers: The silent ghosts who ensure that the \"bid\" is always exactly one cent lower than you need it to be to feel any joy.",
  "Trading on Margin: Using the bank's money to prove you're smarter than the bank. Spoiler: The bank has a much bigger building than you do.",
  "Deep OTM Calls: \"Low-probability, high-convexity events\" is just a fancy way of saying you're buying lottery tickets from a guy in a suit.",
  "FOMO: The irresistible urge to buy at the absolute top because you saw a guy on the internet with a cartoon avatar claim he's \"never been more bullish.\"",
  "Revenge Trading: Trying to \"win back\" money from the market is like trying to fistfight a hurricane because it blew your hat off.",
  "The Long Straddle: A strategy where you bet the stock will move, only for it to stay perfectly still out of sheer spite for your \"delta-neutral\" genius.",
  "Account Liquidation: On the bright side, you don't actually need two kidneys to trade, but you definitely need two to pay for the therapy session after this trade.",
];

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
        <img src="/fink-head.png" alt="" style={{ width: 64, height: 64, borderRadius: "50%", marginBottom: 16, objectFit: "cover" }} />
        <div style={{ fontFamily: MONO, fontSize: 22, color: TEAL, marginBottom: 8 }}>FinkHub</div>
        <div style={{ color: MUTED, fontSize: 14, marginBottom: 28 }}>Login coming soon</div>
        <button
          onClick={onLogin}
          style={{
            padding: "12px 32px", background: TEAL, color: "#fff",
            border: "none", borderRadius: 8, fontSize: 15,
            fontWeight: 700, cursor: "pointer", fontFamily: SANS, minHeight: 44,
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// ── Hub Screen ────────────────────────────────────────────────────────────────

function HubScreen() {
  // Pick a random quote on mount; rotate every 30s
  const [quoteIdx, setQuoteIdx]         = useState(function() { return Math.floor(Math.random() * QUOTES.length); });
  const [quoteVisible, setQuoteVisible] = useState(true);

  useEffect(function() {
    const iv = setInterval(function() {
      setQuoteVisible(false);
      setTimeout(function() {
        setQuoteIdx(function(i) { return (i + 1) % QUOTES.length; });
        setQuoteVisible(true);
      }, 400);
    }, 30000); // 30 seconds
    return function() { clearInterval(iv); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: BG, color: HEAD, fontFamily: SANS, padding: "0 20px 60px" }}>

      {/* ── Header pill ── */}
      <header style={{ display: "flex", justifyContent: "center", padding: "24px 0 0" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: SURFACE, border: "1px solid " + BORDER,
          borderRadius: 100, padding: "4px 16px 4px 4px",
        }}>
          {/* Larger portrait filling the circle */}
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            overflow: "hidden", flexShrink: 0,
            border: "2px solid " + TEAL + "60",
          }}>
            <img
              src="/fink-head.png"
              alt="Jim Fink"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
          <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600, color: TEAL, letterSpacing: 0.5 }}>FinkHub</span>
          <span style={{ fontSize: 10, color: MUTED, background: "#ffffff0d", padding: "2px 7px", borderRadius: 10, letterSpacing: 0.5 }}>BETA</span>
        </div>
      </header>

      {/* ── Hero ── */}
      <div style={{
        maxWidth: 800, margin: "0 auto",
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: 52, paddingBottom: 48, textAlign: "center",
      }}>
        {/* Title */}
        <h1 style={{
          fontFamily: SANS, fontSize: "clamp(32px, 6vw, 46px)", fontWeight: 700,
          color: HEAD, letterSpacing: -1.5, marginBottom: 12, lineHeight: 1.15,
        }}>
          Your options trading
          <br />
          <span style={{
            background: "linear-gradient(135deg, " + GREEN + " 0%, " + TEAL + " 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            command center.
          </span>
        </h1>

        <p style={{ fontSize: 15, color: BODY_CLR, maxWidth: 420, lineHeight: 1.75, marginBottom: 28 }}>
          Built on Jim Fink's Options for Income strategy.
          Monitor positions, track P&L, never miss a roll.
        </p>

        {/* Rotating quote */}
        <div style={{
          minHeight: 80, display: "flex", alignItems: "center",
          justifyContent: "center", maxWidth: 600,
        }}>
          <p style={{
            fontFamily: MONO, fontSize: 15, color: DIM,
            fontStyle: "italic", lineHeight: 1.8, textAlign: "center",
            opacity: quoteVisible ? 1 : 0,
            transform: quoteVisible ? "translateY(0)" : "translateY(5px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}>
            {QUOTES[quoteIdx]}
          </p>
        </div>
      </div>

      {/* ── App Cards ── */}
      <div style={{
        maxWidth: 800, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 20, paddingBottom: 52,
      }}>

        {/* FinkWatch */}
        <div className="card-hover" style={{
          background: SURFACE, border: "1px solid " + BORDER,
          borderTop: "3px solid " + GREEN, borderRadius: 16,
          padding: 28, display: "flex", flexDirection: "column",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{
              fontSize: 26, width: 50, height: 50,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: GREEN + "18", borderRadius: 12, border: "1px solid " + GREEN + "30",
              flexShrink: 0,
            }}>📊</div>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 700, color: HEAD }}>FinkWatch</div>
              <div style={{ fontSize: 10, color: GREEN, fontWeight: 700, letterSpacing: 0.8 }}>POSITION MONITOR</div>
            </div>
          </div>

          <p style={{ fontSize: 13.5, color: BODY_CLR, lineHeight: 1.75, marginBottom: 14, flex: 1 }}>
            Monitor your open positions in real time. See what needs attention right now — expiring spreads, risk alerts, and roll candidates at a glance.
          </p>

          <div style={{
            fontFamily: MONO, fontSize: 10.5, color: DIM,
            borderTop: "1px solid " + BORDER, paddingTop: 12, marginBottom: 20, lineHeight: 2,
          }}>
            Live position monitor · Risk alerts · Fidelity import
          </div>

          <a
            href={FINKWATCH_URL} target="_blank" rel="noopener noreferrer"
            className="launch-btn"
            style={{
              display: "block", padding: "13px 0", background: GREEN,
              color: "#fff", borderRadius: 10, fontSize: 15, fontWeight: 700,
              textAlign: "center", textDecoration: "none", minHeight: 48,
              lineHeight: "22px", fontFamily: SANS,
            }}
          >
            Launch FinkWatch →
          </a>
        </div>

        {/* FinkLedger */}
        <div className="card-hover" style={{
          background: SURFACE, border: "1px solid " + BORDER,
          borderTop: "3px solid " + TEAL, borderRadius: 16,
          padding: 28, display: "flex", flexDirection: "column",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{
              fontSize: 26, width: 50, height: 50,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: TEAL + "18", borderRadius: 12, border: "1px solid " + TEAL + "30",
              flexShrink: 0,
            }}>💰</div>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 700, color: HEAD }}>FinkLedger</div>
              <div style={{ fontSize: 10, color: TEAL, fontWeight: 700, letterSpacing: 0.8 }}>P&amp;L TRACKER</div>
            </div>
          </div>

          <p style={{ fontSize: 13.5, color: BODY_CLR, lineHeight: 1.75, marginBottom: 14, flex: 1 }}>
            Track your realized P&L across every trade, roll, and assignment. Import from Fidelity activity history and see exactly what each spread made.
          </p>

          <div style={{
            fontFamily: MONO, fontSize: 10.5, color: DIM,
            borderTop: "1px solid " + BORDER, paddingTop: 12, marginBottom: 20, lineHeight: 2,
          }}>
            Realized P&amp;L · Roll tracking · Fidelity CSV import
          </div>

          <a
            href={FINKLEDGER_URL} target="_blank" rel="noopener noreferrer"
            className="launch-btn"
            style={{
              display: "block", padding: "13px 0",
              background: FINKLEDGER_URL === "#" ? DIM : TEAL,
              color: "#fff", borderRadius: 10, fontSize: 15, fontWeight: 700,
              textAlign: "center", textDecoration: "none", minHeight: 48,
              lineHeight: "22px", fontFamily: SANS,
              pointerEvents: FINKLEDGER_URL === "#" ? "none" : "auto",
              cursor: FINKLEDGER_URL === "#" ? "default" : "pointer",
            }}
          >
            {FINKLEDGER_URL === "#" ? "FinkLedger — Coming Soon" : "Launch FinkLedger →"}
          </a>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{
        maxWidth: 800, margin: "0 auto",
        borderTop: "1px solid " + BORDER, paddingTop: 28,
        textAlign: "center", display: "flex", flexDirection: "column", gap: 6,
      }}>
        <div style={{ fontFamily: MONO, fontSize: 11, color: DIM }}>
          Built on Jim Fink's Options for Income strategy
        </div>
        <div style={{ fontSize: 11, color: DIM }}>
          Powered by Fidelity data · Not affiliated with Fidelity Investments
        </div>
        <div style={{ fontFamily: MONO, fontSize: 10, color: "#374151", marginTop: 4 }}>
          FinkHub · Session 5 · Build 3 · 2026-03-31
        </div>
      </footer>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // set to false to show LoginScreen

  if (!isAuthenticated) {
    return <LoginScreen onLogin={function() { setIsAuthenticated(true); }} />;
  }

  return <HubScreen />;
}
