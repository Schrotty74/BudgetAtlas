# BudgetAtlas Next Steps

Stand: 2026-08-28

Diese Datei beschreibt nur bekannte, realistisch offene Punkte des aktuellen Projekts.

## Aktueller Stand

- Aktuelle dokumentierte App-Version: `v1.8`
- `main` enthält das vollständige Redesign „Fokus & Flow“ und ist der aktuelle Entwicklungsstand von BudgetAtlas.
- Architektur: `index.html`, `styles.css`, `app.js`, `io.js`, `ui.js`, `sw.js`.
- Datenhaltung bleibt `localStorage` und kompatibel zum bisherigen Budget-Datenmodell.
- Import-/Export-Logik liegt in `io.js`.
- Redesign-spezifische Navigation und Mobile-UI liegen in `ui.js`.
- `demo.xlsx` ist als kompatible Demo-Datei vorhanden und kann weiterhin für Importtests verwendet werden.
- Kein Framework, kein Paketmanager und kein Build-Schritt wurden hinzugefügt.

## Priorität 1 – Redesign prüfen

- Desktop-Layout visuell prüfen: Sidebar, große Polster-Karte, Ausgaben-Mix, Kartenraster und Detailbereiche.
- iPhone-/Mobile-Layout prüfen: Hamburger-Sidebar, Bottom-Navigation, zentraler Schnell-Hinzufügen-Button, Formulare und Listen.
- Prüfen, dass vorhandene `localStorage`-Budgetdaten korrekt dargestellt werden.
- Einnahmen und Ausgaben hinzufügen, bearbeiten, löschen und per Rückgängig wiederherstellen.
- Swipe-to-delete auf Mobilgerät prüfen.
- Excel-Import mit `demo.xlsx` und weiteren Testdateien inklusive Vorschau prüfen.
- JSON-Wiederherstellung inklusive Vorschau prüfen.
- Excel-, PDF-, PNG- und JSON-Export prüfen.
- Deutsch/Englisch prüfen.
- Dark-/Light-Mode im neuen Layout prüfen.
- `prefers-reduced-motion` im neuen Layout prüfen.
- PWA einmal online laden und danach Offline-/Flugmodus inklusive `ui.js` prüfen.
- Update-Prüfung gegen das BudgetAtlas-Repository prüfen.

## Priorität 2

- Nach den manuellen Tests nur tatsächlich gefundene Layout- oder Funktionsprobleme korrigieren.
- Eigenes BudgetAtlas-PWA-Icon erstellen und danach Manifest, HTML und Service Worker entsprechend ergänzen.
- Vor einer öffentlichen Veröffentlichung README, Portfolio-Hinweise und öffentliche Links nochmals prüfen.

## Release

- Das Redesign ist derzeit noch keine neue öffentliche Release-Version.
- `v1.8`, `version.json` und `CHANGELOG.md` bleiben deshalb unverändert.
- Keine Veröffentlichung und kein Tag ohne ausdrücklichen Auftrag.

## Bekannte Einschränkungen

- Es gibt keine automatisierte Testsuite.
- Es gibt keine CI-Konfiguration.
- Das neue Layout ist noch nicht vollständig auf realen Desktop- und Mobilgeräten manuell verifiziert.
