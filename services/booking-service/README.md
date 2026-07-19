# Booking Service

High-performance Go booking service using Gin, PostgreSQL serializable transactions, `SELECT ... FOR UPDATE` seat locking, and Kafka `booking-events` publication.

## Endpoints

- `POST /api/v1/booking/create`
- `GET /api/v1/booking/:pnr`
- `GET /health`
