import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

const requiredPages = ['index','search','results','booking','payment','confirmation','pnr-status','live-train','schedule','stations','fare','cancellation','chart-prep','profile/index','profile/bookings','profile/passengers','profile/preferences','ai-assistant/chat','ai-assistant/predictions','ai-assistant/recommendations','admin/index'];

test('requested Next.js client stack is represented', async () => {
  const pkg = await readFile('package.json', 'utf8');
  const app = await readFile('pages/_app.tsx', 'utf8');
  assert.match(pkg, /next/);
  assert.match(pkg, /zustand/);
  assert.match(pkg, /react-window/);
  assert.match(pkg, /@tanstack\/react-query/);
  assert.match(pkg, /@radix-ui\/react-dialog/);
  assert.match(app, /QueryProvider/);
  assert.match(app, /manifest.webmanifest/);
});

test('requested pages structure exists', async () => {
  await Promise.all(requiredPages.map(page => stat(`pages/${page}.tsx`)));
});

test('core home, results, booking, and assistant features are represented', async () => {
  const home = await readFile('components/home/HomeExperience.tsx', 'utf8');
  const results = await readFile('components/results/ResultsExperience.tsx', 'utf8');
  const booking = await readFile('components/booking/BookingExperience.tsx', 'utf8');
  const assistant = await readFile('components/assistant/AIAssistantExperience.tsx', 'utf8');
  assert.match(home, /QuickSearchWidget/);
  assert.match(home, /Real-time train status ticker/);
  assert.match(results, /VirtualizedList/);
  assert.match(results, /AI confirmation/);
  assert.match(booking, /OCR for ID card scanning/);
  assert.match(booking, /CAPTCHA-less verification/);
  assert.match(assistant, /Voice input support/);
  assert.match(assistant, /12 Indian languages/);
});

test('persisted booking store and optimistic API client are implemented', async () => {
  const store = await readFile('store/useBookingStore.ts', 'utf8');
  const api = await readFile('lib/api-client.ts', 'utf8');
  assert.match(store, /persist/);
  assert.match(store, /setSearchParams/);
  assert.match(store, /selectTrain/);
  assert.match(store, /addPassenger/);
  assert.match(api, /cancelQueries/);
  assert.match(api, /setQueryData/);
  assert.match(api, /invalidateQueries/);
});

test('performance optimizations and PWA booking blueprint are present', async () => {
  const shell = await readFile('components/performance/DynamicBookingShell.tsx', 'utf8');
  const perf = await readFile('docs/performance-optimizations.md', 'utf8');
  const serviceWorker = await readFile('public/sw.js', 'utf8');
  assert.match(shell, /dynamic\(\(\) => import/);
  assert.match(shell, /lazy\(\(\) => import/);
  assert.match(perf, /50-100ms global response/);
  assert.match(perf, /AVIF and WebP/);
  assert.match(perf, /Brotli/);
  assert.match(serviceWorker, /booking-status-sync/);
  assert.match(serviceWorker, /push/);
});
