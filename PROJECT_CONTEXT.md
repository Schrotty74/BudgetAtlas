# BudgetAtlas Project Context

Stand: 2026-08-28

Aktuelle dokumentierte App-Version: `v1.8`

Diese Datei beschreibt den aktuellen Projektkontext. Die allgemeinen Arbeits-, Git-, Veröffentlichungs- und Repository-Datenschutzregeln stehen verbindlich in `AGENTS.md`.

## Projektziel

BudgetAtlas ist eine statische Progressive Web App zur lokalen Verwaltung eines Haushaltsbudgets. Nutzer können monatliche Einnahmen und Ausgaben erfassen, bearbeiten, importieren, exportieren und offline verwenden.

Die App bleibt bewusst lokal: kein Backend, kein Login, kein Tracking und keine Server-Speicherung der Budgetdaten.

## Herkunft und Branch-Status

- Das aktuelle `main` von BudgetAtlas basiert auf dem Redesign aus `Schrotty74/BudgetApp` Branch `beta`.
- Das Redesign wurde als neuer Ausgangspunkt für BudgetAtlas übernommen.
- Alte BudgetApp-Handbücher, Screenshots, Demo-Dateien und große alte Branding-Grafiken wurden bewusst nicht übernommen, weil sie Oberfläche und Bezeichnungen des neuen Projekts nicht mehr korrekt darstellen.
- Die README-Dateien wurden für BudgetAtlas und das Redesign neu angepasst.
- BudgetAtlas verwendet weiterhin die bestehende Budget-Datenstruktur und dieselben `localStorage`-Schlüssel, damit der Datenkern kompatibel bleibt.

## Architektur

BudgetAtlas ist eine statische PWA ohne Framework, Paketmanager oder Build-Schritt.

Wichtige Dateien:

- `index.html`: Dashboard-Struktur und PWA-Einstieg
- `styles.css`: Redesign, Responsive-CSS, Dark-/Light-Variante und Animationen
- `app.js`: Budgetlogik, Datenmodell, Berechnungen, Sprache, Theme, Update-Prüfung und allgemeines UI-Verhalten
- `io.js`: Excel-, PDF-, PNG- und JSON-Import/-Export
- `ui.js`: Desktop-/Mobile-Navigation und Monatsanzeige
- `sw.js`: Service Worker und Offline-Cache
- `manifest.json`: PWA-Manifest
- `version.json`: Versionssignal für den Update-Hinweis

Es wurden keine JavaScript-Frameworks oder zusätzlichen UI-Abhängigkeiten eingeführt.

## Redesign

Das aktuelle Hauptlayout verwendet:

- dunkle Navy-Oberfläche mit Cyan-, Grün- und Orange-Akzenten
- Desktop-Sidebar
- große Karte für das monatliche Polster
- Ausgaben-Mix als Donut-Diagramm
- Karten für Einnahmen und Ausgaben
- Schnellzugriff zum Hinzufügen
- getrennte Detailbereiche für Einnahmen und Ausgaben
- Mobile-Bottom-Navigation mit zentralem Schnell-Hinzufügen-Button
- animierte Donut-Segmente und Ausgabenbalken
- dezentes Kartenfeedback
- weich öffnende Formulare und flüssigeres Löschen
- Unterstützung für `prefers-reduced-motion`

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
- PNG-Export des neuen Dashboard-Bereichs
- JSON-Backup und Wiederherstellung mit Vorschau
- Deutsch/Englisch
- Dark-/Light-Mode
- Offline-PWA und Service Worker
- Update-Hinweis über BudgetAtlas `version.json`
- lokale Speicherung ohne Server

## Redesign-Anschlusskorrekturen

Bei der Übernahme wurden zwei alte Selektoren aus der vorherigen Oberfläche korrigiert:

- Sprachwechsel verwendet jetzt den tatsächlich vorhandenen Polster-Titel im neuen Layout.
- Dashboard-Importanimation und PNG-Export verwenden jetzt `.main-content` statt der im Redesign nicht mehr vorhandenen `.container`-Klasse.

Außerdem wurden GitHub-, Update-, Export- und Backup-Bezeichnungen auf BudgetAtlas umgestellt.

## PWA-Icon

Die bisherigen BudgetApp-PNG-Icons wurden nicht übernommen, weil sie als altes Branding-/Visual-Asset behandelt werden. `manifest.json` und `sw.js` enthalten deshalb derzeit keine Verweise auf diese alten Dateien.

Vor einer öffentlichen Veröffentlichung sollte ein eigenes BudgetAtlas-PWA-Icon erstellt und anschließend in Manifest, HTML und Service Worker eingebunden werden.

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

Vor einer öffentlichen Veröffentlichung mindestens prüfen:

- Desktop-Layout bei breiten und mittleren Fenstergrößen
- iPhone-/Mobile-Layout inklusive Bottom-Navigation und Sidebar
- vorhandene `localStorage`-Budgetdaten werden korrekt dargestellt
- Einnahmen/Ausgaben hinzufügen, bearbeiten, löschen und rückgängig machen
- Excel- und JSON-Import inklusive Vorschau
- Excel-, PDF-, PNG- und JSON-Export
- DE/EN-Umschaltung
- Dark-/Light-Mode
- Animationen und `prefers-reduced-motion`
- Offline-Verhalten und Service-Worker-Cache
- Update-Prüfung gegen BudgetAtlas
- neues PWA-Icon nach dessen Erstellung

## Release

Die Übernahme nach BudgetAtlas `main` ist noch keine neue öffentliche Release-Version. `v1.8` und `version.json` wurden deshalb nicht hochgezählt.

Vor einem späteren Release müssen Versionsstellen, Changelog, `version.json`, Service-Worker-Cache und `PORTFOLIO_UPDATE.md` gezielt geprüft werden.

## Datenschutz

Budgetdaten bleiben lokal im Browser. Es gibt keinen Server, kein Konto und kein Tracking. Öffentliche Screenshots und Demo-Daten müssen synthetisch sein. Für alle Repository-Inhalte gelten zusätzlich die Datenschutzregeln aus `AGENTS.md`.
