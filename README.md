# Data Quest – Die Maus und das Geheimnis der Daten (v8)

## Konzept
Diese Version wurde als saubere Neuimplementierung ohne externe Game-Engine gebaut, damit sie direkt auf GitHub Pages läuft und keine CDN- oder Phaser-Fehler mehr produziert.

### Gestaltungsprinzipien
- **Lernen und Spiel sind getrennt**: Das Level bleibt frei von langen Textblöcken. Inhalte erscheinen ausschließlich in Dialogfenstern.
- **Jede Station ist ein klares Mini-Event**: Leuchtende Stationsterminals, Interaktionshinweis, danach Dialogseiten und Quiz.
- **Lesbarkeit zuerst**: Mehrseitige Fenster, klare Überschriften, große Buttons, kein Überlagern der Spielwelt.
- **Einheitliche Dramaturgie**: Intro → 7 Stationen → Bosskampf → Finale → Zertifikats-Screen.
- **GitHub-Pages-tauglich**: Keine Build-Schritte, kein Bundler, kein CDN.

### Leveldesign
- Eine lange 2D-Welt mit acht Themenzonen
- Jede Zone hat eine eigene visuelle Kulisse (Grundrechte, Daten, Rollen, Rechtsgrundlagen, Rechte, Unternehmen, Sicherheit, Boss)
- Gut sichtbare Plattformen, klare Wege, Interaktionsprompt in der Nähe einer Station
- Fortschrittsleiste unten im Spiel, HUD oben

### Steuerung
- Pfeiltasten / A,D: laufen
- Leertaste: springen
- E: Station, Boss oder Finale auslösen

## Veröffentlichung auf GitHub Pages
1. Dateien dieses Ordners in ein öffentliches GitHub-Repository hochladen.
2. In **Settings → Pages** `Deploy from a branch` wählen.
3. Branch `main`, Folder `/ (root)` speichern.
4. Seite mit Strg+F5 neu laden.

## Hinweise
- Audio wird vom Browser erst nach einem Klick freigegeben.
- Die Bestzeit wird im Browser per `localStorage` gespeichert.
