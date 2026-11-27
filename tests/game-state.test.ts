import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createGameState, switchPlayer, addPoint, getNextPlayer, isGameOver, getWinner, getResultText } from '../game-state.ts';

test('nach Spieler 1 kommt Spieler 2 und umgekehrt', () => {
  assert.equal(getNextPlayer(1), 2);
  assert.equal(getNextPlayer(2), 1);
});

test('neues Spiel startet mit 0 Punkten für beide', () => {
  assert.deepEqual(createGameState(1).scores, { 1: 0, 2: 0 });
});

test('neues Spiel übernimmt den Startspieler', () => {
  assert.equal(createGameState(2).currentPlayer, 2);
});

test('switchPlayer wechselt den Spieler', () => {
  assert.equal(switchPlayer(createGameState(1)).currentPlayer, 2);
  assert.equal(switchPlayer(createGameState(2)).currentPlayer, 1);
});

test('addPoint gibt dem aktiven Spieler einen Punkt', () => {
  const state = addPoint(createGameState(2));
  assert.deepEqual(state.scores, { 1: 0, 2: 1 });
});

test('addPoint verändert den übergebenen Zustand nicht', () => {
  const start = createGameState(1);
  addPoint(start);
  assert.deepEqual(start.scores, { 1: 0, 2: 0 });
});

test('Spiel ist vorbei, wenn alle Paare gefunden sind', () => {
  const state = { currentPlayer: 1 as const, scores: { 1: 5, 2: 3 } };
  assert.equal(isGameOver(state, 8), true);
});

test('Spiel läuft weiter, solange Paare fehlen', () => {
  const state = { currentPlayer: 1 as const, scores: { 1: 2, 2: 3 } };
  assert.equal(isGameOver(state, 8), false);
});

test('Spieler mit mehr Punkten gewinnt', () => {
  assert.equal(getWinner({ 1: 5, 2: 3 }), 1);
  assert.equal(getWinner({ 1: 2, 2: 6 }), 2);
});

test('bei Gleichstand gibt es keinen Gewinner', () => {
  assert.equal(getWinner({ 1: 4, 2: 4 }), null);
});

test('Ergebnistext nennt den Gewinner', () => {
  assert.deepEqual(getResultText({ 1: 3, 2: 5 }), { subtitle: 'The winner is', title: 'Orange Player' });
});

test('Ergebnistext bei Gleichstand', () => {
  assert.deepEqual(getResultText({ 1: 4, 2: 4 }), { subtitle: "It's a", title: 'Draw' });
});
