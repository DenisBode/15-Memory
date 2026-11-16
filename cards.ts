// Pfade zu den Karten-Bildern. Reine Logik, ohne DOM.

export function getBackImagePath(theme: string): string {
  return `assets/cards/back/${theme}.png`;
}
