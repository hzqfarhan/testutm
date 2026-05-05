# Resilience Agent — Project Summary

> Last reviewed: 2026-05-05

## Purpose

A student-focused AI-powered fintech **Progressive Web App (PWA)** that helps users manage their financial health through intelligent spending insights, cashflow predictions, and savings goal tracking.

## Main Features

| Feature | Description |
|---|---|
| **Dashboard** | Balance overview, resilience score, quick actions, active AI insights |
| **QR Scan / Pay** | Simulated merchant QR scan with AI risk intercept before confirming payment |
| **Transfer** | Bank transfer simulation with real-time cashflow prediction warning |
| **AI Coach** | Chat interface with predefined suggestion chips for financial advice |
| **Agent Command Center** | Visual status panel for all 4 AI agents running in the background |
| **Debt Shield** | BNPL / installment risk analyzer and survival mode activation |
| **Savings Pockets** | Named savings goals with progress tracking |
| **Reports** | Spending breakdown pie chart, resilience milestones, projected month-end balance |
| **Transactions** | Full ledger view of all recorded transactions |
| **Settings** | Profile info, notification toggles, secure sign-out with confirmation modal |

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI Primitives | shadcn/ui (via `@base-ui/react`) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Charts | Recharts |
| State Management | Zustand 5 |
| Font | Inter (Google Fonts via `next/font`) |
| PWA | Web App Manifest (`src/app/manifest.ts`) |

## How to Run / Build

```bash
# Install dependencies
npm install

# Start development server
npm run dev        # → http://localhost:3000

# Production build (outputs to ./out for static export)
npm run build
```

> **Note:** Linting is bypassed during build (`lint` script echoes a skip message). Run `npx eslint .` manually to lint.

## Deployment

- **Target:** GitHub Pages at `https://pwntable.github.io/utmkathon/`
- **CI/CD:** GitHub Actions (`.github/workflows/nextjs.yml`) — triggers on push to `main`
- **Output:** Static export (`output: 'export'`) into `./out` directory
- **Base path:** `/utmkathon` (set in `next.config.ts`)

## Important Directories & Files

```
src/
  app/                    # Next.js App Router pages + layout
    layout.tsx            # Root layout (Navbar, CoachFAB, global metadata)
    page.tsx              # Entry point → renders <Landing />
    manifest.ts           # PWA manifest (force-static)
    globals.css           # Global styles + Tailwind tokens
    [route]/page.tsx      # One file per route (dashboard, scan, transfer, etc.)
  components/
    layout/
      Navbar.tsx          # Bottom navigation bar with central QR button
      CoachFAB.tsx        # Floating Action Button → /coach
    Dashboard.tsx         # Main dashboard view
    Scanner.tsx           # QR payment simulation
    Transfer.tsx          # Bank transfer with AI cashflow intercept
    Coach.tsx             # AI chat interface
    AgentCommandCenter.tsx# AI agent status display
    DebtShield.tsx        # Debt risk analysis
    Savings.tsx           # Savings pockets
    Reports.tsx           # Charts and milestones
    Settings.tsx          # User settings + secure sign-out modal
    BudgetGuardModal.tsx  # Budget guard activation modal
  store/
    useStore.ts           # Zustand global state (single source of truth)
  lib/
    utils.ts              # Utility helpers (cn, etc.)
.github/workflows/
  nextjs.yml              # CI/CD pipeline for GitHub Pages
next.config.ts            # Static export config + basePath
```

## Key Dependencies

| Package | Purpose |
|---|---|
| `next` 16.2.4 | Core framework |
| `zustand` 5 | Client-side state management |
| `framer-motion` | Page/component animations |
| `recharts` | Pie and bar charts in Reports |
| `lucide-react` | Icon library |
| `shadcn` + `@base-ui/react` | UI component primitives |
| `tailwindcss` v4 | Utility-first CSS |
| `next-themes` | Dark/light mode support (configured, not visibly toggled in UI) |

## Known Gaps & Uncertainties

- **No backend / database.** All state is in-memory Zustand. Data resets on page refresh.
- **AI responses are simulated** using `setTimeout` with hardcoded strings — no real LLM API calls.
- **QR scanning is mocked** — the camera is not actually invoked; merchant data is static.
- **Authentication does not exist.** Sign-out navigates to `/` but no session or token is cleared.
- **`updateResilienceScore()`** action exists in the store but has no implementation body.
- **`next-themes`** is installed but no dark mode toggle is exposed in the Settings UI.
- **PWA offline support** is not implemented — no Service Worker is registered.
