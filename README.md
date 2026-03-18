# Data Quest – Die Maus und das Geheimnis der Daten

Ein browserbasiertes 2D-Jump'n'Run für GitHub Pages zur DSGVO- und Datensicherheits-Schulung.

## Neu in dieser Ausbaustufe

- detailliertere Comic-Illustrationen für Maus, Katze, Boss und Spielwelt
- weichere Sprungsteuerung mit Jump-Buffer und Coyote-Time für bessere Spielbarkeit
- zusätzliche Leitführung im HUD: aktuelles Ziel und Pfeil zur nächsten Station
- leicht entschärfte Endzone mit zusätzlichen Plattformen vor dem Bossbereich
- stärkeres Feedback bei Checkpoints, Bossfreischaltung und Lernfortschritt
- Zertifikats-Finale mit Bestzeit, Punkten und Auszeichnung

## Technische Prüfung

- JavaScript-Dateien per `node --check` auf Syntax geprüft
- Lerninhalte als ES-Module erfolgreich geladen
- alle referenzierten Asset-Dateien im Projekt vorhanden

Hinweis: Für einen vollständigen Browser-Playtest wird Phaser zur Laufzeit aus einem CDN geladen. In GitHub Pages funktioniert das normal. In einer strikt offline Umgebung ohne DNS/Internet kann der automatische Laufzeittest deshalb nicht vollständig ausgeführt werden.

## Steuerung

- Bewegen: Pfeiltasten oder A / D
- Springen: Pfeil hoch, W oder Leertaste
- Hilfe: H
- Pause: ESC oder P

## Spielziel

1. Intro ansehen oder direkt ins Spiel springen.
2. Alle sieben Lernstationen erreichen.
3. An jeder Station die Lernkarte lesen und drei Fragen beantworten.
4. Vor dem Finale Jörg, den Datenschutzboss, im Bosskampf besiegen.
5. Am Ende der Katze den Bescheid der Datenschutzbehörde übergeben.

## Spielregeln

- 3 Leben pro Durchlauf
- falsche Antworten oder Abstürze kosten ein Leben
- bei 0 Leben startet die gesamte Schulung neu
- Bonuskäse erhöht die Punktzahl
- Bestzeit wird lokal im Browser gespeichert

## GitHub Pages Deployment

1. Repository anlegen und Projektdateien hochladen.
2. In GitHub unter **Settings > Pages** als Source den Branch mit `/ (root)` wählen.
3. Nach dem Deploy ist das Spiel direkt über GitHub Pages erreichbar.

## Projektstruktur

- `index.html` – Einstiegspunkt
- `styles.css` – Layout
- `js/content.js` – Lerninhalte, Quizfragen, Bossfragen
- `js/main.js` – Spiellogik und Szenen
- `assets/images/` – Comicgrafiken
- `assets/audio/` – Musik und Soundeffekte
