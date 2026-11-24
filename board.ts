import type { GameSettings, Player } from './types.js';
import { getGridTemplate } from './grid.js';
import { getBackImagePath, getFaceImagePath } from './cards.js';
import { dealCards } from './deck.js';
import { playerColor } from './header.js';

function getBoard(): HTMLElement | null {
  return document.getElementById('game-board');
}

function clearBoard(board: HTMLElement): void {
  board.replaceChildren();
}

function setGridColumns(board: HTMLElement, cardCount: number): void {
  board.style.gridTemplateColumns = getGridTemplate(cardCount);
}

function createFace(className: string, image: string): HTMLDivElement {
  const face = document.createElement('div');
  face.className = `card__face ${className}`;
  face.style.backgroundImage = `url("${image}")`;
  return face;
}

function createCard(theme: string, pairId: number, onClick: (card: HTMLElement) => void): HTMLDivElement {
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
  card.addEventListener('click', () => onClick(card));
  return card;
}

export function renderBoard(settings: GameSettings, onCardClick: (card: HTMLElement) => void): void {
  const board = getBoard();
  if (!board) return;
  clearBoard(board);
  setGridColumns(board, settings.board);
  for (const pairId of dealCards(settings.board)) {
    board.appendChild(createCard(settings.theme, pairId, onCardClick));
  }
}

export function isFlipped(card: HTMLElement): boolean {
  return card.classList.contains('card--flipped');
}

export function setCardFlipped(card: HTMLElement, flipped: boolean): void {
  card.classList.toggle('card--flipped', flipped);
}

export function hideCards(first: HTMLElement, second: HTMLElement): void {
  setCardFlipped(first, false);
  setCardFlipped(second, false);
}

export function isSamePair(first: HTMLElement, second: HTMLElement): boolean {
  return first.dataset.pair === second.dataset.pair;
}

export function setFrame(cards: HTMLElement[], player: Player): void {
  for (const card of cards) {
    card.style.setProperty('--card-frame', playerColor(player));
  }
}
