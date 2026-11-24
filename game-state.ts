import type { Player } from './types.js';

export interface GameState {
  currentPlayer: Player;
  scores: Record<Player, number>;
}

export function getNextPlayer(player: Player): Player {
  return player === 1 ? 2 : 1;
}

export function createGameState(startPlayer: Player): GameState {
  return { currentPlayer: startPlayer, scores: { 1: 0, 2: 0 } };
}

export function switchPlayer(state: GameState): GameState {
  return { ...state, currentPlayer: getNextPlayer(state.currentPlayer) };
}

export function addPoint(state: GameState): GameState {
  const scores = { ...state.scores };
  scores[state.currentPlayer] += 1;
  return { ...state, scores };
}
