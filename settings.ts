import type { GameSettings } from './types';
import { getPreviewImagePath } from './cards.js';

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

function renderPreview(settings: GameSettings): void {
  const preview = document.querySelector<HTMLElement>('.settings-preview');
  if (!preview) return;
  preview.style.backgroundImage = `url("${getPreviewImagePath(settings.theme)}")`;
}

const form = document.getElementById('settings-form') as HTMLFormElement;

function updatePreview(): void {
  renderPreview(collectSettings(form));
}

form.addEventListener('change', updatePreview);
form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  saveSettings(collectSettings(form));
  window.location.href = GAME_PAGE;
});

updatePreview();
