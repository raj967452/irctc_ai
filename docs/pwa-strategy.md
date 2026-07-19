# PWA strategy

This document is intentionally scoped only to browser/PWA behavior. Backend services, databases, queues, and gateway routing are documented separately in `docs/backend-system.md` and `docs/microservices-architecture.md`.

## Installable application

- `public/manifest.webmanifest` defines the app name, theme color, standalone display mode, start URL, and install icon.
- `pages/_app.tsx` registers the manifest and loads `public/register-sw.js` after the page is interactive.

## Offline browsing

- `public/sw.js` precaches safe public routes for train browsing, search, results, PNR, live train, schedule, stations, and fare lookup.
- The service worker uses a cache-first GET handler so previously opened public pages remain available during connectivity loss.

## Background sync

- The `booking-status-sync` tag refreshes lightweight booking status when the browser regains connectivity.
- Sync only calls the health/status surface; ticket writes remain server-authoritative and idempotent in backend services.

## Push notifications

- Push notifications surface PNR and journey updates to installed clients.
- Notification fanout and SMS/email delivery are backend responsibilities and are not coupled to the PWA cache.
