# Backend architecture for 10 million users

1. Global DNS and WAF absorb malicious traffic and steer users to the nearest healthy region.
2. L7 load balancers split traffic by page intent: search, PNR, live status, booking, payment, refund, and support.
3. Next.js Edge SSR workers stream React Server Components and cache public timetable fragments.
4. API Gateway applies auth, quotas, bot controls, request coalescing, and circuit breakers.
5. Booking Orchestrator accepts idempotent commands, obtains distributed inventory locks, and writes to sharded inventory partitions.
6. Kafka-compatible event streaming decouples payment callbacks, notifications, fraud scoring, and refund processing.
7. AI feature store serves waitlist prediction, route ranking, disruption detection, and natural-language booking features.
