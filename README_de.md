🇬🇧 [English version](README.md)

<img src="assets/icons/icon-192.png" alt="BudgetAtlas Icon" width="160">

# BudgetAtlas

![License](https://img.shields.io/badge/license-GPL--3.0-green)
![PWA](https://img.shields.io/badge/PWA-ready-blue)
![HTML5](https://img.shields.io/badge/HTML5-pure-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-yellow)
![Maintained](https://img.shields.io/badge/maintained-yes-brightgreen)
![Mobile](https://img.shields.io/badge/mobile-friendly-blueviolet)
![No Server](https://img.shields.io/badge/no%20server-offline%20only-lightgrey)
![localStorage](https://img.shields.io/badge/storage-localStorage%20only-informational)
![No Tracking](https://img.shields.io/badge/tracking-none-success)
![No Login](https://img.shields.io/badge/login-not%20required-success)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-5865F2?logo=discord&logoColor=white)](https://discord.gg/Zy93AaYFaj)
[![Live Demo](https://img.shields.io/badge/%F0%9F%9A%80%20Live%20Demo-open-brightgreen)](https://schrotty74.github.io/BudgetAtlas/)

**Live App:** https://schrotty74.github.io/BudgetAtlas/

BudgetAtlas ist eine lokale, responsive Budget-PWA mit einem modernen „Focus & Flow“-Dashboard für Desktop- und Mobilgeräte.

Die App speichert Budgetdaten ausschließlich im Browser. Es gibt kein Benutzerkonto, kein Tracking und keine serverseitige Speicherung persönlicher Finanzdaten.

## Screenshots

Diese Screenshots zeigen ausschließlich fiktive Demodaten.

### Mobil

<img src="docs/screenshots/IMG_2651.jpeg" alt="BudgetAtlas auf dem Mobilgerät im dunklen Modus mit fiktiven Demodaten" width="220"> <img src="docs/screenshots/IMG_2655.jpg" alt="BudgetAtlas auf dem Mobilgerät im hellen Modus mit fiktiven Demodaten" width="220">

### Desktop

<img src="docs/screenshots/CleanShot%202026-08-29%20at%2010.56.10@2x.png" alt="BudgetAtlas auf dem Desktop im dunklen Modus mit fiktiven Demodaten" width="480">

<img src="docs/screenshots/CleanShot%202026-08-29%20at%2010.56.58@2x.png" alt="BudgetAtlas auf dem Desktop im hellen Modus mit fiktiven Demodaten" width="480">

## Funktionen

- Monatliches Polster, Einnahmen und Ausgaben auf einen Blick
- Animiertes Donut-Diagramm für den Ausgaben-Mix
- Animierte Prozentbalken für Ausgabenanteile
- Einnahmen und Ausgaben hinzufügen, bearbeiten und löschen
- Swipe-to-delete mit Rückgängig-Funktion auf Mobilgeräten
- Einklappbare Einnahmen- und Ausgabenbereiche
- Separat wählbare Einträge pro Seite für Einnahmen und Ausgaben (10–25; Standard: 10)
- Excel-Import mit Vorschau und Hinweisen zu fehlerhaften Zeilen
- Excel-Export
- PDF-Export
- PNG-Export des Dashboards
- JSON-Backup und Wiederherstellung mit Vorschau
- Deutsch / Englisch
- Dark- und Light-Mode
- Offline-fähige PWA mit Service Worker
- Update-Hinweis über `version.json`
- Unterstützung für `prefers-reduced-motion`
- Responsive Desktop-Sidebar und mobile Bottom-Navigation

## Demo-Arbeitsmappe

[`demo.xlsx`](docs/examples/demo.xlsx) enthält ausschließlich fiktive Beispieldaten und kann direkt zum Testen des Excel-Imports verwendet werden. Das Excel-Datenformat bleibt mit dem übernommenen Datenkern kompatibel.

Unterstützte Häufigkeiten:

- `Monatlich`
- `Alle 2 Monate`
- `Quartalsweise`
- `Jährlich`
- `Variabel`

## Datenschutz

Budgetdaten werden im lokalen Browser-Speicher (`localStorage`) gespeichert. Es gibt kein Backend, kein Benutzerkonto und kein Tracking.

## Technik

- Reines HTML, CSS und JavaScript
- Kein Framework
- Kein Paketmanager
- Kein Build-Schritt
- SheetJS für Excel-Import und -Export
- html2canvas wird bei Bedarf für den PNG-Export geladen
- Service Worker für Offline-Nutzung

## Status

BudgetAtlas verwendet eine eigene Versionslinie, die bei `v1.0` begann; die aktuell dokumentierte Version ist `v1.1`.

## Repository

https://github.com/Schrotty74/BudgetAtlas

## Repo-Aktivität

![Alt](https://repobeats.axiom.co/api/embed/c8cf3c56f0c9c8dc7954a1e45033ee696f5be103.svg "Repobeats analytics image")

## Lizenz

GPL-3.0 — siehe [`LICENSE`](LICENSE).
