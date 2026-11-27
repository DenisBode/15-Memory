import { createGameState, switchPlayer, addPoint, isGameOver } from './game-state.js';
import { pickStartPlayer, getOwnPlayer } from './players.js';
import { renderBoard, isFlipped, setCardFlipped, hideCards, isSamePair, setFrame } from './board.js';
import { renderScores, setCurrentPlayer, markOwnPlayer } from './header.js';
import { setupExitDialog } from './dialog.js';
import { showGameOver, setupGameOver } from './game-over.js';
/** localStorage key of the saved settings. */
const STORAGE_KEY = 'memorySettings';
/** Page opened when the player leaves the game. */
const SETTINGS_PAGE = 'settings.html';
/** Time in ms before two different cards are turned back. */
const HIDE_DELAY_MS = 1200;
/** Time in ms between the last pair and the game over screen. */
const FINISH_DELAY_MS = 1200;
/** Current player and scores. */
let state = createGameState(pickStartPlayer());
/** Cards that are currently turned up, at most two. */
let openCards = [];
/** Number of pairs on the board. */
let totalPairs = 0;
/**
 * Reads the settings saved by the settings page.
 * @returns The settings, or null if none are saved.
 */
function readSettings() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null)
        return null;
    return JSON.parse(raw);
}
/**
 * Activates the theme colors on the page.
 * @param theme - Theme name, e.g. 'code-vibes'.
 */
function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
}
/**
 * Leaves the game and opens the settings page.
 */
function exitGame() {
    window.location.href = SETTINGS_PAGE;
}
/**
 * Shows the game over screen after a short delay once all pairs are found.
 */
function checkGameOver() {
    if (!isGameOver(state, totalPairs))
        return;
    setTimeout(() => showGameOver(state.scores), FINISH_DELAY_MS);
}
/**
 * Handles a found pair: frame, point for the current player, game over check.
 */
function handleMatch() {
    setFrame(openCards, state.currentPlayer);
    state = addPoint(state);
    renderScores(state.scores);
    openCards = [];
    checkGameOver();
}
/**
 * Turns two different cards back after a delay and passes the turn.
 * @param first - First open card.
 * @param second - Second open card.
 */
function handleMismatch(first, second) {
    setTimeout(() => {
        hideCards(first, second);
        openCards = [];
        state = switchPlayer(state);
        setCurrentPlayer(state.currentPlayer);
    }, HIDE_DELAY_MS);
}
/**
 * Compares the two open cards and handles a match or a mismatch.
 */
function checkOpenCards() {
    const [first, second] = openCards;
    if (isSamePair(first, second)) {
        handleMatch();
    }
    else {
        handleMismatch(first, second);
    }
}
/**
 * Turns up a clicked card if it is allowed and checks the pair after the second card.
 * @param card - Clicked card.
 */
function flipCard(card) {
    if (isFlipped(card) || openCards.length === 2)
        return;
    setCardFlipped(card, true);
    openCards.push(card);
    if (openCards.length === 2)
        checkOpenCards();
}
const settings = readSettings();
if (settings) {
    totalPairs = settings.board / 2;
    applyTheme(settings.theme);
    markOwnPlayer(getOwnPlayer(settings.player));
    renderBoard(settings, flipCard);
}
setupExitDialog(exitGame);
setupGameOver();
setCurrentPlayer(state.currentPlayer);
renderScores(state.scores);
