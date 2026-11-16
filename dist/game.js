import { getGridTemplate } from './grid.js';
import { getBackImagePath } from './cards.js';
const STORAGE_KEY = 'memorySettings';
const SETTINGS_PAGE = 'settings.html';
function readSettings() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null)
        return null;
    return JSON.parse(raw);
}
function getBoard() {
    return document.getElementById('game-board');
}
function clearBoard(board) {
    board.replaceChildren();
}
function setGridColumns(board, cardCount) {
    board.style.gridTemplateColumns = getGridTemplate(cardCount);
}
function createCard(theme) {
    const card = document.createElement('div');
    card.className = `card card--${theme}`;
    card.style.backgroundImage = `url("${getBackImagePath(theme)}")`;
    return card;
}
function renderBoard(settings) {
    const board = getBoard();
    if (!board)
        return;
    clearBoard(board);
    setGridColumns(board, settings.board);
    for (let i = 0; i < settings.board; i++) {
        board.appendChild(createCard(settings.theme));
    }
}
function exitGame() {
    window.location.href = SETTINGS_PAGE;
}
function getExitDialog() {
    return document.getElementById('exit-dialog');
}
function openExitDialog() {
    getExitDialog()?.showModal();
}
function closeExitDialog() {
    getExitDialog()?.close();
}
function setupExitDialog() {
    document.querySelector('.game-header__exit')?.addEventListener('click', openExitDialog);
    document.getElementById('exit-dialog-back')?.addEventListener('click', closeExitDialog);
    document.getElementById('exit-dialog-exit')?.addEventListener('click', exitGame);
}
const settings = readSettings();
if (settings)
    renderBoard(settings);
setupExitDialog();
