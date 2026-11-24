import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createPairIds, shuffle, dealCards } from '../deck.ts';

test('createPairIds erzeugt für 4 Karten zwei Paare', () => {
  assert.deepEqual(createPairIds(4), [1, 1, 2, 2]);
});

test('createPairIds erzeugt für 16 Karten 8 Paare', () => {
  const ids = createPairIds(16);
  assert.equal(ids.length, 16);
  assert.equal(new Set(ids).size, 8);
});

test('shuffle behält alle Elemente', () => {
  const result = shuffle([1, 2, 3, 4, 5]);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4, 5]);
});

test('shuffle verändert das Original nicht', () => {
  const original = [1, 2, 3];
  shuffle(original);
  assert.deepEqual(original, [1, 2, 3]);
});

test('dealCards hat jedes Paar genau zweimal', () => {
  const ids = dealCards(16, () => 0.3);
  for (let pair = 1; pair <= 8; pair++) {
    assert.equal(ids.filter((id) => id === pair).length, 2);
  }
});
