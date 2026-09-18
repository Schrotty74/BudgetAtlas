🇩🇪 [Deutsche Version](README_de.md)

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

BudgetAtlas is a local, responsive budget PWA with a modern “Focus & Flow” dashboard for desktop and mobile devices.

The app stores budget data exclusively in the browser. There is no account, no tracking, and no server-side storage of personal financial data.

## Screenshots

These screenshots show fictional demo data only.

### Mobile

<img src="docs/screenshots/IMG_2651.jpeg" alt="BudgetAtlas mobile dashboard in dark mode with fictional demo data" width="220"> <img src="docs/screenshots/IMG_2655.jpg" alt="BudgetAtlas mobile dashboard in light mode with fictional demo data" width="220">

### Desktop

<img src="docs/screenshots/CleanShot%202026-08-29%20at%2010.56.10@2x.png" alt="BudgetAtlas desktop dashboard in dark mode with fictional demo data" width="480">

<img src="docs/screenshots/CleanShot%202026-08-29%20at%2010.56.58@2x.png" alt="BudgetAtlas desktop dashboard in light mode with fictional demo data" width="480">

## Features

- Monthly buffer, income and expenses at a glance
- Animated expense-mix donut chart
- Animated percentage bars for expense shares
- Add, edit and delete income and expenses
- Swipe-to-delete with undo on mobile devices
- Collapsible income and expense sections
- Individually selectable entries per page for income and expenses (10–25; default: 10)
- Excel import with preview and invalid-row feedback
- Excel export
- PDF export
- PNG dashboard export
- JSON backup and restore with preview
- German / English
- Dark and light mode
- Offline-capable PWA with Service Worker
- Update notification via `version.json`
- `prefers-reduced-motion` support
- Responsive desktop sidebar and mobile bottom navigation

## Demo workbook

[`demo.xlsx`](docs/examples/demo.xlsx) contains fictional sample data only and can be used directly to test the Excel import. The Excel data format remains compatible with the inherited data core.

Supported frequencies:

- `Monatlich`
- `Alle 2 Monate`
- `Quartalsweise`
- `Jährlich`
- `Variabel`

## Privacy

Budget data is stored in the browser's local storage (`localStorage`). There is no backend, no user account, and no tracking.

## Technology

- Pure HTML, CSS and JavaScript
- No framework
- No package manager
- No build step
- SheetJS for Excel import/export
- html2canvas is loaded on demand for PNG export
- Service Worker for offline use

## Status

BudgetAtlas uses its own version line, which started at `v1.0`; the current documented version is `v1.1`.

## Repository

https://github.com/Schrotty74/BudgetAtlas

## Repo activity

![Alt](https://repobeats.axiom.co/api/embed/c8cf3c56f0c9c8dc7954a1e45033ee696f5be103.svg "Repobeats analytics image")

## License

GPL-3.0 — see [`LICENSE`](LICENSE).
