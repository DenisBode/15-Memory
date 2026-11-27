import type { GameSettings, PlayerColor } from './types.js';
import { getPreviewImagePath } from './cards.js';
import { saveSettings } from './storage.js';

/** Page opened when the game starts. */
const GAME_PAGE = 'game.html';
/** Names of the radio groups shown in the settings bar. */
const SUMMARY_GROUPS: string[] = ['theme', 'player', 'board'];
/** Name of the radio group whose options change the preview. */
const THEME_GROUP = 'theme';
/** Class of the option that shows the dot and the yellow arrow. */
const ACTIVE_CLASS = 'radio-btn--active';

/**
 * Reads the selected options from the settings form.
 * @param form - Settings form.
 * @returns The chosen theme, player and board size.
 */
function collectSettings(form: HTMLFormElement): GameSettings {
  const data = new FormData(form);
  return {
    theme: String(data.get('theme')),
    player: String(data.get('player')) as PlayerColor,
    board: Number(data.get('board')),
  };
}

/**
 * Shows the preview image of a theme on its theme background.
 * @param theme - Theme name, e.g. 'code-vibes'.
 */
function renderPreview(theme: string): void {
  const image = document.querySelector<HTMLImageElement>('.settings__preview-image');
  document.documentElement.dataset.theme = theme;
  if (image) image.src = getPreviewImagePath(theme);
}

/**
 * Reads the visible label of the active option in a radio group, i.e. the hovered or else the checked one.
 * @param form - Settings form.
 * @param name - Name of the radio group.
 * @returns Label text, or an empty string if no option is active.
 */
function getActiveLabel(form: HTMLFormElement, name: string): string {
  const input = form.querySelector<HTMLInputElement>(`.${ACTIVE_CLASS} input[name="${name}"]`);
  const label = input?.closest('.radio-btn')?.querySelector('.radio-btn__label');
  return label?.textContent ?? '';
}

/**
 * Shows the active options in the settings bar.
 * @param form - Settings form.
 */
function renderSummary(form: HTMLFormElement): void {
  for (const name of SUMMARY_GROUPS) {
    const element = document.getElementById(`summary-${name}`);
    if (element) element.textContent = getActiveLabel(form, name);
  }
}

/**
 * Gives a summary field the width of its longest option, so the bar does not jump on a change.
 * @param form - Settings form.
 * @param name - Name of the radio group.
 */
function fixSummaryWidth(form: HTMLFormElement, name: string): void {
  const element = document.getElementById(`summary-${name}`);
  const labels = form.querySelectorAll(`input[name="${name}"] ~ .radio-btn__label`);
  if (!element) return;
  let maxWidth = 0;
  labels.forEach((label: Element): void => {
    element.textContent = label.textContent;
    maxWidth = Math.max(maxWidth, element.offsetWidth);
  });
  element.style.minWidth = `${maxWidth}px`;
}

/**
 * Fixes the width of all summary fields once the fonts are loaded.
 * @param form - Settings form.
 */
async function fixSummaryWidths(form: HTMLFormElement): Promise<void> {
  await document.fonts.ready;
  SUMMARY_GROUPS.forEach((name: string): void => fixSummaryWidth(form, name));
  renderSummary(form);
}

/** Settings form of the page. */
const FORM = document.getElementById('settings-form') as HTMLFormElement;

/**
 * Marks one option as active, so it shows the dot and the yellow arrow, and removes the mark from the rest of its group.
 * @param option - Option to mark.
 */
function setActiveOption(option: Element): void {
  const group = option.parentElement?.querySelectorAll('.radio-btn') ?? [];
  group.forEach((other: Element): void => other.classList.remove(ACTIVE_CLASS));
  option.classList.add(ACTIVE_CLASS);
}

/**
 * Marks the checked option of every radio group as active.
 */
function markCheckedOptions(): void {
  FORM.querySelectorAll('input:checked').forEach((input: Element): void => {
    const option = input.closest('.radio-btn');
    if (option) setActiveOption(option);
  });
}

/**
 * Moves dot and arrow to an option, shows it in the settings bar and shows its preview if it is a theme.
 * @param input - Radio input of the option.
 */
function highlightOption(input: HTMLInputElement): void {
  const option = input.closest('.radio-btn');
  if (option) setActiveOption(option);
  if (input.name === THEME_GROUP) renderPreview(input.value);
  renderSummary(FORM);
}

/**
 * Shows the checked options, their preview and the settings bar.
 */
function renderSettingsView(): void {
  markCheckedOptions();
  renderPreview(collectSettings(FORM).theme);
  renderSummary(FORM);
}

/**
 * Lets dot, arrow and theme preview follow the pointer and returns them to the checked options once the pointer leaves a group.
 */
function setupOptionHover(): void {
  FORM.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach((input: HTMLInputElement): void => {
    input.closest('.radio-btn')?.addEventListener('mouseenter', (): void => highlightOption(input));
  });
  FORM.querySelectorAll('fieldset').forEach((group: Element): void => {
    group.addEventListener('mouseleave', renderSettingsView);
  });
}

FORM.addEventListener('change', (event: Event): void => highlightOption(event.target as HTMLInputElement));
FORM.addEventListener('submit', (event: Event): void => {
  event.preventDefault();
  saveSettings(collectSettings(FORM));
  window.location.href = GAME_PAGE;
});

renderSettingsView();
setupOptionHover();
fixSummaryWidths(FORM);
