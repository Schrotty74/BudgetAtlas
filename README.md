<img src="icon.png" alt="BudgetApp Icon" width="160">

# 💶 BudgetApp – Private Offline Household Budget & Expense Tracker

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

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-open-brightgreen)](https://schrotty74.github.io/BudgetApp)

🇩🇪 [Deutsche Version](README_de.md) · 📖 [User Manual (PDF)](docs/BudgetApp-Manual-EN.pdf)

## 📱 Screenshot

![BudgetApp monthly overview with sample data](screenshots/budgetapp-overview.jpg)

<sub>Current BudgetApp overview with sample data</sub>

---

## ✨ Features

- 📊 **Dashboard** — Monthly balance, income & expenses at a glance
- 🍩 **Donut chart** — Visual breakdown of expense categories
- 📥 **Excel import** — Check the detected income and expenses before importing; invalid rows are listed and skipped
- 📤 **Excel export** — Export your budget as a `.xlsx` file
- 🖨️ **PDF export** — Print-ready export of your monthly overview
- 📷 **Image export** — Export the full view as a PNG (works in installed PWA too)
- 💾 **JSON backup** — View the backup contents before restoring budget data and app settings
- ✏️ **Full editing** — Add, edit and delete entries inline
- 👆 **Swipe to delete with undo** — Remove entries with a swipe gesture on mobile and restore accidental deletions within five seconds
- 📅 **Actual amounts** — Non-monthly expenses show the real payment amount with frequency as a subtitle
- 🗂️ **Collapsible sections** — Income & expenses can be collapsed with a single tap
- 🌗 **Dark / Light mode** — Toggle between dark and light theme (☀️ / 🌙)
- 🌐 **Language switch** — Switch between German and English at any time
- 💾 **Local storage** — All data stays exclusively on your device
- 📴 **Offline-ready** — Service Worker caches the app for use without internet
- 📱 **Installable** — Add to iPhone/iPad Home Screen or install as a desktop app

---

## 🔒 Privacy

**No data ever leaves your device.** The source code contains zero personal financial data. All entries are stored exclusively in the browser's local storage (localStorage) and are only visible on your device.

---

## 📱 Install as an App

**iPhone / iPad (Safari):**
1. Open `schrotty74.github.io/BudgetApp` in Safari
2. Tap the Share icon
3. Select „Add to Home Screen"
4. Tap „Add"

**Mac / Windows (Chrome or Edge):**
1. Open the page
2. Click the install icon in the address bar
3. Confirm „Install"

---

## 📥 Excel Import

The app automatically recognises `.xlsx` files as long as they contain sections labelled **Einnahmen** (Income) and **Ausgaben** (Expenses). Whitespace variations in section headers are handled automatically.

Supported frequencies: `Monatlich` · `Alle 2 Monate` · `Quartalsweise` · `Jährlich` · `Variabel`

---

## 🛠 Technology

- Pure HTML / CSS / JavaScript — no frameworks, no build step
- [SheetJS](https://sheetjs.com) for Excel import & export
- Service Worker for offline support
- localStorage for local data persistence

---

## 💬 Community

Questions, feedback and discussions are welcome on [Discord](https://discord.gg/Zy93AaYFaj).

---

## Repo activity

![Repobeats analytics image](https://repobeats.axiom.co/api/embed/c8cf3c56f0c9c8dc7954a1e45033ee696f5be103.svg "Repobeats analytics image")

## 📄 License

GPL-3.0 — see [LICENSE](LICENSE)
