import type { Player } from './types.js';

export function playerColor(player: Player): string {
  return `var(--player-${player}-color)`;
}

function getScoreElement(player: Player): HTMLElement | null {
  return document.getElementById(player === 1 ? 'score' : 'score2');
}

export function renderScores(scores: Record<Player, number>): void {
  for (const player of [1, 2] as const) {
    const element = getScoreElement(player);
    if (element) element.textContent = String(scores[player]);
  }
}

export function setCurrentPlayer(player: Player): void {
  const icon = document.getElementById('current-player-icon');
  if (!icon) return;
  icon.style.setProperty('--player-icon-bg', playerColor(player));
}
