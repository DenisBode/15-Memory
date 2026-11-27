import type { Player } from './types.js';

/**
 * Builds the CSS color value of a player from the theme variables.
 * @param player - Player number.
 * @returns CSS value, e.g. 'var(--player-1-color)'.
 */
export function playerColor(player: Player): string {
  return `var(--player-${player}-color)`;
}

/**
 * Finds the score element of a player in the header.
 * @param player - Player number.
 * @returns The score element, or null if it is missing.
 */
function getScoreElement(player: Player): HTMLElement | null {
  return document.getElementById(player === 1 ? 'score' : 'score2');
}

/**
 * Shows the points of both players in the header.
 * @param scores - Points per player.
 */
export function renderScores(scores: Record<Player, number>): void {
  for (const player of [1, 2] as const) {
    const element = getScoreElement(player);
    if (element) element.textContent = String(scores[player]);
  }
}

/**
 * Colors the current player icon in the color of the given player.
 * @param player - Player whose turn it is.
 */
export function setCurrentPlayer(player: Player): void {
  const icon = document.getElementById('current-player-icon');
  if (!icon) return;
  icon.style.setProperty('--player-icon-bg', playerColor(player));
}

/**
 * Marks the score of the own player in the header with "(You)".
 * @param player - Player whose color was chosen in the settings.
 */
export function markOwnPlayer(player: Player): void {
  const score = getScoreElement(player)?.closest('.game-header__score');
  score?.classList.add('game-header__score--own');
}
