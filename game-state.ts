import type { Player } from './types.js';

export interface GameState {
  currentPlayer: Player;
  scores: Record<Player, number>;
}

export interface ResultText {
  subtitle: string;
  title: string;
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

export function isGameOver(state: GameState, totalPairs: number): boolean {
  return state.scores[1] + state.scores[2] === totalPairs;
}

export function getWinner(scores: Record<Player, number>): Player | null {
  if (scores[1] === scores[2]) return null;
  return scores[1] > scores[2] ? 1 : 2;
}

export function getResultText(scores: Record<Player, number>): ResultText {
  const winner = getWinner(scores);
  if (winner === null) return { subtitle: "It's a", title: 'Draw' };
  return { subtitle: 'The winner is', title: `Player ${winner}` };
}
