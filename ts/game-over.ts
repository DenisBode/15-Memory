import type { Player } from './types.js';
import { getResultText, getWinner } from './game-state.js';
import { playerColor } from './header.js';

/** Theme that labels the home button with "Back to start" instead of "Home". */
const LONG_HOME_LABEL_THEME = 'code-vibes';

/** Time in ms the "Game over" view is shown before the winner appears. */
const WINNER_DELAY_MS = 2500;

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
 * Shows or hides the element with the given id.
 * @param id - Id of the element.
 * @param visible - True to show, false to hide.
 */
function setVisible(id: string, visible: boolean): void {
  const element = document.getElementById(id);
  if (element) element.hidden = !visible;
}

/**
 * Switches the result screen to the winner look and colors it in the winner's color.
 * @param winner - Winning player, or null on a draw.
 */
function colorWinner(winner: Player | null): void {
  const result = document.getElementById('result');
  if (!result) return;
  result.classList.add('result--winner');
  result.classList.toggle('result--draw', winner === null);
  if (winner !== null) result.style.setProperty('--winner-color', playerColor(winner));
}

/**
 * Builds the label of the home button for the active theme.
 * @param theme - Active theme, undefined means the default theme Code Vibes.
 * @returns "Back to start" for Code Vibes, otherwise "Home".
 */
function getHomeLabel(theme: string | undefined): string {
  const isLong = theme === undefined || theme === LONG_HOME_LABEL_THEME;
  return isLong ? 'Back to start' : 'Home';
}

/**
 * Switches from the "Game over" view to the winner view.
 * @param scores - Final points per player.
 */
function showWinner(scores: Record<Player, number>): void {
  const text = getResultText(scores);
  setText('result-label', text.subtitle);
  setText('result-winner-name', text.title);
  colorWinner(getWinner(scores));
  setText('result-home', getHomeLabel(document.documentElement.dataset.theme));
  setVisible('result-game-over', false);
  setVisible('result-winner', true);
}

/**
 * Shows the final score full screen and the winner after a short delay.
 * @param scores - Final points per player.
 */
export function showGameOver(scores: Record<Player, number>): void {
  setText('result-score-1', String(scores[1]));
  setText('result-score-2', String(scores[2]));
  setVisible('result', true);
  setTimeout((): void => showWinner(scores), WINNER_DELAY_MS);
}

/**
 * Connects the new game button of the result screen.
 */
export function setupGameOver(): void {
  document.getElementById('result-restart')?.addEventListener('click', (): void => window.location.reload());
}
