const STORAGE_KEY = 'memorySettings';
const GAME_PAGE = 'game.html';
function collectSettings(form) {
    const data = new FormData(form);
    return {
        theme: String(data.get('theme')),
        player: String(data.get('player')),
        board: Number(data.get('board')),
    };
}
function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
const form = document.getElementById('settings-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    saveSettings(collectSettings(form));
    window.location.href = GAME_PAGE;
});
export {};
