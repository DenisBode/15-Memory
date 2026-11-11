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
function startGame(event) {
    event.preventDefault();
    const data = new FormData(form);
    const settings = {
        theme: data.get('theme'),
        player: data.get('player'),
        board: data.get('board'),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    window.location.href = GAME_PAGE;
}
loadSettings();
form.addEventListener('submit', startGame);
