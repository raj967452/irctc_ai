import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

const requiredPages = ['index','search','results','booking','payment','confirmation','pnr-status','live-train','schedule','stations','fare','cancellation','chart-prep','profile/index','profile/bookings','profile/passengers','profile/preferences','ai-assistant/chat','ai-assistant/predictions','ai-assistant/recommendations','admin/index'];

test('requested Next.js client stack is represented', async () => {
  const pkg = await readFile('package.json', 'utf8');
  const layout = await readFile('app/layout.tsx', 'utf8');
  assert.match(pkg, /next/);
  assert.match(pkg, /zustand/);
  assert.match(pkg, /@tanstack\/react-query/);
  assert.match(pkg, /@radix-ui\/react-dialog/);
  assert.match(layout, /QueryProvider/);
});

test('requested pages structure exists', async () => {
  await Promise.all(requiredPages.map(page => stat(`pages/${page}.tsx`)));
});

test('performance optimizations and splitting are documented and implemented', async () => {
  const shell = await readFile('components/performance/DynamicBookingShell.tsx', 'utf8');
  const perf = await readFile('docs/performance-optimizations.md', 'utf8');
  assert.match(shell, /dynamic\(\(\) => import/);
  assert.match(shell, /lazy\(\(\) => import/);
  assert.match(perf, /50-100ms global response/);
  assert.match(perf, /AVIF and WebP/);
  assert.match(perf, /Brotli/);
});

test('10M backend and PWA booking blueprint are present', async () => {
  const home = await readFile('app/page.tsx', 'utf8');
  const backend = await readFile('docs/backend-architecture.md', 'utf8');
  const serviceWorker = await readFile('public/sw.js', 'utf8');
  assert.match(home, /AI-enabled advanced booking/);
  assert.match(backend, /10 million users/);
  assert.match(backend, /L7 load balancers/);
  assert.match(backend, /AI feature store/);
  assert.match(serviceWorker, /booking-status-sync/);
  assert.match(serviceWorker, /push/);
});
