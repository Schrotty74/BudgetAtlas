# Sicherheitsrichtlinie

[English](SECURITY.md)

## Unterstützte Versionen

Sicherheitsmeldungen werden für die aktuell veröffentlichte BudgetAtlas-Version entgegengenommen.

## Sicherheitslücke melden

Bitte veröffentliche sensible Details zu Sicherheitslücken nicht in einem öffentlichen GitHub-Issue. Kontaktiere den Repository-Inhaber privat. Nenne die BudgetAtlas-Version, Browser und Betriebssystem, Schritte zum Reproduzieren und bereinigte Logs oder Screenshots. Füge niemals echte Budgets, Einnahmen-/Ausgabendaten, Excel-Dateien, JSON-Backups oder exportierte Finanzberichte bei.

## Geltungsbereich

Relevante Meldungen umfassen unter anderem die Speicherung von Budgetdaten in `localStorage`, Excel-Import/-Export, JSON-Backup und -Wiederherstellung, PDF-/PNG-Export, Service-Worker-/Offline-Caching, Update-Prüfungen und Drittanbieter-Browserbibliotheken für Exportfunktionen.

BudgetAtlas speichert persönliche Finanzdaten lokal im Browser und besitzt weder ein Benutzerkonto noch serverseitige Budgetspeicherung. Besonders wichtig sind Meldungen zu unbeabsichtigter Netzwerkübertragung, unsicheren Importdateien, Script-Injection, beschädigten Wiederherstellungen, Offenlegung lokaler Finanzdaten oder unsicherem Offline-Caching.

Vielen Dank, dass du dabei hilfst, BudgetAtlas und seine Nutzer sicher zu halten.
