import type { GameSettings } from './types.js';
import { createGameState, switchPlayer, addPoint, isGameOver, type GameState } from './game-state.js';
import { pickStartPlayer } from './players.js';
import { renderBoard, isFlipped, setCardFlipped, hideCards, isSamePair, setFrame } from './board.js';
import { renderScores, setCurrentPlayer } from './header.js';
import { setupExitDialog } from './dialog.js';
import { showGameOver, setupGameOver } from './game-over.js';

const STORAGE_KEY = 'memorySettings';
const SETTINGS_PAGE = 'settings.html';
const HIDE_DELAY_MS = 1000;
const FINISH_DELAY_MS = 1200;

let state: GameState = createGameState(pickStartPlayer());
let openCards: HTMLElement[] = [];
let totalPairs = 0;

function readSettings(): GameSettings | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return null;
  return JSON.parse(raw) as GameSettings;
}

function applyTheme(theme: string): void {
  document.documentElement.dataset.theme = theme;
}

function exitGame(): void {
  window.location.href = SETTINGS_PAGE;
}

function checkGameOver(): void {
  if (!isGameOver(state, totalPairs)) return;
  setTimeout(() => showGameOver(state.scores), FINISH_DELAY_MS);
}

function handleMatch(): void {
  setFrame(openCards, state.currentPlayer);
  state = addPoint(state);
  renderScores(state.scores);
  openCards = [];
  checkGameOver();
}

function handleMismatch(first: HTMLElement, second: HTMLElement): void {
  setTimeout(() => {
    hideCards(first, second);
    openCards = [];
    state = switchPlayer(state);
    setCurrentPlayer(state.currentPlayer);
  }, HIDE_DELAY_MS);
}

function checkOpenCards(): void {
  const [first, second] = openCards;
  if (isSamePair(first, second)) {
    handleMatch();
  } else {
    handleMismatch(first, second);
  }
}

function flipCard(card: HTMLElement): void {
  if (isFlipped(card) || openCards.length === 2) return;
  setCardFlipped(card, true);
  openCards.push(card);
  if (openCards.length === 2) checkOpenCards();
}

const settings = readSettings();
if (settings) {
  totalPairs = settings.board / 2;
  applyTheme(settings.theme);
  renderBoard(settings, flipCard);
}
setupExitDialog(exitGame);
setupGameOver();
setCurrentPlayer(state.currentPlayer);
renderScores(state.scores);
