# Backend microservices architecture

```text
┌──────────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                            │
│              (Kong / AWS API Gateway / Envoy)                     │
└──────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Auth       │    │   Search     │    │   Booking    │
│   Service    │    │   Service    │    │   Service    │
│ - JWT        │    │ - Elastic    │    │ - PostgreSQL │
│ - OAuth2     │    │ - Redis      │    │ - Kafka      │
│ - MFA        │    │ - Geo DB     │    │ - Saga       │
└──────────────┘    └──────────────┘    └──────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Payment     │    │   PNR        │    │ Notification │
│  Service     │    │  Service     │    │   Service    │
│ - Razorpay   │    │ - Redis      │    │ - WebSocket  │
│ - UPI        │    │ - MongoDB    │    │ - Email      │
│ - Wallets    │    │ - Cache      │    │ - SMS / Push │
└──────────────┘    └──────────────┘    └──────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│     AI       │    │  Analytics   │    │   User       │
│   Service    │    │   Service    │    │   Service    │
│ - TensorFlow │    │ - ClickHouse │    │ - PostgreSQL │
│ - PyTorch    │    │ - Druid      │    │ - Redis      │
│ - ONNX       │    │ - Superset   │    │ - LDAP       │
└──────────────┘    └──────────────┘    └──────────────┘
```

## Gateway and load-balancer layer

- **Kong / AWS API Gateway / Envoy** terminates TLS, validates JWTs, applies quotas, and routes traffic to service clusters.
- Layer-7 routing splits user intent into auth, search, booking, PNR, payment, notification, AI, analytics, and user domains.
- Rate limiting protects Tatkal and flash-sale windows with per-user, per-IP, and per-route budgets.
- Circuit breakers isolate degraded downstreams so search, PNR, and static journey browsing remain available during payment or booking incidents.

## Service responsibilities

| Service | Core capabilities | Data systems |
| --- | --- | --- |
| Auth | JWT, OAuth2, MFA, session risk | Redis, LDAP / IdP |
| Search | Elastic train search, Redis hot cache, Geo DB routing | ElasticSearch, Redis, Geo DB |
| Booking | PostgreSQL ticket writes, Kafka outbox, Saga orchestration | PostgreSQL, Kafka, Redis locks |
| Payment | Razorpay, UPI, wallets, refunds | PostgreSQL ledger, Kafka events |
| PNR | PNR status, charting updates, cache invalidation | Redis, MongoDB |
| Notification | WebSocket, email, SMS, push | Kafka, template store |
| AI | TensorFlow, PyTorch, ONNX inference | Feature store, model registry, vector index |
| Analytics | ClickHouse, Druid, Superset dashboards | Kafka, ClickHouse, Druid |
| User | Profiles, passengers, preferences | PostgreSQL, Redis, LDAP |

## Booking Saga

1. Booking Service receives an idempotent booking command from the API Gateway.
2. Inventory lock is acquired for `trainId + journeyDate + class + quota`.
3. Passenger details and fare snapshot are written to PostgreSQL.
4. Payment Service authorizes Razorpay, UPI, or wallet payment.
5. Booking Service commits ticket issuance or publishes compensation events for timeout/failure.
6. Notification Service fans out SMS, email, WebSocket, and push updates.
7. Analytics and AI Services consume Kafka events for fraud analytics, waitlist prediction, and recommendation feedback.

## Service implementation specs

- `infra/kong/kong.yml` contains concrete Kong service specifications for `/api/v1/search`, `/api/v1/trains`, `/api/v1/booking`, and `/api/v1/ticket` with per-route rate limits, CORS/JWT, and ACL plugins.
- `services/search-service/src/index.ts` provides a Node.js + Express Search Service using ElasticSearch for train queries and Redis Cluster for five-minute cache-aside responses.
- `services/booking-service/main.go` provides a high-performance Go Booking Service using Gin, PostgreSQL connection pooling, serializable transactions, `SELECT ... FOR UPDATE` seat locks, and Kafka booking events.
- `services/ai-service/main.py` provides a Python + FastAPI AI Service with TensorFlow confirmation prediction, joblib recommendations/NLP classification, Redis Cluster prediction caching, and chat intent routing.

## Scaling model for 10 million users

- Search and PNR are read-optimized with Redis edge caches and regional read replicas.
- Booking is write-serialized by shard key to prevent overselling while still scaling across train-date partitions.
- Kafka absorbs spikes between booking, payment, notifications, analytics, and AI model scoring.
- AI inference runs separately from ticket issuance, so model latency cannot block critical booking commits.
