import { getResultText, getWinner } from './game-state.js';
import { playerColor } from './header.js';
/** Time in ms the "Game over" view is shown before the winner appears. */
const WINNER_DELAY_MS = 2500;
/**
 * Writes a text into the element with the given id.
 * @param id - Id of the element.
 * @param text - Text to show.
 */
function setText(id, text) {
    const element = document.getElementById(id);
    if (element)
        element.textContent = text;
}
/**
 * Shows or hides the element with the given id.
 * @param id - Id of the element.
 * @param visible - True to show, false to hide.
 */
function setVisible(id, visible) {
    const element = document.getElementById(id);
    if (element)
        element.hidden = !visible;
}
/**
 * Colors winner name and player icon in the winner's color, or hides the icon on a draw.
 * @param winner - Winning player, or null on a draw.
 */
function colorWinner(winner) {
    const result = document.getElementById('result');
    setVisible('result-player-icon', winner !== null);
    if (!result || winner === null)
        return;
    result.style.setProperty('--winner-color', playerColor(winner));
    result.style.setProperty('--player-icon-bg', playerColor(winner));
}
/**
 * Switches from the "Game over" view to the winner view.
 * @param scores - Final points per player.
 */
function showWinner(scores) {
    const text = getResultText(scores);
    setText('result-label', text.subtitle);
    setText('result-winner-name', text.title);
    colorWinner(getWinner(scores));
    setVisible('result-game-over', false);
    setVisible('result-winner', true);
}
/**
 * Shows the final score full screen and the winner after a short delay.
 * @param scores - Final points per player.
 */
export function showGameOver(scores) {
    setText('result-score-1', String(scores[1]));
    setText('result-score-2', String(scores[2]));
    setVisible('result', true);
    setTimeout(() => showWinner(scores), WINNER_DELAY_MS);
}
/**
 * Connects the new game button of the result screen.
 */
export function setupGameOver() {
    document.getElementById('result-restart')?.addEventListener('click', () => window.location.reload());
}
