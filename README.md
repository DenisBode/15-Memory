# Memory

Memory-Spiel für zwei Spieler, entwickelt im TypeScript-Modul der Developer Akademie. Umgesetzt mit HTML, SCSS und TypeScript, ohne Framework. Das Design folgt der Figma-Vorlage.

## Ablauf

1. **Startseite:** „Ready to play?“ mit animiertem Controller-Icon. Der Play-Button führt zu den Einstellungen.
2. **Einstellungen:** Auswahl von Theme, Spielerfarbe und Spielfeldgröße. Eine Vorschau zeigt das gewählte Theme, die Leiste unten fasst die Auswahl zusammen.
3. **Spiel:** Zwei Spieler decken abwechselnd je zwei Karten auf.
4. **Game Over:** Nach dem letzten Paar erscheint bildschirmfüllend „Game over“ mit dem Endstand. Kurz danach folgt der Gewinner mit Konfetti und, je nach Theme, einer Spielfigur in seiner Farbe oder einem Pokal. Bei Unentschieden erscheint „DRAW“ mit einer Waage. „New game“ startet eine neue Runde mit denselben Einstellungen, „Home“ bzw. „Back to start“ führt zur Startseite.

## Funktionen

- **Themes:** Code Vibes, Gaming, DA Projects und Foods. Jedes Theme hat eigene Farben, Schriften, Kartengrößen und Kartenmotive.
- **Spielfeldgrößen:** 16 Karten (4 × 4), 24 Karten (6 × 4) und 36 Karten (6 × 6).
- **Spielerfarbe:** Die in den Einstellungen gewählte Farbe ist die eigene. Im Punktestand steht dahinter „(You)“.
- **Kopfzeile:** Punktestand beider Spieler, Anzeige des Spielers am Zug und ein „Exit game“-Button mit Sicherheitsabfrage.
- **Spielregeln:**
  - Der Startspieler wird zufällig ausgelost.
  - Die Karten drehen sich mit einer 3D-Animation (400 ms) um.
  - Bei einem Paar bekommt der Spieler einen Punkt und ist weiter am Zug.
  - Bei zwei verschiedenen Karten drehen sie sich nach 1,2 Sekunden zurück, und der andere Spieler ist dran.

### Extras

- Gefundene Paare bekommen einen Rahmen in der Farbe des Spielers, der sie gefunden hat.
- 36 Unit-Tests für die Spiellogik mit dem Testrunner von Node.
- Alle Schriften sind lokal eingebunden, das Spiel läuft ohne Internetverbindung.
- Widescreen ab 1440px: Die Content-Fläche bleibt so breit wie im Desktop-Layout und wird zentriert, der Hintergrund geht über die ganze Breite. Das Konfetti in der Gewinner-Ansicht läuft dann über die volle Bildschirmbreite.
- Die Animationen von Controller-Icon und Konfetti sind aus, wenn im Betriebssystem „Bewegung reduzieren“ aktiviert ist.
- Die Felder in der Settings-Leiste sind so breit wie ihre längste Option, damit beim Umschalten nichts springt.

## Starten

Voraussetzung: Node.js ab Version 22.

```bash
npm install
npm run build
```

Danach `index.html` über einen lokalen Server öffnen, z. B. mit der VS-Code-Erweiterung „Live Server“. Ein Doppelklick auf die Datei reicht nicht, weil die Skripte als ES-Module geladen werden.

Die übersetzten Ordner `css/` und `dist/` sind bewusst mit im Repository. So läuft das Spiel auch ohne eigenen Build, z. B. direkt über GitHub Pages. Nach Änderungen an `ts/` oder `scss/` müssen sie mit `npm run build` neu erzeugt werden.

| Befehl | Zweck |
|---|---|
| `npm run build` | TypeScript nach `dist/` und SCSS nach `css/` übersetzen |
| `npm run watch:ts` | TypeScript bei jeder Änderung neu übersetzen |
| `npm run watch:css` | SCSS bei jeder Änderung neu übersetzen |
| `npm test` | Unit-Tests ausführen |

## Projektstruktur

```
├── index.html, settings.html, game.html
├── ts/                   TypeScript-Quellcode
│   ├── types.ts          Gemeinsame Typen (GameSettings, Player, PlayerColor)
│   ├── settings.ts       Einstellungen lesen, Vorschau, Speichern
│   ├── game.ts           Spielablauf: verbindet die Module
│   ├── game-state.ts     Spielzustand ohne DOM: Spieler, Punkte, Spielende, Gewinner
│   ├── board.ts          Spielfeld: Karten erzeugen, umdrehen, Rahmen
│   ├── header.ts         Kopfzeile: Punkte und Spieler am Zug
│   ├── dialog.ts         Exit-Abfrage
│   ├── game-over.ts      Ergebnis-Ansicht: Endstand und Gewinner
│   ├── deck.ts           Paare erzeugen und mischen
│   ├── cards.ts          Bildpfade für Karten und Vorschau
│   ├── grid.ts           Spaltenzahl je Spielfeldgröße
│   └── players.ts        Startspieler auslosen, eigene Spielerfarbe
├── scss/                 Styles
│   ├── abstract/         Variablen und Mixins (z. B. flex-center, mask-image, widescreen)
│   ├── components/       Buttons, Karten, Popups, Radio-Buttons
│   ├── layout/           Seitenlayout
│   ├── pages/            Start-, Settings- und Spielseite
│   ├── _fonts.scss       Lokale Schriften (@font-face)
│   └── _theme.scss       Farben und Werte der vier Themes
├── tests/                Unit-Tests der Spiellogik
├── assets/
│   ├── cards/faces/      Vorderseiten: <theme>-01.png bis <theme>-18.png
│   ├── cards/back/       Rückseiten: <theme>.png
│   ├── previews/         Vorschaubilder: <theme>.png
│   ├── result/           Ergebnis: Spielfigur, Pokal, Waage, Konfetti
│   └── icons/            Icons der Oberfläche: Controller, Spielfigur, Play, Exit, Settings-Überschriften
├── fonts/                Schriftdateien mit Lizenz (OFL.txt)
├── dist/                 Übersetztes JavaScript aus ts/
└── css/                  Übersetztes CSS aus scss/
```

## Technik

- **TypeScript** im Strict-Modus, als ES-Module. Jede Funktion ist mit JSDoc dokumentiert.
- **SCSS** mit BEM-Klassen, Verschachtelung und Mixins (`@use '../abstract/mixin' as mx`).
- **Themes** über CSS-Variablen: `_theme.scss` erzeugt aus einer Sass-Map pro Theme einen Block `:root[data-theme="…"]`. Das Skript setzt `data-theme` am `<html>`-Element.
- **Theme-Varianten ohne TypeScript:** Welche Elemente ein Theme zeigt, steuern ebenfalls CSS-Variablen, z. B. `--trophy-display` oder `--confetti-display`. Das Skript setzt nur Klassen wie `result--draw`.
- **Einfärbbare Icons:** Spielfigur, Waage und Exit-Icon sind CSS-Masken (`mask-image`). Ihre Farbe kommt aus `background-color`, z. B. der Spielerfarbe oder `currentColor`.
- **Responsive:** Mixin `mobile` für kleine Bildschirme, Mixin `widescreen` ab 1440px.
- **Einstellungen** werden im `localStorage` gespeichert und auf der Spielseite gelesen.

## Stand

Alle Punkte der Checkliste sind umgesetzt, das Design folgt der Figma-Vorlage. Offen ist nichts.

**Bildschirmgrößen:** Das Layout ist für Desktop nach der Figma-Vorlage umgesetzt (1440px, mit Widescreen-Breakpoint ab 1440px) und funktioniert auch auf Tablets im Querformat. Eine Optimierung für Smartphones ist laut Checkliste nicht gefordert und wurde bewusst nicht umgesetzt.
