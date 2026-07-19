# Performance optimizations

## Edge rendering

- Deploy Next.js on Vercel Edge Network or Cloudflare Workers for edge SSR.
- Use ISR with 60-second revalidation for semi-static pages such as schedules, stations, fares, and chart preparation.
- Target 50-100ms global response time for cached and edge-rendered reads.

## Code splitting strategy

- Route-level splitting uses `next/dynamic` with SSR enabled for booking flows.
- Component-level splitting uses React `lazy` and `Suspense` for expensive widgets such as seat selection.
- Skeleton fallbacks preserve perceived performance during chunk loading.

## Asset optimization

- Next image configuration permits AVIF and WebP formats.
- Self-hosted font strategy should use `font-display: swap` and subset fonts per script.
- Critical CSS is kept in the app shell; non-critical UI is isolated behind dynamic chunks.
- JavaScript remains tree-shakable through ES modules, Turbopack, minification, Brotli compression at the edge, and route-based bundles.

## PWA

- Offline capability for browsing trains and public lookup pages.
- Background sync hook for booking status refresh.
- Push notification hook for PNR updates.
- Install prompt support through the web app manifest.
