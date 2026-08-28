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

🇩🇪 [Deutsche Version](README_de.md)

BudgetAtlas is a private, local-first PWA for managing a household budget. The redesigned dashboard uses a clear desktop sidebar, compact summary cards, a prominent monthly buffer and dedicated mobile navigation.

---

## ✨ Features

### Dashboard & navigation

- 📊 **Redesigned dashboard** — dark navy interface with cyan, green and orange accents
- 💰 **Monthly buffer** — income minus monthly expenses shown as the main dashboard value
- 🍩 **Animated expense mix** — donut chart with categories and highlighted segments
- 📈 **Animated expense bars** — percentage bars grow to their current values after updates
- 🧭 **Desktop sidebar** — direct navigation to overview, income, expenses and expense mix
- 📱 **Mobile bottom navigation** — compact navigation for small screens with quick-add access
- ⚡ **Quick actions** — add income or expenses directly from the dashboard
- 🗂️ **Collapsible sections** — income and expense areas can be expanded or collapsed
- ✨ **Subtle UI motion** — card feedback, smoother deletion and expanding forms
- ♿ **Reduced motion support** — respects `prefers-reduced-motion`

### Income & expenses

- ➕ **Add entries** — icon, name and amount
- ✏️ **Inline editing** — edit existing entries directly in the list
- 👆 **Swipe to delete** — remove entries with a swipe gesture on mobile
- ↩️ **Undo delete** — restore accidentally deleted entries within five seconds
- 📅 **Multiple payment frequencies** — monthly, every two months, quarterly, yearly or variable
- 💶 **Actual payment amounts** — non-monthly costs keep the real payment amount and monthly budget share separately

### Import & export

- 📥 **Excel import with preview** — inspect detected income and expenses before applying them
- ⚠️ **Invalid-row detection** — problematic Excel rows are listed with a reason and skipped
- 📤 **Excel export** — export the budget as `.xlsx`
- 🖨️ **PDF export** — create a printable monthly overview
- 📷 **PNG export** — export the dashboard as an image
- 💾 **JSON backup** — back up budget data and app settings
- ♻️ **JSON restore with preview** — inspect backup contents before replacing current data

### PWA, privacy & settings

- 📴 **Offline-ready** — Service Worker caches the app for use without internet
- 📱 **Installable** — use BudgetAtlas as a PWA on mobile or desktop
- 🌗 **Dark / Light mode** — switch between dark and light themes
- 🌐 **German / English** — switch languages at any time
- 💾 **Local storage** — budget data is stored in the browser using `localStorage`
- 🔒 **No server, no login, no tracking**

---

## 🔒 Privacy

BudgetAtlas works locally in the browser. Budget data is not sent to a server and there is no account system or tracking.

Budget data and app settings stay in local browser storage. Export files are only created after an explicit user action.

---

## 📥 Excel import

The app recognises `.xlsx` files with sections named **Einnahmen** and **Ausgaben**. A preview is shown before import. Invalid rows are listed and are not applied.

Supported frequencies:

`Monatlich` · `Alle 2 Monate` · `Quartalsweise` · `Jährlich` · `Variabel`

---

## 🛠 Technology

- Pure HTML, CSS and JavaScript
- no framework
- no build step
- [SheetJS](https://sheetjs.com) for Excel import and export
- Service Worker for offline support
- `localStorage` for local data persistence

---

## 📄 License

GPL-3.0 — see [LICENSE](LICENSE)
