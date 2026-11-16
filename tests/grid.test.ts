import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getColumnCount, getGridTemplate } from '../grid.ts';

test('16 Karten ergeben 4 Spalten', () => {
  assert.equal(getColumnCount(16), 4);
});

test('24 Karten ergeben 6 Spalten', () => {
  assert.equal(getColumnCount(24), 6);
});

test('36 Karten ergeben 6 Spalten', () => {
  assert.equal(getColumnCount(36), 6);
});

test('unbekannte Board-Größe wirft einen Fehler', () => {
  assert.throws(() => getColumnCount(20), /Unbekannte Board-Größe: 20/);
});

test('getGridTemplate formatiert 16 Karten als repeat(4, 1fr)', () => {
  assert.equal(getGridTemplate(16), 'repeat(4, 1fr)');
});

test('getGridTemplate formatiert 24 Karten als repeat(6, 1fr)', () => {
  assert.equal(getGridTemplate(24), 'repeat(6, 1fr)');
});
