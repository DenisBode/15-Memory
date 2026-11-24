export function createPairIds(cardCount: number): number[] {
  const pairCount = cardCount / 2;
  const ids: number[] = [];
  for (let pair = 1; pair <= pairCount; pair++) {
    ids.push(pair, pair);
  }
  return ids;
}

export function shuffle<T>(items: T[], random: () => number = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function dealCards(cardCount: number, random: () => number = Math.random): number[] {
  return shuffle(createPairIds(cardCount), random);
}
