export function pickStartPlayer(random = Math.random) {
    return random() < 0.5 ? 1 : 2;
}
export function getNextPlayer(player) {
    return player === 1 ? 2 : 1;
}
