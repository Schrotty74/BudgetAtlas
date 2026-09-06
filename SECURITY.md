# Security Policy

[Deutsch](SECURITY.de.md)

## Supported Versions

Security reports are accepted for the current published BudgetAtlas version.

## Reporting a Vulnerability

Please do not publish sensitive vulnerability details in a public GitHub issue. Contact the repository owner privately. Include the BudgetAtlas version, browser and operating system, reproduction steps and sanitized logs or screenshots. Never attach real budgets, income/expense records, Excel files, JSON backups or exported financial reports.

## Scope

Relevant reports include localStorage handling of budget data, Excel import/export, JSON backup and restore, PDF/PNG export, service-worker/offline caching, update checks and third-party browser libraries used for export functionality.

BudgetAtlas stores personal financial data locally in the browser and has no account or server-side budget storage. Reports involving unintended network transmission, unsafe imported files, script injection, corrupted restores, exposure of local financial data or unsafe offline caching are especially important.

Thank you for helping keep BudgetAtlas and its users secure.
