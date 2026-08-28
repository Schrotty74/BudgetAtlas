# 💶 BudgetAtlas

![License](https://img.shields.io/badge/license-GPL--3.0-green)
![PWA](https://img.shields.io/badge/PWA-ready-blue)
![HTML5](https://img.shields.io/badge/HTML5-pure-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-yellow)
![Mobile](https://img.shields.io/badge/mobile-friendly-blueviolet)
![No Server](https://img.shields.io/badge/no%20server-offline%20only-lightgrey)
![localStorage](https://img.shields.io/badge/storage-localStorage%20only-informational)
![No Tracking](https://img.shields.io/badge/tracking-none-success)
![No Login](https://img.shields.io/badge/login-not%20required-success)

🇬🇧 [English version](README.md)

BudgetAtlas ist eine private, lokale PWA zur Verwaltung eines Haushaltsbudgets. Das neue Dashboard setzt auf eine klare Desktop-Sidebar, kompakte Karten, einen hervorgehobenen Monats-Puffer und eine eigene mobile Navigation.

---

## ✨ Funktionen

### Dashboard & Bedienung

- 📊 **Neues Dashboard-Redesign** — dunkles Navy-Layout mit Cyan-, Grün- und Orange-Akzenten
- 💰 **Monatliches Polster** — Einnahmen minus monatliche Ausgaben direkt als zentrale Kennzahl
- 🍩 **Animierter Ausgaben-Mix** — Donut-Diagramm mit Kategorien und hervorgehobenen Segmenten
- 📈 **Animierte Ausgabenbalken** — Prozentanteile wachsen beim Aktualisieren auf ihren Zielwert
- 🧭 **Desktop-Sidebar** — direkter Zugriff auf Übersicht, Einnahmen, Ausgaben und Ausgaben-Mix
- 📱 **Mobile Bottom-Navigation** — für kleine Displays optimierte Navigation mit Schnell-Hinzufügen
- ⚡ **Schnellzugriff** — Einnahmen oder Ausgaben direkt vom Dashboard hinzufügen
- 🗂️ **Einklappbare Bereiche** — Einnahmen und Ausgaben lassen sich ein- und ausklappen
- ✨ **Dezente UI-Animationen** — Kartenfeedback, weiches Löschen und aufklappende Formulare
- ♿ **Reduced Motion** — reduzierte Bewegungen werden über `prefers-reduced-motion` respektiert

### Einnahmen & Ausgaben

- ➕ **Einträge hinzufügen** — mit Icon, Bezeichnung und Betrag
- ✏️ **Inline bearbeiten** — bestehende Einträge direkt in der Liste ändern
- 👆 **Swipe to delete** — Einträge auf Mobilgeräten per Wischgeste entfernen
- ↩️ **Löschen rückgängig machen** — versehentlich gelöschte Einträge innerhalb von fünf Sekunden wiederherstellen
- 📅 **Mehrere Zahlungsintervalle** — Monatlich, alle 2 Monate, quartalsweise, jährlich oder variabel
- 💶 **Echter Zahlungsbetrag** — nicht-monatliche Kosten zeigen Zahlungsbetrag und monatlichen Budgetanteil getrennt

### Import & Export

- 📥 **Excel-Import mit Vorschau** — erkannte Einnahmen und Ausgaben vor dem Übernehmen prüfen
- ⚠️ **Fehlerhafte Excel-Zeilen erkennen** — ungültige Zeilen werden mit Grund angezeigt und übersprungen
- 📤 **Excel-Export** — Budget als `.xlsx` exportieren
- 🖨️ **PDF-Export** — druckbare Monatsübersicht erzeugen
- 📷 **PNG-Export** — Dashboard als Bild exportieren
- 💾 **JSON-Backup** — Budgetdaten und Einstellungen sichern
- ♻️ **JSON-Wiederherstellung mit Vorschau** — Inhalt vor dem Ersetzen der vorhandenen Daten prüfen

### PWA, Datenschutz & Einstellungen

- 📴 **Offline-fähig** — Service Worker cached die App für die Nutzung ohne Internet
- 📱 **Installierbar** — als PWA auf Mobilgerät oder Desktop nutzbar
- 🌗 **Dark / Light Mode** — zwischen dunklem und hellem Design wechseln
- 🌐 **Deutsch / Englisch** — Sprache jederzeit umschalten
- 💾 **Lokale Speicherung** — Budgetdaten werden im Browser über `localStorage` gespeichert
- 🔒 **Kein Server, kein Login, kein Tracking**

---

## 🔒 Datenschutz

BudgetAtlas arbeitet lokal im Browser. Budgetdaten werden nicht an einen Server übertragen und es gibt kein Benutzerkonto oder Tracking.

Die Budgetdaten und App-Einstellungen bleiben im lokalen Browser-Speicher. Exportdateien entstehen nur auf ausdrückliche Benutzeraktion.

---

## 📥 Excel-Import

Die App erkennt `.xlsx`-Dateien mit den Abschnitten **Einnahmen** und **Ausgaben**. Vor dem Import wird eine Vorschau angezeigt. Ungültige Zeilen werden aufgelistet und nicht übernommen.

Unterstützte Häufigkeiten:

`Monatlich` · `Alle 2 Monate` · `Quartalsweise` · `Jährlich` · `Variabel`

---

## 🛠 Technologie

- Reines HTML, CSS und JavaScript
- kein Framework
- kein Build-Schritt
- [SheetJS](https://sheetjs.com) für Excel-Import und -Export
- Service Worker für Offline-Unterstützung
- `localStorage` für lokale Datenhaltung

---

## 📄 Lizenz

GPL-3.0 — siehe [LICENSE](LICENSE)
