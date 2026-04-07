// FinkHub | Phase 1 | Session 1 | Build 1 | 2026-04-07 | Sticky banner + tab navigation layout

import { NavLink, Outlet, useLocation } from "react-router-dom";

const BG      = "#0a0f1c";
const TILE    = "#1a2234";
const TEXT    = "#f1f5f9";
const MONO    = "'IBM Plex Mono', monospace";
const SANS    = "'DM Sans', sans-serif";

const TABS = [
  { label: "Hub",    path: "/",       color: "#f59e0b" },
  { label: "Watch",  path: "/watch",  color: "#22c55e" },
  { label: "Ledger", path: "/ledger", color: "#14b8a6" },
];

function useSectionName() {
  const { pathname } = useLocation();
  if (pathname === "/")        return "Hub";
  if (pathname === "/watch")   return "Watch";
  if (pathname === "/ledger")  return "Ledger";
  return "";
}

export default function Layout() {
  const section = useSectionName();

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: SANS, display: "flex", flexDirection: "column" }}>

      {/* ── Sticky Top Banner ───────────────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: TILE,
        borderBottom: "1px solid #2d3748",
        display: "flex", alignItems: "center",
        padding: "0 20px", height: 56,
      }}>
        {/* Left: logo */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="/fink-head.png"
            alt="FinkHub"
            style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", objectPosition: "center top" }}
          />
          <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 600, color: TEXT, letterSpacing: "-0.5px" }}>
            FinkHub
          </span>
        </div>

        {/* Center: section name */}
        <div style={{ flex: 1, textAlign: "center", fontFamily: MONO, fontSize: 13, color: "#9ca3af", letterSpacing: "0.5px" }}>
          {section}
        </div>

        {/* Right: placeholder */}
        <div style={{ flex: 1 }} />
      </header>

      {/* ── Desktop Tab Nav (below banner) ──────────────────────────── */}
      <nav style={{
        background: TILE,
        borderBottom: "1px solid #2d3748",
        display: "flex",
        paddingBottom: 0,
      }} className="desktop-tabs">
        {TABS.map(tab => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.path === "/"}
            style={({ isActive }) => ({
              flex: 1, textAlign: "center",
              padding: "10px 0",
              fontFamily: SANS, fontSize: 14, fontWeight: 600,
              textDecoration: "none",
              color: isActive ? tab.color : "#6b7280",
              borderBottom: isActive ? `2px solid ${tab.color}` : "2px solid transparent",
              transition: "color 0.15s, border-color 0.15s",
            })}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      {/* ── Page Content ────────────────────────────────────────────── */}
      <main style={{ flex: 1, paddingBottom: 64 }} className="main-content">
        <Outlet />
      </main>

      {/* ── Mobile Bottom Tab Bar ───────────────────────────────────── */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: TILE,
        borderTop: "1px solid #2d3748",
        display: "flex",
        zIndex: 100,
        height: 56,
      }} className="mobile-tabs">
        {TABS.map(tab => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.path === "/"}
            style={({ isActive }) => ({
              flex: 1, textAlign: "center",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              fontFamily: SANS, fontSize: 12, fontWeight: 600,
              textDecoration: "none",
              color: isActive ? tab.color : "#6b7280",
              borderTop: isActive ? `2px solid ${tab.color}` : "2px solid transparent",
              transition: "color 0.15s, border-color 0.15s",
              gap: 2,
            })}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      {/* ── Responsive Styles ───────────────────────────────────────── */}
      <style>{`
        .desktop-tabs { display: flex; }
        .mobile-tabs  { display: none; }
        @media (max-width: 767px) {
          .desktop-tabs { display: none; }
          .mobile-tabs  { display: flex; }
          .main-content { padding-bottom: 56px; }
        }
      `}</style>
    </div>
  );
}
