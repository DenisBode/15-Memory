/**
 * Number of grid columns per board size (16 = 4x4, 24 = 6x4, 36 = 6x6).
 */
const COLUMNS: Record<number, number> = { 16: 4, 24: 6, 36: 6 };

/**
 * Looks up the number of columns for a board size.
 * @param cardCount - Number of cards on the board.
 * @returns Number of grid columns.
 * @throws Error if the board size is unknown.
 */
export function getColumnCount(cardCount: number): number {
  const columns = COLUMNS[cardCount];
  if (columns === undefined) {
    throw new Error(`Unbekannte Board-Größe: ${cardCount}`);
  }
  return columns;
}

/**
 * Builds the CSS value for grid-template-columns.
 * @param cardCount - Number of cards on the board.
 * @returns CSS value, e.g. 'repeat(4, 1fr)'.
 */
export function getGridTemplate(cardCount: number): string {
  return `repeat(${getColumnCount(cardCount)}, 1fr)`;
}
