const STORAGE_KEY = 'memorySettings';
const GAME_PAGE = 'game.html';

const form = document.getElementById('settings-form') as HTMLFormElement;

function loadSettings(): void {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  const saved: Record<string, string> = JSON.parse(raw);
  for (const [name, value] of Object.entries(saved)) {
    const radio = form.querySelector<HTMLInputElement>(
      `input[name="${name}"][value="${value}"]`,
    );
    if (radio) radio.checked = true;
  }
}

interface GameSettings {
  theme: string;
  player: string;
  board: number;
}

function getSettings(): GameSettings {
  const data = new FormData(form);
  return {
    theme: String(data.get('theme')),
    player: String(data.get('player')),
    board: Number(data.get('board')),
  };
}

function startGame(event: Event): void {
  event.preventDefault();
  const settings = getSettings();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  window.location.href = GAME_PAGE;
}

loadSettings();
form.addEventListener('submit', startGame);
