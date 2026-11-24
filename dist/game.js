import { getGridTemplate } from './grid.js';
import { getBackImagePath, getFaceImagePath } from './cards.js';
import { pickStartPlayer, getNextPlayer } from './players.js';
import { dealCards } from './deck.js';
const STORAGE_KEY = 'memorySettings';
const SETTINGS_PAGE = 'settings.html';
function readSettings() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null)
        return null;
    return JSON.parse(raw);
}
function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
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
const HIDE_DELAY_MS = 1000;
let openCards = [];
let currentPlayer = 1;
let scores = { 1: 0, 2: 0 };
function setCardFlipped(card, flipped) {
    card.classList.toggle('card--flipped', flipped);
}
function isMatch(first, second) {
    return first.dataset.pair === second.dataset.pair;
}
function hideCards(first, second) {
    setCardFlipped(first, false);
    setCardFlipped(second, false);
}
function getScoreElement(player) {
    return document.getElementById(player === 1 ? 'score' : 'score2');
}
function renderScore(player) {
    const element = getScoreElement(player);
    if (element)
        element.textContent = String(scores[player]);
}
function incrementScore(player) {
    scores[player] += 1;
    renderScore(player);
}
function setFrame(cards, player) {
    for (const card of cards) {
        card.style.setProperty('--card-frame', getPlayerColor(player));
    }
}
function checkOpenCards() {
    const [first, second] = openCards;
    if (isMatch(first, second)) {
        setFrame(openCards, currentPlayer);
        incrementScore(currentPlayer);
        openCards = [];
        return;
    }
    setTimeout(() => {
        hideCards(first, second);
        openCards = [];
        changePlayer();
    }, HIDE_DELAY_MS);
}
function flipCard(card) {
    if (card.classList.contains('card--flipped') || openCards.length === 2)
        return;
    setCardFlipped(card, true);
    openCards.push(card);
    if (openCards.length === 2)
        checkOpenCards();
}
function createFace(className, image) {
    const face = document.createElement('div');
    face.className = `card__face ${className}`;
    face.style.backgroundImage = `url("${image}")`;
    return face;
}
function createCard(theme, pairId) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.pair = String(pairId);
    const inner = document.createElement('div');
    inner.className = 'card__inner';
    inner.append(createFace('card__face--back', getBackImagePath(theme)), createFace('card__face--front', getFaceImagePath(theme, pairId)));
    card.appendChild(inner);
    card.addEventListener('click', () => flipCard(card));
    return card;
}
function renderBoard(settings) {
    const board = getBoard();
    if (!board)
        return;
    clearBoard(board);
    setGridColumns(board, settings.board);
    for (const pairId of dealCards(settings.board)) {
        board.appendChild(createCard(settings.theme, pairId));
    }
}
function getCurrentPlayerIcon() {
    return document.getElementById('current-player-icon');
}
function getPlayerColor(player) {
    return `var(--player-${player}-color)`;
}
function setCurrentPlayerIconColor(player) {
    const icon = getCurrentPlayerIcon();
    if (!icon)
        return;
    icon.style.setProperty('--player-icon-bg', getPlayerColor(player));
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
function showStartingPlayer() {
    currentPlayer = pickStartPlayer();
    setCurrentPlayerIconColor(currentPlayer);
}
function changePlayer() {
    currentPlayer = getNextPlayer(currentPlayer);
    setCurrentPlayerIconColor(currentPlayer);
}
const settings = readSettings();
if (settings) {
    applyTheme(settings.theme);
    renderBoard(settings);
}
setupExitDialog();
showStartingPlayer();
renderScore(1);
renderScore(2);
