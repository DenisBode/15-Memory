/** Number of cards that belong to one pair. */
export const CARDS_PER_PAIR = 2;
/**
 * Creates two entries for every pair, e.g. [1, 1, 2, 2] for 4 cards.
 * @param cardCount - Number of cards on the board.
 * @returns Unshuffled list of pair numbers.
 */
export function createPairIds(cardCount) {
    const pairCount = cardCount / CARDS_PER_PAIR;
    const ids = [];
    for (let pair = 1; pair <= pairCount; pair++) {
        ids.push(pair, pair);
    }
    return ids;
}
/**
 * Shuffles a list with the Fisher-Yates algorithm without changing the original.
 * @param items - List to shuffle.
 * @returns New shuffled list.
 */
export function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}
/**
 * Creates the shuffled order of pair numbers for the board.
 * @param cardCount - Number of cards on the board.
 * @returns Shuffled list of pair numbers.
 */
export function dealCards(cardCount) {
    return shuffle(createPairIds(cardCount));
}
