# Anurag Parkhe — Portfolio

A React + Vite portfolio focused on business analytics, product thinking, financial analysis and operations.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Routes
- `/` — Home
- `/projects` — Project library
- `/projects/:slug` — Case studies
- `/dashboards` — Interactive browser-native dashboard demo
- `/presentations` — Presentation library
- `/presentations/:slug` — In-browser slide decks
- `/experience` — Experience
- `/about` — About and skills

## Interactive work
The dashboards and slide decks run inside the website. The commercial dashboard intentionally uses illustrative sample data; it is not presented as real client or company performance. Presentation decks are browser-native slide experiences, not externally hosted PowerPoint files.

## Deployment
The `public/_redirects` file configures Netlify SPA fallback for direct navigation to nested routes.
