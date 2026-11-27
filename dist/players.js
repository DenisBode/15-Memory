/** Chance that player 1 starts the game. */
const START_CHANCE = 0.5;
/**
 * Randomly picks the player who starts the game.
 * @param random - Random number source between 0 and 1, replaceable in tests.
 * @returns Player 1 or player 2, each with 50 % chance.
 */
export function pickStartPlayer(random = Math.random) {
    return random() < START_CHANCE ? 1 : 2;
}
/**
 * Finds the player number that belongs to the color chosen in the settings.
 * @param color - Chosen player color.
 * @returns Player 1 for blue, player 2 for orange.
 */
export function getOwnPlayer(color) {
    return color === 'blue' ? 1 : 2;
}
