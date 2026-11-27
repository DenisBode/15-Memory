import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pickStartPlayer, getOwnPlayer } from '../players.ts';

test('kleiner Zufallswert ergibt Spieler 1', () => {
  assert.equal(pickStartPlayer(() => 0.2), 1);
});

test('großer Zufallswert ergibt Spieler 2', () => {
  assert.equal(pickStartPlayer(() => 0.8), 2);
});

test('Grenze 0.5 ergibt Spieler 2', () => {
  assert.equal(pickStartPlayer(() => 0.5), 2);
});

test('Farbe blue gehört zu Spieler 1', () => {
  assert.equal(getOwnPlayer('blue'), 1);
});

test('Farbe orange gehört zu Spieler 2', () => {
  assert.equal(getOwnPlayer('orange'), 2);
});
