# BudgetApp Next Steps

Stand: 2026-08-28

Diese Datei beschreibt nur bekannte, realistisch offene Punkte des aktuellen Branches.

## Aktueller Stand

- Aktuelle dokumentierte App-Version: `v1.8`
- `main` bleibt die unveränderte stabile Oberfläche.
- `beta` enthält das vollständige Redesign „Fokus & Flow“.
- Architektur auf `beta`: `index.html`, `styles.css`, `app.js`, `io.js`, `ui.js`, `sw.js`.
- Datenhaltung bleibt `localStorage` und kompatibel zum bisherigen Datenmodell.
- Import-/Export-Logik bleibt in `io.js`.
- Redesign-spezifische Navigation und Mobile-UI liegen in `ui.js`.
- Kein Framework, kein Paketmanager und kein Build-Schritt wurden hinzugefügt.

## Priorität 1 – Beta prüfen

- Redesign im Desktop-Browser visuell prüfen: Sidebar, große Polster-Karte, Ausgaben-Mix, Kartenraster und Detailbereiche.
- Redesign auf iPhone/Mobilgerät prüfen: Hamburger-Sidebar, Bottom-Navigation, zentraler Schnell-Hinzufügen-Button, Formulare und Listen.
- Prüfen, dass vorhandene `localStorage`-Budgetdaten aus der bisherigen App korrekt im Beta-Redesign erscheinen.
- Einnahmen und Ausgaben hinzufügen, bearbeiten, löschen und per Rückgängig wiederherstellen.
- Swipe-to-delete auf Mobilgerät prüfen.
- Excel-Import und JSON-Wiederherstellung inklusive Vorschau prüfen.
- Excel-, PDF-, PNG- und JSON-Export prüfen.
- Deutsch/Englisch prüfen.
- Dark-/Light-Mode im neuen Layout prüfen.
- `prefers-reduced-motion` im neuen Layout prüfen.
- Beta-PWA einmal online laden und danach Offline-/Flugmodus inklusive `ui.js` prüfen.

## Priorität 2

- Nach den manuellen Beta-Tests nur tatsächlich gefundene Layout- oder Funktionsprobleme korrigieren.
- Vor einer möglichen Übernahme nach `main` einen direkten Vergleich `main` gegen `beta` durchführen und sicherstellen, dass keine Datenformatänderung unbeabsichtigt eingeführt wurde.
- Eine Übernahme nach `main` nur nach ausdrücklicher Freigabe durchführen.

## Release

- Das Redesign ist derzeit kein Release.
- `v1.8`, `version.json` und `CHANGELOG.md` bleiben deshalb unverändert.
- Keine Veröffentlichung, kein Tag und keine Zusammenführung nach `main` ohne ausdrücklichen Auftrag.

## Bekannte Einschränkungen

- Es gibt keine automatisierte Testsuite.
- Es gibt keine CI-Konfiguration.
- Das neue Beta-Layout ist noch nicht vollständig auf realen Desktop- und Mobilgeräten manuell verifiziert.
