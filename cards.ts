/**
 * Preview image file name per theme, as stored in assets/previews.
 */
const PREVIEW_FILES: Record<string, string> = {
  'code-vibes': 'code_vibes_preview.png',
  gaming: 'gaming_preview.png',
  'da-projects': 'DA_projects_preview.png',
  foods: 'food_preview.png',
};

/**
 * Builds the path to the card back image of a theme.
 * @param theme - Theme name, e.g. 'code-vibes'.
 * @returns Relative image path.
 */
export function getBackImagePath(theme: string): string {
  return `assets/cards/back/${theme}.png`;
}

/**
 * Builds the path to the preview image shown on the settings page.
 * @param theme - Theme name, e.g. 'code-vibes'.
 * @returns Relative image path.
 * @throws Error if the theme has no preview image.
 */
export function getPreviewImagePath(theme: string): string {
  const file = PREVIEW_FILES[theme];
  if (file === undefined) {
    throw new Error(`Kein Vorschau-Bild für Theme: ${theme}`);
  }
  return `assets/previews/${file}`;
}

/**
 * Builds the path to the front image of a card pair.
 * @param theme - Theme name, e.g. 'code-vibes'.
 * @param pairId - Pair number starting at 1.
 * @returns Relative image path, e.g. 'assets/cards/faces/code-vibes-01.png'.
 */
export function getFaceImagePath(theme: string, pairId: number): string {
  const number = String(pairId).padStart(2, '0');
  return `assets/cards/faces/${theme}-${number}.png`;
}
