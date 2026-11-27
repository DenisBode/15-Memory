import type { Player } from './types.js';

/** Display names of the players on the result screen. */
const PLAYER_NAMES: Record<Player, string> = { 1: 'Blue Player', 2: 'Orange Player' };

/**
 * Current state of a running game.
 */
export interface GameState {
  /** Player whose turn it is. */
  currentPlayer: Player;
  /** Found pairs per player. */
  scores: Record<Player, number>;
}

/**
 * Texts shown on the game over screen.
 */
export interface ResultText {
  /** Small line above the title, e.g. 'The winner is'. */
  subtitle: string;
  /** Main line, e.g. 'Player 1' or 'Draw'. */
  title: string;
}

/**
 * Returns the other player.
 * @param player - Current player.
 * @returns The opponent of the given player.
 */
export function getNextPlayer(player: Player): Player {
  return player === 1 ? 2 : 1;
}

/**
 * Creates the state for a new game with zero points.
 * @param startPlayer - Player who starts.
 * @returns Fresh game state.
 */
export function createGameState(startPlayer: Player): GameState {
  return { currentPlayer: startPlayer, scores: { 1: 0, 2: 0 } };
}

/**
 * Passes the turn to the other player.
 * @param state - Current game state.
 * @returns New state with the other player on turn.
 */
export function switchPlayer(state: GameState): GameState {
  return { ...state, currentPlayer: getNextPlayer(state.currentPlayer) };
}

/**
 * Gives the current player one point for a found pair.
 * @param state - Current game state.
 * @returns New state with the updated score.
 */
export function addPoint(state: GameState): GameState {
  const scores = { ...state.scores };
  scores[state.currentPlayer] += 1;
  return { ...state, scores };
}

/**
 * Checks whether all pairs have been found.
 * @param state - Current game state.
 * @param totalPairs - Number of pairs on the board.
 * @returns True if the game is over.
 */
export function isGameOver(state: GameState, totalPairs: number): boolean {
  return state.scores[1] + state.scores[2] === totalPairs;
}

/**
 * Determines the player with the most points.
 * @param scores - Points per player.
 * @returns The winning player, or null on a draw.
 */
export function getWinner(scores: Record<Player, number>): Player | null {
  if (scores[1] === scores[2]) return null;
  return scores[1] > scores[2] ? 1 : 2;
}

/**
 * Builds the texts for the game over screen.
 * @param scores - Points per player.
 * @returns Subtitle and title for a win or a draw.
 */
export function getResultText(scores: Record<Player, number>): ResultText {
  const winner = getWinner(scores);
  if (winner === null) return { subtitle: "It's a", title: 'Draw' };
  return { subtitle: 'The winner is', title: PLAYER_NAMES[winner] };
}
