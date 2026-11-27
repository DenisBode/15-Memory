# Memory

Memory-Spiel für zwei Spieler, entwickelt im TypeScript-Modul der Developer Akademie. Umgesetzt mit HTML, SCSS und TypeScript, ohne Framework. Das Design folgt der Figma-Vorlage.

## Ablauf

1. **Startseite:** „Ready to play?“ mit animiertem Controller-Icon. Der Play-Button führt zu den Einstellungen.
2. **Einstellungen:** Auswahl von Theme, Spielerfarbe und Spielfeldgröße. Eine Vorschau zeigt das gewählte Theme, die Leiste unten fasst die Auswahl zusammen.
3. **Spiel:** Zwei Spieler decken abwechselnd je zwei Karten auf.
4. **Game Over:** Nach dem letzten Paar erscheint bildschirmfüllend „Game over“ mit dem Endstand. Kurz danach folgt der Gewinner je nach Theme mit Spielfigur in seiner Farbe, Pokal oder Konfetti. Bei Unentschieden erscheint „DRAW“ mit einer Waage. Von dort startet eine neue Runde oder es geht zurück zur Startseite.

## Funktionen

- **Themes:** Code Vibes, Gaming, DA Projects und Foods. Jedes Theme hat eigene Farben, Schriften, Kartengrößen und Kartenmotive.
- **Spielfeldgrößen:** 16 Karten (4 × 4), 24 Karten (6 × 4) und 36 Karten (6 × 6).
- **Spielerfarbe:** Die in den Einstellungen gewählte Farbe ist die eigene. Im Punktestand steht dahinter „(You)“.
- **Kopfzeile:** Punktestand beider Spieler, Anzeige des Spielers am Zug und ein „Exit game“-Button mit Sicherheitsabfrage.
- **Spielregeln:**
  - Der Startspieler wird zufällig ausgelost.
  - Die Karten drehen sich mit einer 3D-Animation um.
  - Bei einem Paar bekommt der Spieler einen Punkt und ist weiter am Zug.
  - Bei zwei verschiedenen Karten drehen sie sich nach einer Sekunde zurück, und der andere Spieler ist dran.

### Extras

- Gefundene Paare bekommen einen Rahmen in der Farbe des Spielers, der sie gefunden hat.
- Unit-Tests für die Spiellogik mit dem Testrunner von Node.
- Die Animation des Controller-Icons ist aus, wenn im Betriebssystem „Bewegung reduzieren“ aktiviert ist.

## Starten

Voraussetzung: Node.js ab Version 22.

```bash
npm install
npm run build
```

Danach `index.html` über einen lokalen Server öffnen, z. B. mit der VS-Code-Erweiterung „Live Server“. Ein Doppelklick auf die Datei reicht nicht, weil die Skripte als ES-Module geladen werden.

| Befehl | Zweck |
|---|---|
| `npm run build` | TypeScript nach `dist/` und SCSS nach `css/` übersetzen |
| `npm run watch:ts` | TypeScript bei jeder Änderung neu übersetzen |
| `npm run watch:css` | SCSS bei jeder Änderung neu übersetzen |
| `npm test` | Unit-Tests ausführen |

## Projektstruktur

```
├── index.html, settings.html, game.html
├── types.ts          Gemeinsame Typen (GameSettings, Player)
├── settings.ts       Einstellungen lesen, Vorschau, Speichern
├── game.ts           Spielablauf: verbindet die Module
├── game-state.ts     Spielzustand ohne DOM: Spieler, Punkte, Spielende, Gewinner
├── board.ts          Spielfeld: Karten erzeugen, umdrehen, Rahmen
├── header.ts         Kopfzeile: Punkte und Spieler am Zug
├── dialog.ts         Exit-Abfrage
├── game-over.ts      Ergebnis-Ansicht: Endstand und Gewinner
├── deck.ts           Paare erzeugen und mischen
├── cards.ts          Bildpfade für Karten und Vorschau
├── grid.ts           Spaltenzahl je Spielfeldgröße
├── players.ts        Startspieler auslosen
├── tests/            Unit-Tests
├── scss/
│   ├── abstract/     Variablen und Mixins
│   ├── components/   Buttons, Karten, Popups, Radio-Buttons
│   ├── layout/       Seitenlayout
│   ├── pages/        Start-, Settings- und Spielseite
│   └── _theme.scss   Farben und Werte der vier Themes
├── assets/
│   ├── cards/faces/  Vorderseiten: <theme>-01.png bis <theme>-18.png
│   ├── cards/back/   Rückseiten: <theme>.png
│   ├── previews/     Vorschaubilder: <theme>.png
│   ├── result/       Ergebnis: Spielfigur, Pokal, Waage, Konfetti
│   └── icons/        Icons der Oberfläche
├── fonts/            Lokale Schriften
├── css/, dist/       Übersetzte Dateien (werden mit npm run build erzeugt)
```

## Technik

- **TypeScript** im Strict-Modus, als ES-Module. Jede Funktion ist mit JSDoc dokumentiert.
- **SCSS** mit BEM-Klassen, Verschachtelung und Mixins (`@use '../abstract/mixin' as mx`).
- **Themes** über CSS-Variablen: `_theme.scss` erzeugt aus einer Sass-Map pro Theme einen Block `:root[data-theme="…"]`. Das Skript setzt `data-theme` am `<html>`-Element.
- **Einstellungen** werden im `localStorage` gespeichert und auf der Spielseite gelesen.

## Stand

Alle Punkte der Checkliste sind umgesetzt. Noch offen sind nur Icons aus Figma (Überschriften der Einstellungen, Exit-Button).
