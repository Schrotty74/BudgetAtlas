# BudgetAtlas Project Context

Stand: 2026-08-28

Aktuelle dokumentierte App-Version: `v1.8`

Diese Datei beschreibt den aktuellen Projektkontext. Die allgemeinen Arbeits-, Git-, Veröffentlichungs- und Repository-Datenschutzregeln stehen verbindlich in `AGENTS.md`.

## Projektziel

BudgetAtlas ist eine statische Progressive Web App zur lokalen Verwaltung eines Haushaltsbudgets. Nutzer können monatliche Einnahmen und Ausgaben erfassen, bearbeiten, importieren, exportieren und offline verwenden.

Die App bleibt bewusst lokal: kein Backend, kein Login, kein Tracking und keine Server-Speicherung der Budgetdaten.

## Herkunft und Branch-Status

- Das aktuelle `main` von BudgetAtlas basiert auf dem Redesign aus `Schrotty74/BudgetApp` Branch `beta`.
- BudgetAtlas ist inzwischen ein eigenständiges Repository und `main` ist der aktuelle Entwicklungsstand.
- Alte BudgetApp-Handbücher, Screenshots und große alte Branding-Grafiken wurden bewusst nicht übernommen, weil sie Oberfläche und Bezeichnungen des neuen Projekts nicht mehr korrekt darstellen.
- `demo.xlsx` ist kompatibel und bleibt als Demo-Datei für Excel-Importtests erhalten.
- BudgetAtlas verwendet weiterhin die bestehende Budget-Datenstruktur und dieselben `localStorage`-Schlüssel.

## Architektur

BudgetAtlas ist eine statische PWA ohne Framework, Paketmanager oder Build-Schritt.

Wichtige Dateien:

- `index.html`: Dashboard-Struktur und PWA-Einstieg
- `styles.css`: Focus-&-Flow-Redesign, Responsive-CSS, Dark-/Light-Variante und Animationen
- `app.js`: Budgetlogik, Datenmodell, Berechnungen, Sprache, Theme, Update-Prüfung und allgemeines UI-Verhalten
- `io.js`: Excel-, PDF-, PNG- und JSON-Import/-Export
- `ui.js`: Desktop-/Mobile-Navigation, Monatsanzeige und rein darstellungsbezogene Dashboard-Metadaten
- `sw.js`: Service Worker und Offline-Cache
- `manifest.json`: PWA-Manifest
- `version.json`: Versionssignal für den Update-Hinweis
- `demo.xlsx`: kompatible Demo-Datei mit fiktiven Beispieldaten für Excel-Importtests

Die Budget- und Import-/Exportlogik wurde bei der visuellen Focus-&-Flow-Angleichung nicht umgebaut.

## Focus & Flow – visuelle Referenz

Die verbindliche visuelle Richtung ist das Konzept „Vorschlag 2 – Focus & Flow“ mit dichter, hochwertiger Finanz-Dashboard-Optik für Desktop und Mobilgerät.

Der aktuelle Stand wurde stärker an diese Referenz angeglichen:

- kompakter Monatskopf statt großer mobiler App-Überschrift
- Desktop-Sidebar mit zurückhaltender Navigation
- deutlich kompaktere Karten, Abstände und Radien
- große Polster-Karte mit dunkler Bergsilhouette und durchgehender grüner Verlaufslinie
- Fortschrittsbalken plus abgeleiteter Ausgabenanteil
- kompakter Ausgaben-Mix mit Donut, Legende und Gesamtausgaben
- Einnahmen-/Ausgaben-Karten mit Icons und dezenten Trend-Akzenten
- Schnellzugriff nur für tatsächlich vorhandene Funktionen: Einnahme, Ausgabe und Import/Export
- Mobile-Bottom-Navigation mit zentralem Plus-Button
- Cyan wird primär für Navigation/Aktionen eingesetzt, Grün für positive Werte und Orange für Ausgaben
- keine Konzeptfunktionen wie Belegscanner, Konten, Budgets oder Ziele wurden erfunden
- `prefers-reduced-motion` bleibt berücksichtigt

## Datenformate und Speicherung

Primäre App-Daten liegen in `localStorage`.

Bekannte aktive Schlüssel:

- `budgetData`: Einnahmen und Ausgaben
- `budgetLang`: Spracheinstellung (`de` oder `en`)
- `budgetTheme`: Theme (`dark` oder `light`)
- `sectionState`: Zustand eingeklappter Sektionen
- `updateCheck`: Zeitstempel und zuletzt erkannte Online-Version

Interne Ausgaben-Frequenzen bleiben deutsch gespeichert:

- `Monatlich`
- `Alle 2 Monate`
- `Quartalsweise`
- `Jährlich`
- `Variabel`

JSON-Backups enthalten Budgetdaten plus App-Einstellungen. Bei nicht-monatlichen Ausgaben werden realer Zahlungsbetrag (`amount`) und monatlicher Budgetanteil (`monthly`) getrennt gespeichert.

## Funktionen

Aktuell enthalten sind insbesondere:

- monatliches Polster, Einnahmen und Ausgaben
- animierter Donut-Chart für Ausgaben
- Prozentbalken für Ausgabenanteile
- Hinzufügen, Bearbeiten und Löschen
- Swipe-to-delete mit Rückgängig-Option
- einklappbare Einnahmen-/Ausgabenbereiche
- Excel-Import mit Vorschau und Fehlerhinweisen
- Excel-Export
- PDF-Export
- PNG-Export des Dashboard-Bereichs
- JSON-Backup und Wiederherstellung mit Vorschau
- Deutsch/Englisch
- Dark-/Light-Mode
- Offline-PWA und Service Worker
- Update-Hinweis über BudgetAtlas `version.json`
- lokale Speicherung ohne Server

## Redesign-spezifische UI-Metadaten

`ui.js` ergänzt ausschließlich abgeleitete Darstellungswerte und verändert keine gespeicherten Budgetdaten:

- Ausgabenanteil = monatliche Ausgaben geteilt durch monatliche Einnahmen
- Gesamtausgaben im Mix werden aus dem bereits gerenderten Monatswert übernommen
- zusätzliche Beschriftungen reagieren auf Deutsch/Englisch

## PWA-Cache

Der Service-Worker-Cache wurde für die Focus-&-Flow-Angleichung auf `budgetatlas-v1.8-focus-flow-2` gesetzt, damit bestehende Installationen die geänderten HTML-/CSS-/UI-Dateien neu laden.

## PWA-Icon

Die bisherigen BudgetApp-PNG-Icons wurden nicht übernommen. `manifest.json` und `sw.js` enthalten derzeit keine Verweise auf diese alten Dateien.

Vor einer späteren Veröffentlichung mit eigenständigem Branding sollte ein eigenes BudgetAtlas-PWA-Icon erstellt und anschließend in Manifest, HTML und Service Worker eingebunden werden.

## Externe Abhängigkeiten

- SheetJS über CDN für Excel-Import/-Export
- Google Fonts über CSS-Import
- html2canvas wird beim PNG-Export bei Bedarf dynamisch vom CDN geladen

## Lokaler Test

```bash
python3 -m http.server 8087
```

Danach die App unter `http://127.0.0.1:8087/` öffnen.

## Testschwerpunkte

Nach der aktuellen visuellen Angleichung insbesondere prüfen:

- Desktop-Layout gegen die Focus-&-Flow-Referenz
- iPhone-/Mobile-Layout gegen die Focus-&-Flow-Referenz
- Header, Polster-Karte, Ausgaben-Mix, Summary-Karten und Bottom-Navigation
- vorhandene `localStorage`-Budgetdaten
- Hinzufügen, Bearbeiten, Löschen und Rückgängig
- Excel-Import mit `demo.xlsx`
- JSON-Wiederherstellung
- Excel-, PDF-, PNG- und JSON-Export
- DE/EN-Umschaltung
- Dark-/Light-Mode
- `prefers-reduced-motion`
- Offline-/Flugmodus nach Laden des neuen Service Workers

## Release

Die aktuelle visuelle Überarbeitung ist noch keine neue Release-Version. `v1.8`, `version.json` und `CHANGELOG.md` wurden deshalb nicht hochgezählt.

Vor einem späteren Release müssen Versionsstellen, Changelog, `version.json`, Service-Worker-Cache und `PORTFOLIO_UPDATE.md` gezielt geprüft werden.

## Datenschutz

Budgetdaten bleiben lokal im Browser. Es gibt keinen Server, kein Konto und kein Tracking. Öffentliche Screenshots und Demo-Daten müssen synthetisch sein. Für alle Repository-Inhalte gelten zusätzlich die Datenschutzregeln aus `AGENTS.md`.
