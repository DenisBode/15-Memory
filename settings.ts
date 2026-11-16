import type { GameSettings } from './types';

const STORAGE_KEY = 'memorySettings';
const GAME_PAGE = 'game.html';

function collectSettings(form: HTMLFormElement): GameSettings {
  const data = new FormData(form);
  return {
    theme: String(data.get('theme')),
    player: String(data.get('player')),
    board: Number(data.get('board')),
  };
}

function saveSettings(settings: GameSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

const form = document.getElementById('settings-form') as HTMLFormElement;

form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  saveSettings(collectSettings(form));
  window.location.href = GAME_PAGE;
});
