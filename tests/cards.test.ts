import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getBackImagePath, getPreviewImagePath } from '../cards.ts';

test('Rückseite für code-vibes liegt unter assets/cards/back', () => {
  assert.equal(getBackImagePath('code-vibes'), 'assets/cards/back/code-vibes.png');
});

test('Rückseite für da-projects liegt unter assets/cards/back', () => {
  assert.equal(getBackImagePath('da-projects'), 'assets/cards/back/da-projects.png');
});

test('Vorschau für code-vibes', () => {
  assert.equal(getPreviewImagePath('code-vibes'), 'assets/previews/code_vibes_preview.png');
});

test('Vorschau für da-projects', () => {
  assert.equal(getPreviewImagePath('da-projects'), 'assets/previews/DA_projects_preview.png');
});

test('Vorschau für foods', () => {
  assert.equal(getPreviewImagePath('foods'), 'assets/previews/food_preview.png');
});

test('unbekanntes Theme wirft einen Fehler', () => {
  assert.throws(() => getPreviewImagePath('unknown'), /Kein Vorschau-Bild/);
});
