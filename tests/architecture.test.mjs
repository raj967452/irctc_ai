import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

test('UI and backend blueprint include scale critical capabilities', async () => {
  const ui = await readFile('src/main.js', 'utf8');
  assert.match(ui, /10M users/);
  assert.match(ui, /AI Booking Copilot/);
  assert.match(ui, /L7 Load Balancer/);
  assert.match(ui, /Inventory shards/);
});
