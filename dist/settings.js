import { getPreviewImagePath } from './cards.js';
import { saveSettings } from './storage.js';
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
/**
 * Gives a summary field the width of its longest option, so the bar does not jump on a change.
 * @param form - Settings form.
 * @param name - Name of the radio group.
 */
function fixSummaryWidth(form, name) {
    const element = document.getElementById(`summary-${name}`);
    const labels = form.querySelectorAll(`input[name="${name}"] ~ .radio-btn__label`);
    if (!element)
        return;
    let maxWidth = 0;
    labels.forEach((label) => {
        element.textContent = label.textContent;
        maxWidth = Math.max(maxWidth, element.offsetWidth);
    });
    element.style.minWidth = `${maxWidth}px`;
}
/**
 * Fixes the width of all summary fields once the fonts are loaded.
 * @param form - Settings form.
 */
async function fixSummaryWidths(form) {
    await document.fonts.ready;
    SUMMARY_GROUPS.forEach((name) => fixSummaryWidth(form, name));
    renderSummary(form);
}
/** Settings form of the page. */
const FORM = document.getElementById('settings-form');
/**
 * Updates preview and settings bar after a change in the form.
 */
function updateSettingsView() {
    renderPreview(collectSettings(FORM));
    renderSummary(FORM);
}
FORM.addEventListener('change', updateSettingsView);
FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    saveSettings(collectSettings(FORM));
    window.location.href = GAME_PAGE;
});
updateSettingsView();
fixSummaryWidths(FORM);
