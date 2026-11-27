/** Number of cards that belong to one pair. */
export const CARDS_PER_PAIR = 2;

/**
 * Creates two entries for every pair, e.g. [1, 1, 2, 2] for 4 cards.
 * @param cardCount - Number of cards on the board.
 * @returns Unshuffled list of pair numbers.
 */
export function createPairIds(cardCount: number): number[] {
  const pairCount = cardCount / CARDS_PER_PAIR;
  const ids: number[] = [];
  for (let pair = 1; pair <= pairCount; pair++) {
    ids.push(pair, pair);
  }
  return ids;
}

/**
 * Shuffles a list with the Fisher-Yates algorithm without changing the original.
 * @param items - List to shuffle.
 * @param random - Random number source between 0 and 1, replaceable in tests.
 * @returns New shuffled list.
 */
export function shuffle<T>(items: T[], random: () => number = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Creates the shuffled order of pair numbers for the board.
 * @param cardCount - Number of cards on the board.
 * @param random - Random number source between 0 and 1, replaceable in tests.
 * @returns Shuffled list of pair numbers.
 */
export function dealCards(cardCount: number, random: () => number = Math.random): number[] {
  return shuffle(createPairIds(cardCount), random);
}
