# FinkHub

## Overview
FinkHub is a landing page and navigation hub for a suite of financial tools built on Jim Fink's Options for Income strategy. It serves as the "front door" linking to FinkWatch (monitor open positions) and FinkLedger (track realized P&L).

## Tech Stack
- **Framework:** React 18.3.1
- **Build Tool:** Vite 5.4.2
- **Language:** JavaScript (ES Modules)
- **Package Manager:** npm
- **Styling:** CSS-in-JS via dynamic style tag in App.jsx
- **Fonts:** DM Sans and IBM Plex Mono (Google Fonts)

## Project Structure
```
finkhub/
├── public/           # Static assets (favicon, hero image)
├── src/
│   ├── App.jsx       # Main application component (all UI logic)
│   ├── main.jsx      # React entry point
│   └── quotes.js     # Rotating quotes data
├── index.html        # HTML template
├── vite.config.js    # Vite config (host: 0.0.0.0, port: 5000)
└── package.json
```

## Development
- Run `npm run dev` to start the dev server on port 5000
- Workflow "Start application" is configured for this

## Deployment
- Configured as a static site
- Build command: `npm run build`
- Public directory: `dist`
