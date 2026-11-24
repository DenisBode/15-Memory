export function playerColor(player) {
    return `var(--player-${player}-color)`;
}
function getScoreElement(player) {
    return document.getElementById(player === 1 ? 'score' : 'score2');
}
export function renderScores(scores) {
    for (const player of [1, 2]) {
        const element = getScoreElement(player);
        if (element)
            element.textContent = String(scores[player]);
    }
}
export function setCurrentPlayer(player) {
    const icon = document.getElementById('current-player-icon');
    if (!icon)
        return;
    icon.style.setProperty('--player-icon-bg', playerColor(player));
}
