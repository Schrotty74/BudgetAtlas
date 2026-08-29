# Changelog

Alle wesentlichen Änderungen an BudgetAtlas werden hier dokumentiert.

BudgetAtlas entstand als eigenständiges Redesign aus BudgetApp. Übernommene Funktionen und Datenformate sind Teil der Projektgeschichte, die frühere Versionsreihe ist jedoch separat archiviert: [`docs/legacy/BudgetApp_CHANGELOG.md`](docs/legacy/BudgetApp_CHANGELOG.md).

---

## [1.1] – 2026-08-29

### Geändert
- Redundante mobile Seitenleiste entfernt; „Mehr“ ist auf Mobilgeräten der einzige Zugang zu Ausgaben-Mix, Import/Export, Sprache und Darstellung
- Mobile Kopfzeile ohne Hamburger-Button vereinfacht
- Monatliches Polster und Ausgaben-Mix mit einem dezenten Schwebeeffekt ergänzt
- Seitennavigation für längere Einnahmen- und Ausgabenlisten ergänzt; Standard sind 10 Einträge pro Seite
- Im mobilen „Mehr“-Menü kann die Eintragszahl für Einnahmen und Ausgaben getrennt auf 10, 15, 20 oder 25 gesetzt werden; die Auswahl wird lokal gespeichert und in JSON-Backups übernommen
- Seitennavigation mit kompakten runden Pfeilen und einer Anzeige wie „1 / 3“ überarbeitet
- Demo-Excel auf jeweils 30 fiktive Einnahmen und Ausgaben für Paginationstests erweitert
- Offline-Cache und Update-Signal auf `v1.1` aktualisiert

---

## [1.0] – 2026-08-28

### BudgetAtlas
- Eigenständige Versionslinie für BudgetAtlas gestartet
- Vollständiges Focus-&-Flow-Redesign gegenüber BudgetApp
- Bestehende Budget-, Import-/Export- und lokale Datenfunktionen übernommen
- Neue BudgetAtlas-Oberfläche für Desktop und Mobilgeräte
- Dark-/Light-Mode sowie mobile Navigation für das neue Layout angepasst
- Versionsanzeige, Update-Prüfung und Service-Worker-Cache auf `v1.0` umgestellt

---
