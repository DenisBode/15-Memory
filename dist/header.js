/**
 * Builds the CSS color value of a player from the theme variables.
 * @param player - Player number.
 * @returns CSS value, e.g. 'var(--player-1-color)'.
 */
export function playerColor(player) {
    return `var(--player-${player}-color)`;
}
/**
 * Finds the score element of a player in the header.
 * @param player - Player number.
 * @returns The score element, or null if it is missing.
 */
function getScoreElement(player) {
    return document.getElementById(player === 1 ? 'score' : 'score2');
}
/**
 * Shows the points of both players in the header.
 * @param scores - Points per player.
 */
export function renderScores(scores) {
    for (const player of [1, 2]) {
        const element = getScoreElement(player);
        if (element)
            element.textContent = String(scores[player]);
    }
}
/**
 * Colors the current player icon in the color of the given player.
 * @param player - Player whose turn it is.
 */
export function setCurrentPlayer(player) {
    const icon = document.getElementById('current-player-icon');
    if (!icon)
        return;
    icon.style.setProperty('--player-icon-bg', playerColor(player));
}
