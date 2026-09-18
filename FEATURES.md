🇩🇪 [Deutsche Version](FEATURES_de.md) · [Back to README](README.md)

# BudgetAtlas – All Features

This page contains the complete feature overview for the current BudgetAtlas redesign.

## Dashboard and overview

- Monthly buffer calculated from monthly income minus monthly expenses
- Monthly income and expenses at a glance
- Animated expense-mix donut chart
- Animated percentage bars for expense shares
- Total monthly expenses in the expense mix
- Responsive Focus & Flow dashboard for desktop and mobile
- Quick actions for adding income, adding expenses and opening import/export

## Income and expenses

- Add income entries
- Add expense entries
- Edit existing income and expense entries
- Delete entries
- Swipe-to-delete on mobile devices
- Undo accidental deletions
- Collapsible income and expense sections
- Multiple expense frequencies:
  - Monthly
  - Every 2 months
  - Quarterly
  - Yearly
  - Variable
- Separate actual payment amount and monthly budget share for non-monthly expenses

## Lists and navigation

- Separate pagination for income and expenses
- Selectable entries per page: 10, 15, 20 or 25
- Page-size settings are stored locally and included in JSON backups
- Desktop sidebar navigation
- Mobile bottom navigation
- Mobile **More** menu for expense mix, import/export, language, appearance and list display

## Import, export and backup

- Excel import from `.xlsx`
- Import preview before applying data
- Invalid Excel rows are listed with feedback and skipped
- Excel export
- PDF export
- PNG dashboard export
- JSON backup of budget data and app settings
- JSON restore with preview before replacing current data
- Compatible fictional demo workbook in `docs/examples/demo.xlsx`

## Language and appearance

- German and English interface
- Language can be switched at any time
- Dark mode
- Light mode
- Reduced-motion support via `prefers-reduced-motion`

## PWA and offline use

- Installable Progressive Web App
- Offline use through Service Worker caching
- Responsive mobile and desktop layouts
- Dedicated BudgetAtlas PWA icons
- Update notification through `version.json`

## Privacy and storage

- Budget data is stored locally in the browser using `localStorage`
- No backend
- No user account
- No tracking
- Export files are created only after an explicit user action

## Documentation

- English PDF user guide
- German PDF handbook
- Current desktop and mobile screenshots with fictional demo data
- Separate English and German README pages
