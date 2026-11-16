import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getBackImagePath } from '../cards.ts';

test('Rückseite für code-vibes liegt unter assets/cards/back', () => {
  assert.equal(getBackImagePath('code-vibes'), 'assets/cards/back/code-vibes.png');
});

test('Rückseite für da-projects liegt unter assets/cards/back', () => {
  assert.equal(getBackImagePath('da-projects'), 'assets/cards/back/da-projects.png');
});
