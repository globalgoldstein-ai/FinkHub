// FinkHub | Phase 1 | Session 1 | Build 1 | 2026-04-07 | Sticky banner + desktop tabs + mobile bottom tab bar

import { NavLink, Outlet, useLocation } from "react-router-dom";

const TABS = [
  { label: "Hub",    icon: "🏠", path: "/",       color: "#f59e0b" },
  { label: "Watch",  icon: "📊", path: "/watch",  color: "#22c55e" },
  { label: "Ledger", icon: "📒", path: "/ledger", color: "#14b8a6" },
];

function useSectionLabel() {
  const { pathname } = useLocation();
  if (pathname === "/watch")   return "Watch";
  if (pathname === "/ledger")  return "Ledger";
  return "Hub";
}

export default function Layout() {
  const section = useSectionLabel();

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1c", color: "#f1f5f9", fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── Sticky Top Banner ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#1a2234",
        borderBottom: "1px solid #2d3748",
        height: 52,
        display: "flex", alignItems: "center",
        padding: "0 16px",
        gap: 0,
      }}>

        {/* Left: logo */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <img
            src="/fink-head.png"
            alt="FinkHub"
            style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", objectPosition: "center top", flexShrink: 0 }}
          />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, fontWeight: 600, color: "#f1f5f9", whiteSpace: "nowrap" }}>
            FinkHub
          </span>
        </div>

        {/* Center: section label (mobile) / desktop tabs */}
        <div className="banner-center" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Desktop tabs — shown via CSS */}
          <nav className="desktop-tabs" style={{ display: "flex", gap: 0 }}>
            {TABS.map(tab => (
              <NavLink
                key={tab.path}
                to={tab.path}
                end={tab.path === "/"}
                style={({ isActive }) => ({
                  padding: "0 20px",
                  height: 52,
                  display: "flex", alignItems: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14, fontWeight: 600,
                  textDecoration: "none",
                  color: isActive ? tab.color : "#94a3b8",
                  borderBottom: isActive ? `2px solid ${tab.color}` : "2px solid transparent",
                  transition: "color 0.15s, border-color 0.15s",
                })}
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile section label — shown via CSS */}
          <span className="mobile-section-label" style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 13, color: "#94a3b8", letterSpacing: "0.5px",
          }}>
            {section}
          </span>
        </div>

        {/* Right: placeholder */}
        <div style={{ flex: 1 }} />
      </header>

      {/* ── Page Content ── */}
      <main className="main-content" style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* ── Mobile Fixed Bottom Tab Bar ── */}
      <nav className="mobile-tabs" style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#1a2234",
        borderTop: "1px solid #2d3748",
        height: 56,
        display: "flex",
        zIndex: 100,
      }}>
        {TABS.map(tab => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.path === "/"}
            style={({ isActive }) => ({
              flex: 1,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 2,
              textDecoration: "none",
              color: isActive ? tab.color : "#94a3b8",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, fontWeight: 600,
              borderTop: isActive ? `2px solid ${tab.color}` : "2px solid transparent",
              transition: "color 0.15s, border-color 0.15s",
            })}
          >
            <span style={{ fontSize: 16 }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ── Responsive Rules ── */}
      <style>{`
        .desktop-tabs       { display: flex !important; }
        .mobile-section-label { display: none !important; }
        .mobile-tabs        { display: none !important; }
        .main-content       { padding-bottom: 0; }

        @media (max-width: 767px) {
          .desktop-tabs         { display: none !important; }
          .mobile-section-label { display: inline !important; }
          .mobile-tabs          { display: flex !important; }
          .main-content         { padding-bottom: 72px; }
        }
      `}</style>
    </div>
  );
}
