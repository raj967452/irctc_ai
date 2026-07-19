# IRCTC AI

A dependency-free static prototype for an ultra-fast IRCTC experience across booking, PNR, live train status, meals, refunds, and support pages.

## Performance strategy

- Edge-render the shell and cache static route, PNR, and timetable data close to users.
- Keep booking interactions optimistic and idempotent so retries are safe during traffic spikes.
- Keep the client bundle tiny with dependency-free JavaScript so core booking content remains fast.
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
