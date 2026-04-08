```markdown
# FinkHub
## Overview
FinkHub is a unified options trading suite built on Jim Fink's Options for Income strategy. It combines FinkWatch (open position monitor) and FinkLedger (realized P&L tracker) under a single app with shared navigation chrome.

## Tech Stack
- **Framework:** React 18.3.1 + React Router v6
- **Build Tool:** Vite 5.4.2
- **Language:** JavaScript (ES Modules)
- **Package Manager:** npm
- **Styling:** CSS-in-JS via inline styles and dynamic style tags
- **Fonts:** DM Sans, IBM Plex Mono (Google Fonts)

## Project Structure
```
finkhub/
├── public/              # Static assets
│   ├── fink-head.png    # Hero portrait (real photo)
│   └── fink-icon.png    # App icon + favicon (illustrated)
├── src/
│   ├── App.jsx          # Router root
│   ├── main.jsx         # React entry point
│   ├── quotes.js        # Rotating quotes — do not modify
│   ├── components/
│   │   └── Layout.jsx   # Shared banner + tab nav
│   └── pages/
│       ├── Landing.jsx  # / — hero, quotes, app cards
│       ├── Watch.jsx    # /watch — position monitor
│       └── Ledger.jsx   # /ledger — P&L tracker
├── index.html
├── vite.config.js       # host: 0.0.0.0, port: 5000
└── package.json
```

## Routes
- `/` — Landing (bouncing portrait, rotating quotes, app cards)
- `/watch` — FinkWatch position monitor (green accent #22c55e)
- `/ledger` — FinkLedger P&L tracker (teal accent #14b8a6)

## localStorage Keys (do not change)
- `ofi-p-v5`, `ofi-a-v5`, `ofi-h-v5`, `ofi-vw-v2`, `ofi-tab-v1` — FinkWatch
- `fl-transactions-v1` — FinkLedger

## File Header Convention
Line 1 of every src file:
`// FinkHub | Phase 1 | Session N | Build N | YYYY-MM-DD | description`

## Development
- Run `npm run dev` to start dev server on port 5000

## Deployment
- GitHub main → Netlify auto-deploy (< 1 min)
- Build command: `npm run build`
- Publish directory: `dist`
- All changes (Replit Agent, GitHub UI, Claude-generated code) must be
  committed to GitHub main to deploy — never deploy from Replit directly
```
