"use strict";
const STORAGE_KEY = 'memorySettings';
const GAME_PAGE = 'game.html';
const form = document.getElementById('settings-form');
function loadSettings() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw)
        return;
    const saved = JSON.parse(raw);
    for (const [name, value] of Object.entries(saved)) {
        const radio = form.querySelector(`input[name="${name}"][value="${value}"]`);
        if (radio)
            radio.checked = true;
    }
}
function getSettings() {
    const data = new FormData(form);
    return {
        theme: String(data.get('theme')),
        player: String(data.get('player')),
        board: Number(data.get('board')),
    };
}
function startGame(event) {
    event.preventDefault();
    const settings = getSettings();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    window.location.href = GAME_PAGE;
}
loadSettings();
form.addEventListener('submit', startGame);
