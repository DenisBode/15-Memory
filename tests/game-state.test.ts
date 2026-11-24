import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createGameState, switchPlayer, addPoint, getNextPlayer } from '../game-state.ts';

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
