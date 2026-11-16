import type { GameSettings } from './types';

const STORAGE_KEY = 'memorySettings';

function readSettings(): GameSettings | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return null;
  return JSON.parse(raw) as GameSettings;
}

const settings = readSettings();
console.log('Settings:', settings);
