
const PREVIEW_FILES: Record<string, string> = {
  'code-vibes': 'code_vibes_preview.png',
  gaming: 'gaming_preview.png',
  'da-projects': 'DA_projects_preview.png',
  foods: 'food_preview.png',
};

export function getBackImagePath(theme: string): string {
  return `assets/cards/back/${theme}.png`;
}

export function getPreviewImagePath(theme: string): string {
  const file = PREVIEW_FILES[theme];
  if (file === undefined) {
    throw new Error(`Kein Vorschau-Bild für Theme: ${theme}`);
  }
  return `assets/previews/${file}`;
}
