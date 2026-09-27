# File Access Tracker & Download Limiter (Simulated)

A local-only, frontend-only simulation of a rate-limited file access system. Tracks how many times each file in a mock dataset has been "viewed" or "downloaded," locks a file once it exceeds its configured limit, and displays live usage per file. No backend, no real files, no persistence beyond the current page session — everything lives in React state.

## Features

- **Access tracking** — every View or Download click is recorded as a structured, append-only log entry
- **Live usage display** — "N of M accesses used" plus a color-coded progress bar per file
- **Automatic lock** — View/Download buttons disable once a file's limit is reached
- **Blocked-attempt feedback** — if a click is ever actually rejected by the handler, the reason is shown inline, not just silently ignored
- **Reset** — clears a file's usage without deleting its history
- **Per-file limit editing** — change how many accesses a given file allows
- **Persisted counts are even easier to tamper with than in-memory ones.** This project now saves its state to `localStorage` so counts survive a page refresh, for convenience during testing

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.