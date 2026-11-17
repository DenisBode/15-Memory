import type { GameSettings } from './types';
import { getGridTemplate } from './grid.js';
import { getBackImagePath } from './cards.js';

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

function createCard(theme: string): HTMLDivElement {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.backgroundImage = `url("${getBackImagePath(theme)}")`;
  return card;
}

function renderBoard(settings: GameSettings): void {
  const board = getBoard();
  if (!board) return;
  clearBoard(board);
  setGridColumns(board, settings.board);
  for (let i = 0; i < settings.board; i++) {
    board.appendChild(createCard(settings.theme));
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

const settings = readSettings();
if (settings) {
  applyTheme(settings.theme);
  renderBoard(settings);
}
setupExitDialog();
