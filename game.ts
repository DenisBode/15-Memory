import type { GameSettings } from './types';
import { getGridTemplate } from './grid.js';
import { getBackImagePath } from './cards.js';

const STORAGE_KEY = 'memorySettings';

function readSettings(): GameSettings | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return null;
  return JSON.parse(raw) as GameSettings;
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
  card.className = `card card--${theme}`;
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

const settings = readSettings();
if (settings) renderBoard(settings);
