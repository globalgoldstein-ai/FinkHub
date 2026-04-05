# Fink Suite — REQUIREMENTS.md
<!-- Source of truth for FinkHub, FinkWatch, FinkLedger -->
<!-- Last updated: 2026-04-01 -->

---

## 1. Suite Overview

Three React/Vite apps deployed on Bolt.new, linked to GitHub (`globalgoldstein-ai`), source of truth in GitHub, production via Bolt hosting.

| App | Repo | Live URL | Purpose |
|---|---|---|---|
| FinkHub | globalgoldstein-ai/FinkHub | https://finkhub.netlify.app/ | Landing page / navigation hub |
| FinkWatch | globalgoldstein-ai/FinkWatch | https://finkwatch.netlify.app/ | Open position monitor |
| FinkLedger | globalgoldstein-ai/FinkLedger | https://finkledger.netlify.app/ | Realized P&L tracker |

All three apps are built on **Jim Fink's Options for Income** strategy (credit spreads, income generation, defined risk).

---

## 2. Global Design System

### Colors
```
Background:   #111827
Surface:      #1f2937
Border:       #2d3748
Dim text:     #6b7280
Muted text:   #9ca3af
Heading:      #f1f5f9
FinkWatch:    #4CAF50  (green)
FinkLedger:   #00BCD4  (teal)
```

### Typography
```
Primary:  DM Sans (400, 500, 700)
Mono:     IBM Plex Mono (400, 500, 600)
```

### Shared Patterns
- Cards: `background: #1f2937`, `border-radius: 12px`, left accent border (app color), subtle lift on hover
- Buttons: full-width within card, accent color, `min-height: 48px`, `border-radius: 8px`
- Scrollbar: 4px wide, `#374151` thumb
- No splash screens — all apps load directly into their main view

### Build Comment Format (mandatory on every commit)
```
// [AppName] | Session N | Build N | YYYY-MM-DD HH:MM ET | Brief description
```

---

## 3. FinkHub

**Role:** Front door for the suite. One focal point (Fink head), two cards, rotating quotes. No brochure content.

### Layout (top to bottom)
1. **Hero head** — `fink-head.png`, 160px, circular, bouncing float animation (`@keyframes float`, 3s ease-in-out), soft teal radial glow behind it
2. **Title** — "FinkHub" bold DM Sans + small BETA pill (monospace, muted)
3. **Rotating quote** — italic, 18px, `#9ca3af`, 30-second interval, random start, crossfade transition. Quotes live in `src/quotes.js` (imported, never inline in App.jsx)
4. **Two app cards** — minimal: app name + one-liner + Launch button + left border accent. Hover tooltip (CSS-only, no JS) with feature summary
5. **Footer** — single line: "Built on Jim Fink's Options for Income strategy"

### Card Tooltips
- FinkWatch: *"Real-time position monitor with risk alerts, status badges, and Fidelity import. Updates weekly."*
- FinkLedger: *"Realized P&L tracker with roll grouping, assignment handling, and Fidelity CSV import."*

### Card Links
- FinkWatch → `https://globalgoldstein-ai-f-7vz9.bolt.host/` (opens new tab)
- FinkLedger → `https://globalgoldstein-ai-f-7x9u.bolt.host/` (opens new tab)

### Auth
Login screen scaffolded but disabled (`isAuthenticated` defaults to `true`). `LoginScreen` component retained in code for future use.

### File Structure
```
src/
  App.jsx      — all UI
  quotes.js    — QUOTES array only, exported. Add new quotes here.
public/
  fink-head.png
```

---

## 4. FinkWatch

**Role:** Monitor open positions. Show what needs attention now.

### Header
- App name pill: "📊 FinkWatch" in monospace + teal accent
- 🏠 FinkHub button linking to `https://globalgoldstein-ai-f-6vl7.bolt.host/` (new tab)
- No splash screen — loads directly into position table

### Core Features
- **Position table** — one row per open spread. Columns: Ticker, Strategy, Expiry, Strike, Credit, Current Value, P&L, Status badge, Days to Expiry (DTE)
- **Status badges** — color-coded: OK (green), Watch (yellow), Roll (orange), Urgent (red)
- **Risk alerts** — flag positions approaching expiry or exceeding loss threshold
- **Roll candidates** — surface positions that meet Fink's roll criteria (DTE ≤ 21, profit ≥ 50%)
- **Fidelity import** — paste or upload Fidelity position export; parser maps to internal schema

### Data
- Stored in localStorage (current)
- No backend — all client-side
- Weekly manual update workflow (user imports from Fidelity)

### Design
- Green (`#4CAF50`) accent throughout
- Dark surface cards for position groups
- Mobile-first: table scrolls horizontally on small screens

---

## 5. FinkLedger

**Role:** Track realized P&L on closed trades.

### Header
- App name pill: "💰 FinkLedger" in monospace + teal accent
- 🏠 FinkHub button linking to `https://globalgoldstein-ai-f-6vl7.bolt.host/` (new tab)
- No splash screen — loads directly into ledger view

### Core Features
- **Trade ledger** — one row per closed trade. Columns: Date, Ticker, Strategy, Opening Credit, Closing Debit, Net P&L, Outcome (Win/Loss/Scratch), Notes
- **Roll grouping** — link original trade to its rolls; show net P&L across the roll chain
- **Assignment handling** — flag assigned trades; track stock acquisition cost and subsequent disposition
- **Fidelity CSV import** — parse Fidelity activity history CSV; auto-map transactions to trades
- **Summary stats** — total realized P&L, win rate, average credit, average DTE at close

### Data
- Stored in localStorage (current)
- Fidelity CSV is the primary data source
- No backend — all client-side

### Design
- Teal (`#00BCD4`) accent throughout
- P&L values: green for positive, red for negative, gray for scratch

---

## 6. Shared quotes.js

Lives in `FinkHub/src/quotes.js`. The 32-quote array rotates in FinkHub. FinkWatch and FinkLedger may optionally import a subset.

To add quotes: edit `quotes.js` only, never `App.jsx`.

---

## 7. Deployment Workflow

```
Edit in Bolt  →  Push to GitHub  →  Auto-deploy to Bolt hosting
```

- **Never** edit directly in Bolt UI without committing to GitHub — changes will be lost on next deploy
- Always bump Session/Build number and update build comment before committing
- Test on iPhone after every deploy (Safari, mobile viewport)

---

## 8. Known Constraints

- Anthropic API calls require Netlify/Edge Functions (CORS blocks direct browser calls) — not currently used in Fink suite
- Bolt.new creates its own Supabase projects — do not attempt Supabase auth without migrating to a personally-owned project
- localStorage only — no shared state between users or devices
- SMS via Zapier: ~160 char limit (not currently used in Fink suite)

---

## 9. Roadmap / Backlog

| Item | App | Priority | Notes |
|---|---|---|---|
| Strip splash screens | FinkWatch, FinkLedger | 🔴 Now | Remove showSplash state + component entirely |
| FinkHub home button in headers | FinkWatch, FinkLedger | 🔴 Now | Small pill, new tab, match header style |
| Real-time quote data | FinkWatch | 🟡 Soon | Polygon.io or Yahoo Finance fallback |
| Roll chain grouping | FinkLedger | 🟡 Soon | Link trades by ticker + strategy |
| Login / auth | FinkHub | 🟢 Future | Currently stubbed out |
| Shared data across devices | All | 🟢 Future | Netlify Blobs or Supabase when auth is ready |
| Dark/light toggle | All | 🟢 Future | Low priority, dark-only for now |
