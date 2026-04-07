// FinkHub | Phase 1 | Session 1 | Build 1 | 2026-04-07 | Router root — wraps all routes in Layout

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout  from "./components/Layout.jsx";
import Landing from "./pages/Landing.jsx";
import Watch   from "./pages/Watch.jsx";
import Ledger  from "./pages/Ledger.jsx";

const styleEl = document.createElement("style");
styleEl.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0a0f1c; }
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"       element={<Landing />} />
          <Route path="/watch"  element={<Watch />} />
          <Route path="/ledger" element={<Ledger />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
