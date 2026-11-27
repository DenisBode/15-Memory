import { getPreviewImagePath } from './cards.js';
/** localStorage key of the saved settings. */
const STORAGE_KEY = 'memorySettings';
/** Page opened when the game starts. */
const GAME_PAGE = 'game.html';
/**
 * Reads the selected options from the settings form.
 * @param form - Settings form.
 * @returns The chosen theme, player and board size.
 */
function collectSettings(form) {
    const data = new FormData(form);
    return {
        theme: String(data.get('theme')),
        player: String(data.get('player')),
        board: Number(data.get('board')),
    };
}
/**
 * Saves the settings in localStorage for the game page.
 * @param settings - Chosen settings.
 */
function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
/**
 * Shows the preview image of the selected theme.
 * @param settings - Chosen settings.
 */
function renderPreview(settings) {
    const preview = document.querySelector('.settings-preview');
    if (!preview)
        return;
    preview.style.backgroundImage = `url("${getPreviewImagePath(settings.theme)}")`;
}
/** Settings form of the page. */
const form = document.getElementById('settings-form');
/**
 * Updates the preview after a change in the form.
 */
function updatePreview() {
    renderPreview(collectSettings(form));
}
form.addEventListener('change', updatePreview);
form.addEventListener('submit', (event) => {
    event.preventDefault();
    saveSettings(collectSettings(form));
    window.location.href = GAME_PAGE;
});
updatePreview();
