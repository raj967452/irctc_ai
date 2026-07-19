# IRCTC AI

A Next.js 14, TypeScript, React Server Components, SSR, Turbopack, Tailwind CSS, Radix UI, Zustand, React Query, and PWA prototype for an ultra-fast IRCTC experience across booking, PNR, live train status, meals, refunds, and support pages.

## Client layer

- **Framework:** Next.js 14 with React Server Components, SSR, streaming, and Partial Prerendering readiness.
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

## Commands

```bash
npm install
npm run dev
npm run build
npm test
```
