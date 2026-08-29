# BudgetAtlas Next Steps

Stand: 2026-08-29

Diese Datei beschreibt nur bekannte, realistisch offene Punkte des aktuellen Projekts.

## Aktueller Stand

- Aktuelle dokumentierte App-Version: `v1.1`
- `main` enthält das eigenständige BudgetAtlas-Redesign.
- BudgetAtlas verwendet eine eigene Versionslinie, die mit `v1.0` begann; aktuell dokumentiert ist `v1.1`. Die frühere BudgetApp-Versionszählung wird nicht fortgeführt.
- Die Oberfläche wurde deutlich an die visuelle Referenz „Vorschlag 2 – Focus & Flow“ angeglichen.
- Datenmodell, `localStorage`, Budgetlogik und Import-/Exportlogik wurden dabei nicht umgebaut.
- Architektur: `index.html`, `app/css/styles.css`, `app/css/focus-flow.css`, `app/js/app.js`, `app/js/io.js`, `app/js/ui.js`, `app/js/focus-flow.js`, `sw.js`.
- `docs/examples/demo.xlsx` bleibt als kompatible Demo-Datei für Importtests erhalten.
- Kein Framework, kein Paketmanager und kein Build-Schritt wurden hinzugefügt.

## Priorität 1 – aktuellen Stand prüfen

- Live-Seite auf iPhone prüfen und direkt mit der Focus-&-Flow-Mobilvorlage vergleichen.
- Live-Seite am Desktop prüfen und direkt mit der Focus-&-Flow-Desktopvorlage vergleichen.
- Besonders prüfen: kompakter Monatskopf, Polster-Karte mit Bergsilhouette ohne aufsteigende Linie, Ausgaben-Mix, Einnahmen-/Ausgaben-Karten, Schnellzugriff und Bottom-Navigation mit „Mehr“ statt einer zusätzlichen mobilen Seitenleiste.
- Prüfen, ob Kartenhöhen, Abstände, Radien und Typografie auf realen Geräten noch weiter verdichtet werden müssen.
- Prüfen, dass der abgeleitete Ausgabenanteil und die Gesamtausgaben im Mix korrekt angezeigt werden.
- Deutsch/Englisch prüfen, insbesondere UI-Beschriftungen und Import-/Export-Funktionen.
- Dark-/Light-Mode im aktuellen Layout prüfen.
- PWA nach Aktualisierung einmal neu laden und danach Offline-/Flugmodus testen, damit der aktuelle Cache `budgetatlas-v1.1-focus-flow-6` bestätigt ist.

## Funktionsprüfung

- Vorhandene `localStorage`-Budgetdaten korrekt darstellen.
- Einnahmen und Ausgaben hinzufügen, bearbeiten, löschen und per Rückgängig wiederherstellen.
- Swipe-to-delete auf Mobilgerät prüfen.
- Einnahmen und Ausgaben mit mehr als der gewählten Eintragszahl prüfen: Auswahl 10/15/20/25, getrennte Speicherung für beide Listen, Seitennavigation, Bearbeiten, Löschen und Rückgängig auf allen Seiten.
- Excel-Import mit `docs/examples/demo.xlsx` inklusive Vorschau prüfen.
- JSON-Wiederherstellung inklusive Vorschau und Wiederherstellung der Listeneinstellungen prüfen.
- Excel-, PDF-, PNG- und JSON-Export prüfen.
- Deutsch/Englisch-Umschaltung prüfen.
- Dark-/Light-Mode prüfen.
- `prefers-reduced-motion` prüfen.
- Update-Hinweis über `version.json` prüfen.

## Priorität 2

- Nur tatsächlich gefundene Layout- oder Funktionsprobleme korrigieren.
- Eigenes BudgetAtlas-PWA-Icon erstellen und danach Manifest, HTML und Service Worker entsprechend ergänzen.
- Vor einer späteren öffentlichen Veröffentlichung README, Portfolio-Hinweise und öffentliche Links nochmals prüfen.

## Release

- BudgetAtlas verwendet aktuell die dokumentierte Version `v1.1`.
- Sichtbare Versionsanzeige, `version.json`, Update-Prüfung, Changelog und Service-Worker-Cache sind auf die BudgetAtlas-Versionslinie abgestimmt.
- Es wurde noch kein separater GitHub-Release oder Tag für BudgetAtlas erstellt.
- Kein Tag oder Release ohne ausdrücklichen Auftrag.

## Bekannte Einschränkungen

- Es gibt keine automatisierte Testsuite.
- Es gibt keine CI-Konfiguration.
- Ein vollständiger realer Geräte- und Browser-Funktionstest des aktuellen Stands ist weiterhin manuell durchzuführen.
