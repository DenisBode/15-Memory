/**
 * Randomly picks the player who starts the game.
 * @param random - Random number source between 0 and 1, replaceable in tests.
 * @returns Player 1 or player 2, each with 50 % chance.
 */
export function pickStartPlayer(random: () => number = Math.random): 1 | 2 {
  return random() < 0.5 ? 1 : 2;
}
