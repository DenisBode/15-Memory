import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getBackImagePath, getPreviewImagePath, getFaceImagePath } from '../cards.ts';

test('Rückseite für code-vibes liegt unter assets/cards/back', () => {
  assert.equal(getBackImagePath('code-vibes'), 'assets/cards/back/code-vibes.png');
});

test('Rückseite für da-projects liegt unter assets/cards/back', () => {
  assert.equal(getBackImagePath('da-projects'), 'assets/cards/back/da-projects.png');
});

test('Vorschau für code-vibes', () => {
  assert.equal(getPreviewImagePath('code-vibes'), 'assets/previews/code-vibes.png');
});

test('Vorschau für da-projects', () => {
  assert.equal(getPreviewImagePath('da-projects'), 'assets/previews/da-projects.png');
});

test('Vorschau für foods', () => {
  assert.equal(getPreviewImagePath('foods'), 'assets/previews/foods.png');
});

test('unbekanntes Theme wirft einen Fehler', () => {
  assert.throws(() => getPreviewImagePath('unknown'), /Kein Vorschau-Bild/);
});

test('Vorderseite für Paar 1 hat zweistellige Nummer', () => {
  assert.equal(getFaceImagePath('code-vibes', 1), 'assets/cards/faces/code-vibes-01.png');
});

test('Vorderseite für Paar 18', () => {
  assert.equal(getFaceImagePath('code-vibes', 18), 'assets/cards/faces/code-vibes-18.png');
});
