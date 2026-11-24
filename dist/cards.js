const PREVIEW_FILES = {
    'code-vibes': 'code_vibes_preview.png',
    gaming: 'gaming_preview.png',
    'da-projects': 'DA_projects_preview.png',
    foods: 'food_preview.png',
};
export function getBackImagePath(theme) {
    return `assets/cards/back/${theme}.png`;
}
export function getPreviewImagePath(theme) {
    const file = PREVIEW_FILES[theme];
    if (file === undefined) {
        throw new Error(`Kein Vorschau-Bild für Theme: ${theme}`);
    }
    return `assets/previews/${file}`;
}
export function getFaceImagePath(theme, pairId) {
    const number = String(pairId).padStart(2, '0');
    return `assets/cards/faces/${theme}-${number}.png`;
}
