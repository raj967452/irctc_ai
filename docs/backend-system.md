# Backend system

This document is intentionally scoped only to server-side architecture. Browser installability, service workers, offline pages, and push subscription UX are documented separately in `docs/pwa-strategy.md`.

## Gateway boundary

- Kong / AWS API Gateway / Envoy terminates TLS, validates JWTs, applies rate limits, and routes traffic to microservices.
- `infra/kong/kong.yml` contains concrete v1 service routes for search, booking, and AI.
- Backend rate limits and ACLs are independent from PWA cache behavior.

## Services

- Search Service: Node.js + Express, ElasticSearch query aggregation, Redis Cluster cache-aside responses.
- Booking Service: Go + Gin, PostgreSQL serializable transactions, `SELECT ... FOR UPDATE` locks, Kafka booking events.
- AI Service: Python + FastAPI, TensorFlow confirmation prediction, joblib recommendations/NLP, Redis Cluster prediction caching.
- Notification, PNR, Analytics, Auth, Payment, and User services are described in `lib/backend/services.ts`.

## Runtime ownership

- Service-to-service consistency, booking Sagas, payment callbacks, notification fanout, and model inference are backend-owned.
- Offline PWA reads may show cached snapshots, but authoritative booking, payment, and PNR state must be fetched from backend APIs.
