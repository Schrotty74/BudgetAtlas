🇬🇧 [English version](FEATURES.md) · [Zurück zur README](README_de.md)

# BudgetAtlas – Alle Funktionen

Diese Seite enthält die vollständige Funktionsübersicht des aktuellen BudgetAtlas-Redesigns.

## Dashboard und Übersicht

- Monatliches Polster aus monatlichen Einnahmen minus monatlichen Ausgaben
- Monatliche Einnahmen und Ausgaben auf einen Blick
- Animiertes Donut-Diagramm für den Ausgaben-Mix
- Animierte Prozentbalken für Ausgabenanteile
- Gesamtausgaben im Ausgaben-Mix
- Responsives Focus-&-Flow-Dashboard für Desktop und Mobilgeräte
- Schnellzugriff zum Hinzufügen von Einnahmen, Hinzufügen von Ausgaben und Öffnen von Import/Export

## Einnahmen und Ausgaben

- Einnahmen hinzufügen
- Ausgaben hinzufügen
- Bestehende Einnahmen und Ausgaben bearbeiten
- Einträge löschen
- Swipe-to-delete auf Mobilgeräten
- Versehentliches Löschen rückgängig machen
- Einklappbare Einnahmen- und Ausgabenbereiche
- Mehrere Ausgaben-Häufigkeiten:
  - Monatlich
  - Alle 2 Monate
  - Quartalsweise
  - Jährlich
  - Variabel
- Getrennte Speicherung des tatsächlichen Zahlungsbetrags und des monatlichen Budgetanteils bei nichtmonatlichen Ausgaben

## Listen und Navigation

- Getrennte Seitennavigation für Einnahmen und Ausgaben
- Wählbare Einträge pro Seite: 10, 15, 20 oder 25
- Die Seitengröße wird lokal gespeichert und in JSON-Backups übernommen
- Desktop-Sidebar
- Mobile Bottom-Navigation
- Mobiles **Mehr**-Menü für Ausgaben-Mix, Import/Export, Sprache, Darstellung und Listenansicht

## Import, Export und Backup

- Excel-Import von `.xlsx`-Dateien
- Importvorschau vor dem Übernehmen der Daten
- Fehlerhafte Excel-Zeilen werden mit Hinweisen aufgelistet und übersprungen
- Excel-Export
- PDF-Export
- PNG-Export des Dashboards
- JSON-Backup von Budgetdaten und App-Einstellungen
- JSON-Wiederherstellung mit Vorschau vor dem Ersetzen vorhandener Daten
- Kompatible fiktive Demo-Arbeitsmappe unter `docs/examples/demo.xlsx`

## Sprache und Darstellung

- Deutsche und englische Benutzeroberfläche
- Sprache jederzeit umschaltbar
- Dark-Mode
- Light-Mode
- Unterstützung für reduzierte Bewegung über `prefers-reduced-motion`

## PWA und Offline-Nutzung

- Installierbare Progressive Web App
- Offline-Nutzung über Service-Worker-Caching
- Responsive Layouts für Mobilgeräte und Desktop
- Eigene BudgetAtlas-PWA-Icons
- Update-Hinweis über `version.json`

## Datenschutz und Speicherung

- Budgetdaten werden lokal im Browser über `localStorage` gespeichert
- Kein Backend
- Kein Benutzerkonto
- Kein Tracking
- Exportdateien werden nur nach ausdrücklicher Benutzeraktion erstellt

## Dokumentation

- Englisches PDF-Handbuch
- Deutsches PDF-Handbuch
- Aktuelle Desktop- und Mobil-Screenshots mit fiktiven Demodaten
- Separate englische und deutsche README-Seiten
