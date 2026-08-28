# BudgetAtlas Next Steps

Stand: 2026-08-28

Diese Datei beschreibt nur bekannte, realistisch offene Punkte des aktuellen Projekts.

## Aktueller Stand

- Aktuelle dokumentierte App-Version: `v1.8`
- `main` enthält das eigenständige BudgetAtlas-Redesign.
- Die Oberfläche wurde erneut deutlich enger an die visuelle Referenz „Vorschlag 2 – Focus & Flow“ angeglichen.
- Datenmodell, `localStorage`, Budgetlogik und Import-/Exportlogik wurden dabei nicht umgebaut.
- Architektur: `index.html`, `styles.css`, `app.js`, `io.js`, `ui.js`, `sw.js`.
- `demo.xlsx` bleibt als kompatible Demo-Datei für Importtests erhalten.
- Kein Framework, kein Paketmanager und kein Build-Schritt wurden hinzugefügt.

## Priorität 1 – aktuellen Reference-Match prüfen

- Live-Seite auf iPhone prüfen und direkt mit der Focus-&-Flow-Mobilvorlage vergleichen.
- Live-Seite am Desktop prüfen und direkt mit der Focus-&-Flow-Desktopvorlage vergleichen.
- Besonders prüfen: kompakter Monatskopf, Polster-Karte, Berg-/Verlaufslinie, Ausgaben-Mix, Einnahmen-/Ausgaben-Karten, Schnellzugriff und Bottom-Navigation.
- Prüfen, ob Kartenhöhen, Abstände, Radien und Typografie auf realen Geräten noch weiter verdichtet werden müssen.
- Prüfen, dass der abgeleitete Ausgabenanteil und die Gesamtausgaben im Mix korrekt angezeigt werden.
- Deutsch/Englisch prüfen, insbesondere neue UI-Beschriftungen und Import-/Export-Schaltfläche.
- Dark-/Light-Mode im angepassten Layout prüfen.
- PWA nach Aktualisierung einmal neu laden und danach Offline-/Flugmodus testen, damit der neue Cache `budgetatlas-v1.8-focus-flow-2` bestätigt ist.

## Funktionsprüfung nach dem UI-Umbau

- Vorhandene `localStorage`-Budgetdaten korrekt darstellen.
- Einnahmen und Ausgaben hinzufügen, bearbeiten, löschen und per Rückgängig wiederherstellen.
- Swipe-to-delete auf Mobilgerät prüfen.
- Excel-Import mit `demo.xlsx` inklusive Vorschau prüfen.
- JSON-Wiederherstellung inklusive Vorschau prüfen.
- Excel-, PDF-, PNG- und JSON-Export prüfen.
- `prefers-reduced-motion` prüfen.

## Priorität 2

- Nur tatsächlich gefundene Layout- oder Funktionsprobleme korrigieren.
- Eigenes BudgetAtlas-PWA-Icon erstellen und danach Manifest, HTML und Service Worker entsprechend ergänzen.
- Vor einer späteren öffentlichen Release-Version README, Portfolio-Hinweise und öffentliche Links nochmals prüfen.

## Release

- Die aktuelle visuelle Angleichung ist noch keine neue Release-Version.
- `v1.8`, `version.json` und `CHANGELOG.md` bleiben deshalb unverändert.
- Kein Tag oder Release ohne ausdrücklichen Auftrag.

## Bekannte Einschränkungen

- Es gibt keine automatisierte Testsuite.
- Es gibt keine CI-Konfiguration.
- Der aktuelle Reference-Match wurde noch nicht anhand eines neuen realen iPhone-/Desktop-Screenshots nach dieser Änderung bestätigt.
