# IRCTC AI

IRCTC AI is a prototype for a high-performance rail booking platform. It includes a Next.js 14 TypeScript frontend, PWA assets, AI-assisted booking UI, and separate backend service specifications for Search, Booking, and AI microservices.

## What is included

- **Frontend:** Next.js 14 Pages Router, TypeScript, SSR/ISR-ready routes, Turbopack scripts, Tailwind CSS, Radix UI, Zustand, React Query, `react-window`, dynamic imports, and Web Worker offload.
- **PWA:** Manifest, service worker registration, offline public-route browsing, background sync hook, push notification hook, and installable app metadata.
- **Backend system:** Kong gateway configs, Node.js + Express Search service, Go Booking service, Python + FastAPI AI service, and backend architecture docs.
- **Docs:** Dedicated frontend performance, PWA, backend system, and microservices architecture guides.
- **Tests:** Node test suite that validates project structure, key components, docs, PWA hooks, and backend service specs.

## Requirements

### Frontend requirements

- Node.js 20 or newer.
- npm 10 or newer.
- Access to the npm registry for dependencies such as `next`, `react`, `@tanstack/react-query`, `zustand`, `@radix-ui/react-dialog`, `react-window`, `tailwindcss`, and `typescript`.

### Optional backend service requirements

Only needed when running the individual backend service prototypes:

- **Search service:** Node.js 20+, npm 10+, ElasticSearch, Redis Cluster.
- **Booking service:** Go 1.22+, PostgreSQL, Kafka.
- **AI service:** Python 3.11+, pip, TensorFlow-compatible runtime, Redis Cluster, model files under `services/ai-service/models/`.
- **Gateway:** Kong 3.x if you want to apply `infra/kong/kong.yml` locally.

## Installation

From the repository root:

```bash
npm install
```

If dependency installation fails with a registry or security-policy error, fix npm registry access first. The frontend build requires the `next` binary from installed dependencies.

## Run the frontend app

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

Important pages:

- `/` - Home with quick search, AI destination suggestions, popular routes, ticker, banners, and lazy login/register modal.
- `/results` - Virtualized train results with AI confirmation badges and simulated live seat availability.
- `/booking` - Passenger details, OCR placeholder, behavioral verification copy, fare calculation, catering, insurance, and countdown timer.
- `/ai-assistant/chat` - Conversational assistant surface with voice and multilingual affordances.
- `/pnr-status`, `/live-train`, `/schedule`, `/fare`, `/stations`, `/cancellation`, `/chart-prep` - Supporting IRCTC flows.

## Build the frontend

```bash
npm run build
npm start
```

`npm run build` uses the project script `next build --turbo`. It will fail if dependencies were not installed successfully.

## Run tests

```bash
npm test
```

The test suite runs `node --test tests/*.test.mjs` and validates:

- Required Next.js pages exist.
- Home, results, booking, and AI assistant feature components are present.
- Zustand persisted booking store and React Query optimistic API client are wired.
- PWA and backend documentation are kept separate.
- Kong, Search, Booking, and AI service specifications include expected routes and implementation patterns.

## Run backend service prototypes

### Search service

```bash
cd services/search-service
npm install
npm run dev
```

Expected supporting services:

- ElasticSearch at `http://es-cluster:9200` or `ELASTICSEARCH_URL`.
- Redis Cluster at `redis-cluster:6379` or `REDIS_HOST` / `REDIS_PORT`.

### Booking service

```bash
cd services/booking-service
go mod download
go run main.go
```

Expected supporting services:

- PostgreSQL reachable at `postgres://user:pass@db-cluster:5432/bookings?sslmode=disable`.
- Kafka reachable at `kafka-cluster:9092`.

### AI service

```bash
cd services/ai-service
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 3000
```

Expected model files:

- `services/ai-service/models/confirmation_predictor.h5`
- `services/ai-service/models/recommendation_engine.pkl`
- `services/ai-service/models/nlp_classifier.pkl`

## Gateway configuration

Kong examples are provided in:

- `infra/kong/kong.yml` - concrete v1 Search, Booking, and AI service routes with plugins.
- `infra/kong/routes.yaml` - broader service routing map for the full backend architecture.

Apply with your Kong workflow, for example:

```bash
kong config db_import infra/kong/kong.yml
```

## Documentation map

- `docs/performance-optimizations.md` - frontend edge rendering, code splitting, assets, and speed guidance.
- `docs/pwa-strategy.md` - PWA-only guidance for manifest, service worker, offline browsing, sync, and push.
- `docs/backend-system.md` - backend-only guidance for gateway, services, runtime ownership, and authoritative APIs.
- `docs/microservices-architecture.md` - detailed service diagram, responsibilities, Saga flow, and 10M-user scale model.

## Repository notes

- PWA and backend concerns are intentionally separate. The PWA may show cached public snapshots, but booking, payment, and PNR truth must come from backend APIs.
- This is a prototype. External services, databases, Kafka topics, model files, secrets, and production deployment manifests must be supplied before production use.
