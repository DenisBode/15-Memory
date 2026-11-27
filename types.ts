/**
 * Settings chosen on the settings page and stored in localStorage.
 */
export interface GameSettings {
  /** Selected theme, e.g. 'code-vibes'. */
  theme: string;
  /** Selected player color. */
  player: PlayerColor;
  /** Number of cards on the board: 16, 24 or 36. */
  board: number;
}

/**
 * Player number: 1 is blue, 2 is orange.
 */
export type Player = 1 | 2;

/**
 * Player color that can be chosen in the settings.
 */
export type PlayerColor = 'blue' | 'orange';
