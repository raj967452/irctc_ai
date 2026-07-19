# IRCTC AI

A Next.js 14, TypeScript, SSR, ISR, Turbopack, Tailwind CSS, Radix UI, Zustand, React Query, and PWA prototype for an ultra-fast IRCTC experience across booking, PNR, live train status, meals, refunds, and support pages.

## Client layer

- **Framework:** Next.js 14 Pages Router with SSR, ISR, streaming-ready API routes, and edge deployment readiness.
- **Language:** TypeScript with strict compiler settings.
- **State:** Zustand for local journey state and React Query for server/cache state.
- **Styling:** Tailwind CSS with Radix UI primitives for accessible interaction patterns.
- **Build:** Turbopack-enabled `next dev --turbo` and `next build --turbo` scripts.
- **PWA:** Service worker shell caching, ready to be expanded with Workbox precache manifests.

## Performance strategy

- Edge-render the shell and cache static route, PNR, and timetable data close to users.
- Keep booking interactions optimistic and idempotent so retries are safe during traffic spikes.
- Target 10 million concurrent users through global DNS, WAF, L7 load balancers, autoscaled stateless API services, read replicas, inventory shards, queues, and event streaming.

## AI booking features

- Natural-language booking copilot for route discovery and passenger intent.
- Waitlist movement prediction and alternate train recommendations.
- Fraud, bot, and payment-risk scoring before final ticket confirmation.
- Personalized accessibility, meal, berth, and disruption notifications.

## Page structure

The prototype now includes a `/pages` route map for home, search, results, booking, payment, confirmation, PNR, live train, schedule, stations, fare, cancellation, chart preparation, profile, AI assistant, and admin workflows. Booking uses route-level dynamic imports and component-level lazy loading.

See `docs/performance-optimizations.md` for edge rendering, code splitting, asset optimization, and PWA details.

## Core component coverage

- **Home (`/`):** quick search widget, AI destination suggestions, popular routes carousel, real-time train status ticker, CDN-cached promotional banner area, and lazy-loaded login/register modal.
- **Results (`/results`):** `react-window` virtualized list for 1000+ trains, simulated real-time seat availability, Web Worker filter/sort strategy, AI confirmation probability badge, price prediction indicator, skeleton loading, and infinite-scroll positioning.
- **Booking (`/booking`):** saved-passenger auto-fill, OCR ID scanning placeholder, CAPTCHA-less behavioral verification, real-time fare calculation, seat preference visualization, food catering, insurance, and session countdown timer.
- **AI Assistant (`/ai-assistant/chat`):** conversational search, voice input affordance, contextual recommendations, booking help, complaint resolution, and 12 Indian languages.
- **State/API:** persisted Zustand booking store and React Query API client with optimistic booking mutation rollback.

## Backend microservices

The backend design now includes Kong / AWS API Gateway / Envoy routing, Auth, Search, Booking, Payment, PNR, Notification, AI, Analytics, and User services with their storage choices and scaling strategies. See `docs/microservices-architecture.md`, `infra/kong/routes.yaml`, `infra/kong/kong.yml`, `services/search-service/src/index.ts`, `services/booking-service/main.go`, and `services/ai-service/main.py`.

## Commands

```bash
npm install
npm run dev
npm run build
npm test
```
