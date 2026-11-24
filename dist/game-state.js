export function getNextPlayer(player) {
    return player === 1 ? 2 : 1;
}
export function createGameState(startPlayer) {
    return { currentPlayer: startPlayer, scores: { 1: 0, 2: 0 } };
}
export function switchPlayer(state) {
    return { ...state, currentPlayer: getNextPlayer(state.currentPlayer) };
}
export function addPoint(state) {
    const scores = { ...state.scores };
    scores[state.currentPlayer] += 1;
    return { ...state, scores };
}
