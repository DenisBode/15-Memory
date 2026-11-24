export function pickStartPlayer(random: () => number = Math.random): 1 | 2 {
  return random() < 0.5 ? 1 : 2;
}

export function getNextPlayer(player: 1 | 2): 1 | 2 {
  return player === 1 ? 2 : 1;
}
