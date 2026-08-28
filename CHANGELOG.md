# Changelog

Alle wesentlichen Änderungen an BudgetAtlas werden hier dokumentiert.

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

## Legacy: BudgetApp-Versionshistorie

Die folgenden Einträge stammen aus der Vorgänger-App BudgetApp. Sie werden nur als Entwicklungshistorie aufbewahrt und gehören nicht zur neuen BudgetAtlas-Versionszählung.

## [1.8] – 2026-08-27

### Neu
- **Import-Prüfung** — Excel-Import zeigt vor dem Übernehmen die erkannten Einnahmen und Ausgaben; fehlerhafte Zeilen werden mit Zeilennummer und Grund genannt und übersprungen
- **JSON-Wiederherstellung mit Inhaltsübersicht** — Vor dem Ersetzen werden Einnahmen, Ausgaben und enthaltene Einstellungen angezeigt; Wiederherstellen und Abbrechen sind klar getrennt

### Geändert
- **Bestätigungsdialoge** — Als zentrierte, gut lesbare Dialoge mit deutlich hervorgehobener Bestätigungsaktion gestaltet
- **Handbücher** — Deutsche und englische PDF-Handbücher mit Erklärungen und Screenshots der Import- und Wiederherstellungsprüfung aktualisiert

---

## [1.7] – 2026-08-27

### Neu
- **Löschen rückgängig machen** — Gelöschte Einnahmen und Ausgaben können innerhalb von fünf Sekunden an ihrer ursprünglichen Position wiederhergestellt werden; verfügbar beim Wischen und über den Löschen-Button, auf Deutsch und Englisch

---

## [1.6] – 2026-07-08

### Neu
- **JSON-Backup** — Vollständiges Backup und Wiederherstellung für Budgetdaten und App-Einstellungen direkt im Import/Export-Menü

---

## [1.5] – 2026-07-04

### Neu
- **Update-Hinweis** — Die App prüft einmal täglich ob eine neue Version auf GitHub verfügbar ist; bei einem Update erscheint ein Banner mit Tippen-zum-Aktualisieren (schließbar, DE/EN übersetzt)

---

## [1.4] – 2026-06-27

### Neu
- **Import / Export Menü** — Alle vier Aktionen (Excel importieren, Excel exportieren, PDF exportieren, Bild exportieren) in einem einzigen Dropdown-Menü zusammengefasst; öffnet sich per Tipp und schließt sich nach Auswahl oder Klick außerhalb automatisch

---

## [1.3] – 2026-06-27

### Neu
- **Echter Zahlungsbetrag** — Nicht-monatliche Ausgaben (z.B. quartalsweise, jährlich) zeigen jetzt den tatsächlichen Betrag statt dem monatlichen Äquivalent; die Häufigkeit erscheint als kleine graue Zeile unter dem Namen
- **Einklappbare Sektionen** — Einnahmen & Ausgaben lassen sich per Tipp auf den Sektions-Titel ein- und ausklappen; Zustand bleibt nach Neuladen erhalten

### Geändert
- Redundanter „🔁 Monatlich"-Badge bei Einnahmen entfernt
- README (DE & EN) um neue Features ergänzt

### Behoben
- Ausrichtung der Einnahmen-Zeilen nach Layout-Umbau korrigiert

---

## [1.2] – 2026-06-27

### Neu
- **Bild-Export** — Gesamte App-Ansicht als PNG exportieren (auch als installierte PWA)
- **Tägliche Erinnerung** — Push-Benachrichtigung zur selbst gewählten Uhrzeit; auf iPhone/iPad nur als installierte PWA verfügbar
- **Live-Demo-Button** — Badge in der README verlinkt direkt zur GitHub Pages Demo
- **Screenshots in README** — Zwei Demo-Screenshots mit Beispieldaten

### Geändert
- Fehlermeldung bei Benachrichtigungen unter iOS Safari erklärt nun, dass die PWA installiert werden muss
- README-Feature-Liste aktualisiert

---

## [1.1] – 2026-06-26

### Neu
- **Neues Logo** — Wallet-Icon ersetzt das bisherige Euro-Symbol
- **PWA-Icon** — Neues Logo wird als App-Icon verwendet (Home-Bildschirm, Desktop-Install)
- **Badges** — Tech-, Sicherheits- und Status-Badges in beiden READMEs

### Geändert
- Logo-Größe in der README auf 160 px erhöht

---

## [1.0] – 2026-06-23

### Erstveröffentlichung von BudgetApp
- **Übersicht** — Monatliches Polster, Einnahmen & Ausgaben auf einen Blick
- **Donut-Chart** — Visuelle Aufschlüsselung der Ausgaben-Kategorien mit Legende
- **Excel-Import** — `.xlsx` Dateien einlesen; Einnahmen & Ausgaben werden automatisch erkannt
- **Excel-Export** — Budget als `.xlsx` exportieren
- **PDF-Export** — Druckfertige Monatsübersicht
- **Einträge bearbeiten** — Hinzufügen, bearbeiten und löschen; inline ohne Seitenwechsel
- **Swipe to delete** — Einträge per Wischgeste auf dem Handy entfernen
- **Dark / Light Mode** — Zwischen dunklem und hellem Design wechseln
- **Sprachwechsel** — Jederzeit zwischen Deutsch und Englisch wechseln
- **Lokale Speicherung** — Alle Daten bleiben ausschließlich im Browser (localStorage)
- **Offline-fähig** — Service Worker cached die App für die Nutzung ohne Internet
- **Installierbar** — Als PWA auf iPhone/iPad oder Desktop speicherbar
