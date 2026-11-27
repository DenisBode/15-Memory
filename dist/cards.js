/**
 * Themes that have a preview image in assets/previews.
 */
const PREVIEW_THEMES = ['code-vibes', 'gaming', 'da-projects', 'foods'];
/**
 * Builds the path to the card back image of a theme.
 * @param theme - Theme name, e.g. 'code-vibes'.
 * @returns Relative image path.
 */
export function getBackImagePath(theme) {
    return `assets/cards/back/${theme}.png`;
}
/**
 * Builds the path to the preview image shown on the settings page.
 * @param theme - Theme name, e.g. 'code-vibes'.
 * @returns Relative image path.
 * @throws Error if the theme has no preview image.
 */
export function getPreviewImagePath(theme) {
    if (!PREVIEW_THEMES.includes(theme)) {
        throw new Error(`Kein Vorschau-Bild für Theme: ${theme}`);
    }
    return `assets/previews/${theme}.png`;
}
/**
 * Builds the path to the front image of a card pair.
 * @param theme - Theme name, e.g. 'code-vibes'.
 * @param pairId - Pair number starting at 1.
 * @returns Relative image path, e.g. 'assets/cards/faces/code-vibes-01.png'.
 */
export function getFaceImagePath(theme, pairId) {
    const number = String(pairId).padStart(2, '0');
    return `assets/cards/faces/${theme}-${number}.png`;
}
