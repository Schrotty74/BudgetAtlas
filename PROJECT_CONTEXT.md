# BudgetApp Project Context

Stand: 2026-08-28

Aktuelle dokumentierte App-Version: `v1.8`

Diese Datei beschreibt den aktuellen Projektkontext. Die allgemeinen Arbeits-, Git-, Veröffentlichungs- und Repository-Datenschutzregeln stehen verbindlich in `AGENTS.md`.

## Projektziel

BudgetApp ist eine einfache Progressive Web App zur lokalen Verwaltung eines Haushaltsbudgets. Nutzer koennen monatliche Einnahmen und Ausgaben erfassen, bearbeiten, importieren, exportieren und offline verwenden.

Die App bleibt bewusst klein: kein Backend, kein Login, kein Tracking, keine Server-Speicherung und lokale Datenhaltung im Browser.

## Branch-Status

- `main`: bestehende stabile Oberfläche. Sie darf durch die Beta-Redesign-Arbeit nicht verändert werden.
- `beta`: experimentelles vollständiges Redesign nach dem visuellen Konzept „Fokus & Flow“ mit dunklem Navy-Dashboard, Cyan-/Grün-/Orange-Akzenten, Desktop-Sidebar und Mobile-Bottom-Navigation.
- Das Redesign verwendet weiterhin die bestehende Datenstruktur und dieselben `localStorage`-Schlüssel, damit vorhandene Budgetdaten auf dem Beta-Branch nutzbar bleiben.
- Eine Übernahme von `beta` nach `main` ist nicht beschlossen und darf nicht automatisch erfolgen.

## Architektur

Die App ist eine statische PWA ohne Framework, Paketmanager oder Build-Schritt.

Wichtige Dateien auf `beta`:

- `index.html`: schlanke Struktur und semantische Dashboard-Bereiche
- `styles.css`: vollständiges Redesign, Responsive-CSS, Dark-/Light-Variante und Animationen
- `app.js`: bestehende Budgetlogik, Datenmodell, Berechnungen und allgemeines UI-Verhalten
- `io.js`: bestehende Import-/Export-Logik für Excel, PDF, PNG und JSON
- `ui.js`: ausschließlich Redesign-spezifische Navigation, Mobile-Sidebar, Bottom-Navigation und Monatsanzeige
- `sw.js`: Service Worker und Offline-Cache; cached auf `beta` auch `ui.js`
- `manifest.json`: PWA-Manifest
- `version.json`: Versionssignal für den Update-Hinweis

Die Aufteilung hält `index.html` klein und trennt Redesign-Navigation von Budget- und Import-/Export-Logik. Es wurden keine neuen externen JavaScript-Frameworks oder UI-Abhängigkeiten eingeführt.

## Redesign „Fokus & Flow“

Zielbild des Beta-Branches:

- dunkle Navy-Oberfläche mit leuchtenden Cyan-, Grün- und Orange-Akzenten
- Desktop: feste Sidebar, kompakte Kopfzeile, große Polster-Karte, Ausgaben-Mix daneben, Kartenraster und Detailbereiche
- Tablet: reduzierte Sidebar und gestapelte Hauptkarten
- Mobil: ausblendbare Sidebar, kompakte Karten, feste Bottom-Navigation und zentraler Schnell-Hinzufügen-Button
- vorhandene Donut-, Balken-, Karten-, Formular- und Löschanimationen bleiben eingebunden
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

## Übernommene Funktionen

Der Beta-Branch soll funktional auf dem bestehenden Datenkern aufbauen. Weiterhin vorgesehen sind insbesondere:

- monatliches Polster, Einnahmen und Ausgaben
- Donut-Chart für Ausgaben
- Hinzufügen, Bearbeiten und Löschen
- Swipe-to-delete mit Rückgängig-Option
- Excel-Import und Excel-Export
- PDF- und PNG-Export
- JSON-Backup und Wiederherstellung
- Import-Vorschau
- Deutsch/Englisch
- Dark-/Light-Mode
- Offline-PWA und Service Worker
- Update-Hinweis über `version.json`
- lokale Speicherung ohne Server

## Externe Abhängigkeiten

- SheetJS über CDN für Excel-Import/-Export
- Google Fonts über CSS-Import

Es wurden für das Beta-Redesign keine weiteren externen Abhängigkeiten hinzugefügt.

## Lokaler Test

```bash
python3 -m http.server 8087
```

Danach die App unter `http://127.0.0.1:8087/` öffnen.

## Testschwerpunkte für `beta`

Vor einer möglichen Übernahme nach `main` mindestens prüfen:

- Desktop-Layout bei breiten und mittleren Fenstergrößen
- iPhone-/Mobile-Layout inklusive Bottom-Navigation und Sidebar
- bestehende Daten aus `localStorage` werden korrekt dargestellt
- Einnahmen/Ausgaben hinzufügen, bearbeiten, löschen und rückgängig machen
- Excel- und JSON-Import inklusive Vorschau
- alle Exporte
- DE/EN-Umschaltung
- Dark-/Light-Mode
- `prefers-reduced-motion`
- Offline-Verhalten und Cache-Aktualisierung des Beta-Service-Workers

## Release-Regeln

Das Beta-Redesign ist derzeit kein Release. Deshalb bleiben App-Version `v1.8`, `version.json` und `CHANGELOG.md` unverändert.

Vor einem späteren Release müssen Versionsstellen, Changelog, `version.json`, Service-Worker-Cache und `PORTFOLIO_UPDATE.md` gezielt geprüft werden.

## Datenschutz

Budgetdaten bleiben lokal im Browser. Es gibt keinen Server, kein Konto und kein Tracking. Öffentliche Screenshots und Demo-Daten müssen synthetisch sein. Für alle Repository-Inhalte gelten zusätzlich die Datenschutzregeln aus `AGENTS.md`.
