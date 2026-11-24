import { createGameState, switchPlayer, addPoint } from './game-state.js';
import { pickStartPlayer } from './players.js';
import { renderBoard, isFlipped, setCardFlipped, hideCards, isSamePair, setFrame } from './board.js';
import { renderScores, setCurrentPlayer } from './header.js';
import { setupExitDialog } from './dialog.js';
const STORAGE_KEY = 'memorySettings';
const SETTINGS_PAGE = 'settings.html';
const HIDE_DELAY_MS = 1000;
let state = createGameState(pickStartPlayer());
let openCards = [];
function readSettings() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null)
        return null;
    return JSON.parse(raw);
}
function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
}
function exitGame() {
    window.location.href = SETTINGS_PAGE;
}
function handleMatch() {
    setFrame(openCards, state.currentPlayer);
    state = addPoint(state);
    renderScores(state.scores);
    openCards = [];
}
function handleMismatch(first, second) {
    setTimeout(() => {
        hideCards(first, second);
        openCards = [];
        state = switchPlayer(state);
        setCurrentPlayer(state.currentPlayer);
    }, HIDE_DELAY_MS);
}
function checkOpenCards() {
    const [first, second] = openCards;
    if (isSamePair(first, second)) {
        handleMatch();
    }
    else {
        handleMismatch(first, second);
    }
}
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
    applyTheme(settings.theme);
    renderBoard(settings, flipCard);
}
setupExitDialog(exitGame);
setCurrentPlayer(state.currentPlayer);
renderScores(state.scores);
