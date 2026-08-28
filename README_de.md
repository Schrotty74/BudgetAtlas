<img src="icon.png" alt="BudgetApp Icon" width="160">

# 💶 BudgetApp

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

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-ansehen-brightgreen)](https://schrotty74.github.io/BudgetApp)

🇬🇧 [English version](README.md) · 📖 [Benutzerhandbuch (PDF)](docs/BudgetApp-Handbuch-DE.pdf)

## 📱 Screenshot

![Aktuelle BudgetApp-Monatsübersicht mit Beispieldaten](screenshots/budgetapp-overview.jpg)

<sub>Aktuelle BudgetApp-Übersicht mit Beispieldaten</sub>

---

## ✨ Features

- 📊 **Übersicht** — Monatliches Polster, Einnahmen & Ausgaben auf einen Blick
- 🍩 **Donut-Chart** — Visuelle Aufschlüsselung der Ausgaben-Kategorien
- 📥 **Excel-Import** — Erkannte Einnahmen und Ausgaben vor dem Import prüfen; fehlerhafte Zeilen werden angezeigt und übersprungen
- 📤 **Excel-Export** — Budget als `.xlsx` Datei exportieren
- 🖨️ **PDF-Export** — Druckfertige Ausgabe der Monatsübersicht
- 📷 **Bild-Export** — Gesamte Ansicht als PNG exportieren (auch als installierte PWA)
- 💾 **JSON-Backup** — Inhalt vor dem Wiederherstellen von Budgetdaten und App-Einstellungen prüfen
- ✏️ **Bearbeiten** — Einträge hinzufügen, bearbeiten und löschen
- 👆 **Wischen mit Rückgängig-Funktion** — Einträge per Wischgeste entfernen und versehentliches Löschen innerhalb von fünf Sekunden rückgängig machen
- 📅 **Echter Betrag** — Nicht-monatliche Ausgaben zeigen den tatsächlichen Zahlungsbetrag mit Häufigkeit als Untertitel
- 🗂️ **Einklappbare Sektionen** — Einnahmen & Ausgaben lassen sich per Tipp ein-/ausklappen
- 🌗 **Dark / Light Mode** — Zwischen dunklem und hellem Design wechseln (☀️ / 🌙)
- 🌐 **Sprachwechsel** — Jederzeit zwischen Deutsch und Englisch wechseln
- 💾 **Lokale Speicherung** — Alle Daten bleiben ausschließlich auf deinem Gerät
- 📴 **Offline-fähig** — Service Worker cached die App für die Nutzung ohne Internet
- 📱 **Installierbar** — Als App auf dem iPhone/iPad Home-Bildschirm oder am Desktop speichern

---

## 🔒 Datenschutz

**Keine Daten verlassen dein Gerät.** Der Quellcode enthält keinerlei persönliche Finanzdaten. Alle Einträge werden ausschließlich im lokalen Browser-Speicher (localStorage) gespeichert und sind nur auf deinem Gerät sichtbar.

---

## 📱 Als App installieren

**iPhone / iPad (Safari):**
1. `schrotty74.github.io/BudgetApp` in Safari öffnen
2. Teilen-Symbol antippen
3. „Zum Home-Bildschirm" wählen
4. „Hinzufügen" tippen

**Mac / Windows (Chrome oder Edge):**
1. Die Seite öffnen
2. In der Adressleiste das Install-Symbol antippen
3. „Installieren" bestätigen

---

## 📥 Excel-Import

Die App erkennt `.xlsx` Dateien automatisch, solange sie Abschnitte mit den Bezeichnungen **Einnahmen** und **Ausgaben** enthalten. Leerzeichen in Abschnittsbezeichnungen werden automatisch bereinigt.

Unterstützte Häufigkeiten: `Monatlich` · `Alle 2 Monate` · `Quartalsweise` · `Jährlich` · `Variabel`

---

## 🛠 Technologie

- Reines HTML / CSS / JavaScript — keine Frameworks, kein Build-Schritt
- [SheetJS](https://sheetjs.com) für Excel-Import & Export
- Service Worker für Offline-Unterstützung
- localStorage für lokale Datenpersistenz

---

## 💬 Community

Fragen, Feedback und Diskussionen sind auf [Discord](https://discord.gg/Zy93AaYFaj) willkommen.

---

## 📄 Lizenz

GPL-3.0 — siehe [LICENSE](LICENSE)
