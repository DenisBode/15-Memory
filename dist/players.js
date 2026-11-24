export function pickStartPlayer(random = Math.random) {
    return random() < 0.5 ? 1 : 2;
}
