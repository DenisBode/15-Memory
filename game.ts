import type { GameSettings } from './types';
import { getGridTemplate } from './grid.js';
import { getBackImagePath, getFaceImagePath } from './cards.js';
import { pickStartPlayer, getNextPlayer } from './players.js';
import { dealCards } from './deck.js';

type Player = 1 | 2;

const STORAGE_KEY = 'memorySettings';
const SETTINGS_PAGE = 'settings.html';

function readSettings(): GameSettings | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return null;
  return JSON.parse(raw) as GameSettings;
}

function applyTheme(theme: string): void {
  document.documentElement.dataset.theme = theme;
}

function getBoard(): HTMLElement | null {
  return document.getElementById('game-board');
}

function clearBoard(board: HTMLElement): void {
  board.replaceChildren();
}

function setGridColumns(board: HTMLElement, cardCount: number): void {
  board.style.gridTemplateColumns = getGridTemplate(cardCount);
}

const HIDE_DELAY_MS = 1000;

let openCards: HTMLElement[] = [];
let currentPlayer: Player = 1;
let scores: Record<Player, number> = { 1: 0, 2: 0 };

function setCardFlipped(card: HTMLElement, flipped: boolean): void {
  card.classList.toggle('card--flipped', flipped);
}

function isMatch(first: HTMLElement, second: HTMLElement): boolean {
  return first.dataset.pair === second.dataset.pair;
}

function hideCards(first: HTMLElement, second: HTMLElement): void {
  setCardFlipped(first, false);
  setCardFlipped(second, false);
}

function getScoreElement(player: Player): HTMLElement | null {
  return document.getElementById(player === 1 ? 'score' : 'score2');
}

function renderScore(player: Player): void {
  const element = getScoreElement(player);
  if (element) element.textContent = String(scores[player]);
}

function incrementScore(player: Player): void {
  scores[player] += 1;
  renderScore(player);
}

function setFrame(cards: HTMLElement[], player: Player): void {
  for (const card of cards) {
    card.style.setProperty('--card-frame', getPlayerColor(player));
  }
}

function checkOpenCards(): void {
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

function flipCard(card: HTMLElement): void {
  if (card.classList.contains('card--flipped') || openCards.length === 2) return;
  setCardFlipped(card, true);
  openCards.push(card);
  if (openCards.length === 2) checkOpenCards();
}

function createFace(className: string, image: string): HTMLDivElement {
  const face = document.createElement('div');
  face.className = `card__face ${className}`;
  face.style.backgroundImage = `url("${image}")`;
  return face;
}

function createCard(theme: string, pairId: number): HTMLDivElement {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.pair = String(pairId);
  const inner = document.createElement('div');
  inner.className = 'card__inner';
  inner.append(
    createFace('card__face--back', getBackImagePath(theme)),
    createFace('card__face--front', getFaceImagePath(theme, pairId)),
  );
  card.appendChild(inner);
  card.addEventListener('click', () => flipCard(card));
  return card;
}

function renderBoard(settings: GameSettings): void {
  const board = getBoard();
  if (!board) return;
  clearBoard(board);
  setGridColumns(board, settings.board);
  for (const pairId of dealCards(settings.board)) {
    board.appendChild(createCard(settings.theme, pairId));
  }
}

function getCurrentPlayerIcon(): HTMLElement | null {
  return document.getElementById('current-player-icon');
}

function getPlayerColor(player: Player): string {
  return `var(--player-${player}-color)`;
}

function setCurrentPlayerIconColor(player: Player): void {
  const icon = getCurrentPlayerIcon();
  if (!icon) return;
  icon.style.setProperty('--player-icon-bg', getPlayerColor(player));
}

function exitGame(): void {
  window.location.href = SETTINGS_PAGE;
}

function getExitDialog(): HTMLDialogElement | null {
  return document.getElementById('exit-dialog') as HTMLDialogElement | null;
}

function openExitDialog(): void {
  getExitDialog()?.showModal();
}

function closeExitDialog(): void {
  getExitDialog()?.close();
}

function setupExitDialog(): void {
  document.querySelector('.game-header__exit')?.addEventListener('click', openExitDialog);
  document.getElementById('exit-dialog-back')?.addEventListener('click', closeExitDialog);
  document.getElementById('exit-dialog-exit')?.addEventListener('click', exitGame);
}

function showStartingPlayer(): void {
  currentPlayer = pickStartPlayer();
  setCurrentPlayerIconColor(currentPlayer);
}

function changePlayer(): void {
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
