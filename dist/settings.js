import { getPreviewImagePath } from './cards.js';
/** localStorage key of the saved settings. */
const STORAGE_KEY = 'memorySettings';
/** Page opened when the game starts. */
const GAME_PAGE = 'game.html';
/** Names of the radio groups shown in the settings bar. */
const SUMMARY_GROUPS = ['theme', 'player', 'board'];
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
 * Shows the preview image of the selected theme on its theme background.
 * @param settings - Chosen settings.
 */
function renderPreview(settings) {
    const image = document.querySelector('.settings__preview-image');
    document.documentElement.dataset.theme = settings.theme;
    if (image)
        image.src = getPreviewImagePath(settings.theme);
}
/**
 * Reads the visible label of the checked option in a radio group.
 * @param form - Settings form.
 * @param name - Name of the radio group.
 * @returns Label text, or an empty string if nothing is checked.
 */
function getSelectedLabel(form, name) {
    const input = form.querySelector(`input[name="${name}"]:checked`);
    const label = input?.closest('.radio-btn')?.querySelector('.radio-btn__label');
    return label?.textContent ?? '';
}
/**
 * Shows the chosen options in the settings bar.
 * @param form - Settings form.
 */
function renderSummary(form) {
    for (const name of SUMMARY_GROUPS) {
        const element = document.getElementById(`summary-${name}`);
        if (element)
            element.textContent = getSelectedLabel(form, name);
    }
}
/** Settings form of the page. */
const form = document.getElementById('settings-form');
/**
 * Updates preview and settings bar after a change in the form.
 */
function updateSettingsView() {
    renderPreview(collectSettings(form));
    renderSummary(form);
}
form.addEventListener('change', updateSettingsView);
form.addEventListener('submit', (event) => {
    event.preventDefault();
    saveSettings(collectSettings(form));
    window.location.href = GAME_PAGE;
});
updateSettingsView();
