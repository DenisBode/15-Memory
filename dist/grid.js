const COLUMNS = { 16: 4, 24: 6, 36: 6 };
export function getColumnCount(cardCount) {
    const columns = COLUMNS[cardCount];
    if (columns === undefined) {
        throw new Error(`Unbekannte Board-Größe: ${cardCount}`);
    }
    return columns;
}
export function getGridTemplate(cardCount) {
    return `repeat(${getColumnCount(cardCount)}, 1fr)`;
}
