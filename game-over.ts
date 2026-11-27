import type { Player } from './types.js';
import { getResultText } from './game-state.js';

/**
 * Finds the game over dialog.
 * @returns The dialog, or null if it is missing.
 */
function getGameOverDialog(): HTMLDialogElement | null {
  return document.getElementById('game-over') as HTMLDialogElement | null;
}

/**
 * Writes a text into the element with the given id.
 * @param id - Id of the element.
 * @param text - Text to show.
 */
function setText(id: string, text: string): void {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
}

/**
 * Fills the game over dialog with winner and scores and opens it.
 * @param scores - Final points per player.
 */
export function showGameOver(scores: Record<Player, number>): void {
  const result = getResultText(scores);
  setText('game-over-subtitle', result.subtitle);
  setText('game-over-title', result.title);
  setText('game-over-score-1', String(scores[1]));
  setText('game-over-score-2', String(scores[2]));
  getGameOverDialog()?.showModal();
}

/**
 * Blocks closing the dialog with Escape and connects the new game button.
 */
export function setupGameOver(): void {
  getGameOverDialog()?.addEventListener('cancel', (event) => event.preventDefault());
  document.getElementById('game-over-restart')?.addEventListener('click', () => window.location.reload());
}
