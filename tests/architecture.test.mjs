import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

test('requested Next.js client stack is represented', async () => {
  const pkg = await readFile('package.json', 'utf8');
  const layout = await readFile('app/layout.tsx', 'utf8');
  assert.match(pkg, /next/);
  assert.match(pkg, /zustand/);
  assert.match(pkg, /@tanstack\/react-query/);
  assert.match(pkg, /@radix-ui\/react-dialog/);
  assert.match(layout, /QueryProvider/);
});

test('10M backend and AI booking blueprint are present', async () => {
  const home = await readFile('app/page.tsx', 'utf8');
  const backend = await readFile('docs/backend-architecture.md', 'utf8');
  assert.match(home, /AI-enabled advanced booking/);
  assert.match(backend, /10 million users/);
  assert.match(backend, /L7 load balancers/);
  assert.match(backend, /AI feature store/);
});
