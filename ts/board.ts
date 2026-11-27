import type { GameSettings, Player } from './types.js';
import { getGridTemplate } from './grid.js';
import { getBackImagePath, getFaceImagePath } from './cards.js';
import { dealCards } from './deck.js';
import { playerColor } from './header.js';

/**
 * Finds the board element.
 * @returns The board, or null if it is missing.
 */
function getBoard(): HTMLElement | null {
  return document.getElementById('game-board');
}

/**
 * Removes all cards from the board.
 * @param board - Board element.
 */
function clearBoard(board: HTMLElement): void {
  board.replaceChildren();
}

/**
 * Sets the number of grid columns and marks the board size for the card gap in CSS.
 * @param board - Board element.
 * @param cardCount - Number of cards on the board.
 */
function setGridColumns(board: HTMLElement, cardCount: number): void {
  board.style.gridTemplateColumns = getGridTemplate(cardCount);
  board.dataset.size = String(cardCount);
}

/**
 * Creates one side of a card with its image.
 * @param className - Modifier class of the side, e.g. 'card__face--back'.
 * @param image - Path to the image.
 * @returns The card side element.
 */
function createFace(className: string, image: string): HTMLDivElement {
  const face = document.createElement('div');
  face.className = `card__face ${className}`;
  face.style.backgroundImage = `url("${image}")`;
  return face;
}

/**
 * Creates a card with back and front side and a click listener.
 * @param theme - Theme name for the images.
 * @param pairId - Pair number of the card.
 * @param onClick - Called with the card when it is clicked.
 * @returns The card element.
 */
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
  card.addEventListener('click', (): void => onClick(card));
  return card;
}

/**
 * Builds the board with shuffled cards for the chosen settings.
 * @param settings - Chosen theme and board size.
 * @param onCardClick - Called with a card when it is clicked.
 */
export function renderBoard(settings: GameSettings, onCardClick: (card: HTMLElement) => void): void {
  const board = getBoard();
  if (!board) return;
  clearBoard(board);
  setGridColumns(board, settings.board);
  for (const pairId of dealCards(settings.board)) {
    board.appendChild(createCard(settings.theme, pairId, onCardClick));
  }
}

/**
 * Checks whether a card shows its front side.
 * @param card - Card element.
 * @returns True if the card is flipped.
 */
export function isFlipped(card: HTMLElement): boolean {
  return card.classList.contains('card--flipped');
}

/**
 * Turns a card to its front or back side.
 * @param card - Card element.
 * @param flipped - True to show the front, false to show the back.
 */
export function setCardFlipped(card: HTMLElement, flipped: boolean): void {
  card.classList.toggle('card--flipped', flipped);
}

/**
 * Turns two cards back to their back side.
 * @param first - First open card.
 * @param second - Second open card.
 */
export function hideCards(first: HTMLElement, second: HTMLElement): void {
  setCardFlipped(first, false);
  setCardFlipped(second, false);
}

/**
 * Checks whether two cards belong to the same pair.
 * @param first - First open card.
 * @param second - Second open card.
 * @returns True if both cards have the same pair number.
 */
export function isSamePair(first: HTMLElement, second: HTMLElement): boolean {
  return first.dataset.pair === second.dataset.pair;
}

/**
 * Marks found cards with a frame in the color of the player.
 * @param cards - Cards of the found pair.
 * @param player - Player who found the pair.
 */
export function setFrame(cards: HTMLElement[], player: Player): void {
  for (const card of cards) {
    card.style.setProperty('--card-frame', playerColor(player));
  }
}
