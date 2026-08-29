# BudgetAtlas

BudgetAtlas ist eine lokale, responsive Budget-PWA mit einem modernen „Fokus & Flow“-Dashboard für Desktop und Mobilgeräte.

Die App speichert Budgetdaten ausschließlich lokal im Browser. Es gibt kein Konto, kein Tracking und keine Server-Speicherung der persönlichen Finanzdaten.

## Funktionen

- Monatliches Polster, Einnahmen und Ausgaben auf einen Blick
- Animierter Ausgaben-Mix als Donut-Diagramm
- Animierte Prozentbalken für Ausgabenanteile
- Einnahmen und Ausgaben hinzufügen, bearbeiten und löschen
- Swipe-to-delete mit Rückgängig-Funktion auf Mobilgeräten
- Einklappbare Einnahmen- und Ausgabenbereiche
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

## Demo-Excel

Die Datei [`demo.xlsx`](docs/examples/demo.xlsx) enthält ausschließlich fiktive Beispieldaten und kann direkt zum Testen des Excel-Imports verwendet werden. Das Excel-Datenformat ist mit dem übernommenen Datenkern kompatibel geblieben.

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
- html2canvas wird für den PNG-Export bei Bedarf geladen
- Service Worker für Offline-Nutzung

## Status

BudgetAtlas startet nach dem Redesign als eigenständiges Projekt mit einer eigenen Versionslinie bei `v1.0`.

## Repository

https://github.com/Schrotty74/BudgetAtlas

## Lizenz

GPL-3.0 — siehe [`LICENSE`](LICENSE).

🇬🇧 [English version](README.md)
