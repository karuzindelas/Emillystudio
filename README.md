# Emilly Studio

Mobile-first product foundation for discovering commercial opportunities for models, UGC creators, and influencers. The product centers on a private, contextual feed—not a CRM dashboard.

## Current stage

Stage 1 (foundation) is implemented as an installable, mobile-first PWA. The main screen uses a single-column social feed with compact publisher rows, square media areas, like/context/contact actions, a save action, captions, and bottom navigation. It opens in standalone mode after installation, offers an install action where supported, and includes an iOS Safari installation guide. The opportunities in the interface are **fictional demonstration examples**, with no real company, campaign, contact, or verification data. Likes and saves exist only in page memory; they are not accounts, persistent records, or proof of a real commercial relationship. The paper-plane action opens WhatsApp only if a traceable, valid company number is available; the demo records have none.

Stage 2 (account, database, and tenant isolation) has not started. There is no authentication, database, external data provider, analytics, payment, or WhatsApp integration configured.

## Stack

- Next.js App Router and React 19
- TypeScript with strict checking
- Authored CSS with design tokens, native scrolling, and reduced-motion support
- Next.js web manifest and versioned service worker with an offline fallback and cache limited to the public demo shell and immutable build assets
- Vitest for pure recommendation/filtering rules
- No remote images, trackers, analytics, cookies, or persistent user-data storage

The architectural proposal and trade-offs are in [`docs/DECISIONS.md`](docs/DECISIONS.md); staged deliverables are in [`docs/ROADMAP.md`](docs/ROADMAP.md).

## Requirements

- Node.js 20.9 or newer
- pnpm 11 (the lockfile was generated with pnpm 11)

## Local development

```sh
pnpm install
pnpm dev
```

Open `http://localhost:3000`. The app has five destinations: Início, Explorar, Salvos, Atividade, and Perfil. The one-column feed adapts to screen width and keeps navigation in the bottom safe area. Search/category filters, likes, saves, recommendation context, and profile-interest toggles are interactive but temporary. The paper-plane icon is the company contact action: if a future record has a valid phone and traceable source, it opens WhatsApp with a draft for the user to review; it never sends automatically. Demo records have no contact number. Serve production over HTTPS for installation outside localhost. On iPhone, open the link in Safari and use Share → Add to Home Screen; on supported Chromium browsers, use **Instalar app** or the browser menu.

## Quality checks

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Performance checks begin with production bundle output and browser profiling. In this local production preview, the first HTTP response returned 22,206 bytes with status 200 in about 290 ms over localhost; all generated JavaScript chunks totaled 587,819 bytes raw / 180,535 bytes gzip across 8 files. This is an initial local baseline, not a Lighthouse/Core Web Vitals result and not a measurement of a mobile network. The development container blocks child-process creation, which affects Next's development server and some build workers. A browser preview was served from a production build after its separate TypeScript check passed. No physical iPhone/Android device profiling or Lighthouse audit has been completed.

## PWA cache, privacy, and integrations

The service worker caches the public demo home shell, versioned Next.js static assets, app manifest, and offline fallback. It never caches API requests, contact data, or user state; likes and saves reset when the app closes. Cache names are versioned and older Emilly Studio caches are removed on activation. Before adding authentication or personalized server responses, keep those routes outside the public cache policy and verify cache headers and logout invalidation. No trackers, cookies, or analytics are installed. No secrets or real personal data belong in this repository. Supabase, hosting, authorized company data sources, and business costs remain unconfigured. Do not present demonstration records as real opportunities.

## Deployment

No production deployment or provider has been configured. Configure separate preview and production environments before connecting authentication or personal data. Keep server secrets in the hosting environment; do not add real credentials to `.env.example` or the client bundle.

This deliverable is an installable PWA, not a signed native Android/iOS binary or an App Store / Google Play publication. The browser and operating system control installation availability and refresh behavior.
