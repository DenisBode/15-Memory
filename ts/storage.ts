import type { GameSettings } from './types.js';

/** localStorage key of the saved settings. */
const STORAGE_KEY = 'memorySettings';

/**
 * Saves the settings in localStorage for the game page.
 * @param settings - Chosen settings.
 */
export function saveSettings(settings: GameSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

/**
 * Reads the settings saved by the settings page.
 * @returns The settings, or null if none are saved.
 */
export function readSettings(): GameSettings | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return null;
  return JSON.parse(raw) as GameSettings;
}
