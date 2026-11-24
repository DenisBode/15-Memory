export function createPairIds(cardCount) {
    const pairCount = cardCount / 2;
    const ids = [];
    for (let pair = 1; pair <= pairCount; pair++) {
        ids.push(pair, pair);
    }
    return ids;
}
export function shuffle(items, random = Math.random) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}
export function dealCards(cardCount, random = Math.random) {
    return shuffle(createPairIds(cardCount), random);
}
