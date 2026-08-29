#!/usr/bin/env python3
"""Build the bilingual BudgetAtlas user guides from current, synthetic screenshots."""

from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, Frame, Image, PageBreak, Paragraph,
    Spacer, Table, TableStyle,
)

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "docs" / "manuals"
USER_PHOTOS = Path("/Users/martin/Pictures/Photos Library.photoslibrary")

IMAGES = {
    "mobile_dark": USER_PHOTOS / "resources/derivatives/7/7DDF4400-BF47-4E54-BD43-4C95C6676311_1_105_c.jpeg",
    "mobile_light": USER_PHOTOS / "resources/derivatives/1/1B6F58D8-F77A-4899-BF01-D83E03C997A4_1_105_c.jpeg",
    "desktop_dark": USER_PHOTOS / "resources/derivatives/F/F7EB8B9C-7B16-436E-BC54-E2D3044C61DE_1_105_c.jpeg",
    "desktop_light": USER_PHOTOS / "originals/F/F81AAA9C-769C-4E07-8364-AE80F65B1EC6.png",
    "quick": USER_PHOTOS / "resources/renders/4/4F26FF4D-6A25-476A-A27A-FFC0D4F9CF12_1_201_a.jpeg",
    "income_add": USER_PHOTOS / "resources/renders/3/37A0C2DF-38F2-4CAC-9CEA-9EC9AE5F16B7_1_201_a.jpeg",
    "expense_add": USER_PHOTOS / "resources/renders/F/FF22786E-F05B-417F-8710-DB2077B16A78_1_201_a.jpeg",
    "bottom_nav": USER_PHOTOS / "resources/renders/4/4F717A1F-5FD1-4770-8E3E-0CC5F1F60993_1_201_a.jpeg",
    "more": USER_PHOTOS / "resources/derivatives/2/22AFC768-6791-47C0-A3EB-B33EAA2EEBE5_1_105_c.jpeg",
    "list_display": USER_PHOTOS / "resources/renders/3/356399C3-190E-4BF2-967D-0FDD143DB1C0_1_201_a.jpeg",
    "io": USER_PHOTOS / "resources/renders/D/D9C54357-7042-48B1-905F-CC6B20BFD6B9_1_201_a.jpeg",
    "desktop_nav": USER_PHOTOS / "resources/derivatives/masters/B/B407089B-5007-4CBA-8A57-C6A98A9B92F8_4_5005_c.jpeg",
    "month_header": USER_PHOTOS / "resources/renders/6/696A7F4F-8BCE-473A-93AE-F27F7DAF9478_1_201_a.jpeg",
}

INK = colors.HexColor("#F1F8FC")
MUTED = colors.HexColor("#A9C2D0")
CYAN = colors.HexColor("#53DBF7")
PAGE_BG = colors.HexColor("#06111D")
PANEL = colors.HexColor("#0A1D2D")
MINT = colors.HexColor("#0C2A3A")
LINE = colors.HexColor("#27526B")


def img(name, width, max_height=None):
    path = IMAGES[name]
    if not path.exists():
        raise FileNotFoundError(path)
    image = Image(str(path))
    ratio = image.imageHeight / image.imageWidth
    height = width * ratio
    if max_height and height > max_height:
        height = max_height
        width = height / ratio
    image.drawWidth = width
    image.drawHeight = height
    image.hAlign = "CENTER"
    return image


def p(text, style):
    return Paragraph(text, style)


def two(items, widths=(84 * mm, 84 * mm), top=4):
    table = Table([items], colWidths=widths, hAlign="CENTER")
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), top * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2 * mm),
    ]))
    return table


def card(title, body, styles):
    table = Table([[p(f"<b>{title}</b><br/>{body}", styles["body"])]], colWidths=[84 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PANEL),
        ("BOX", (0, 0), (-1, -1), .55, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
    ]))
    return table


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAGE_BG)
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 14 * mm, A4[0] - 18 * mm, 14 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(INK)
    canvas.drawString(18 * mm, 8.5 * mm, doc.footer_text)
    canvas.drawRightString(A4[0] - 18 * mm, 8.5 * mm, str(doc.page))
    canvas.restoreState()


def styles(language):
    sample = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("title", parent=sample["Title"], fontName="Helvetica-Bold", fontSize=29, leading=33, textColor=INK, spaceAfter=4 * mm),
        "subtitle": ParagraphStyle("subtitle", parent=sample["Normal"], fontSize=11, leading=15, textColor=CYAN, spaceAfter=7 * mm),
        "h1": ParagraphStyle("h1", parent=sample["Heading1"], fontName="Helvetica-Bold", fontSize=17, leading=21, textColor=INK, spaceBefore=1 * mm, spaceAfter=8 * mm),
        "h2": ParagraphStyle("h2", parent=sample["Heading2"], fontName="Helvetica-Bold", fontSize=10.5, leading=13, textColor=CYAN, spaceAfter=2 * mm),
        "body": ParagraphStyle("body", parent=sample["BodyText"], fontName="Helvetica", fontSize=8.6, leading=11.7, textColor=INK),
        "small": ParagraphStyle("small", parent=sample["BodyText"], fontName="Helvetica", fontSize=7.4, leading=9.3, textColor=MUTED, alignment=TA_CENTER, spaceBefore=3 * mm),
        "note": ParagraphStyle("note", parent=sample["BodyText"], fontName="Helvetica-Bold", fontSize=8.5, leading=11.5, textColor=INK, backColor=MINT, borderColor=LINE, borderWidth=.5, borderPadding=9, spaceBefore=7 * mm, spaceAfter=3 * mm),
    }


def section(story, number, title, s):
    story.append(p(f"{number:02d} - {title}", s["h1"]))


def guide(language):
    de = language == "de"
    s = styles(language)
    text = {
        "guide": "Deutsches Benutzerhandbuch" if de else "English User Guide",
        "intro": "Lokale Budget-PWA fuer Einnahmen, Ausgaben und Monatsuebersicht" if de else "Local budget PWA for income, expenses, and monthly overview",
        "version": "Version 1.1 - Stand: 29. August 2026" if de else "Version 1.1 - 29 August 2026",
        "demo": "Alle angezeigten Betraege, Kategorien und Diagramme sind fiktive Demo-Daten aus <b>docs/examples/demo.xlsx</b> im oeffentlichen GitHub-Repository. Sie sind keine echten Finanzdaten." if de else "All displayed amounts, categories, and charts are fictional demo data from <b>docs/examples/demo.xlsx</b> in the public GitHub repository. They are not real financial data.",
        "themes": "Dunkel und hell" if de else "Dark and light",
        "themes_body": "Die helle Ansicht erscheint in diesem Handbuch nur hier: als direkter Theme-Vergleich. Alle weiteren Funktionsbeispiele verwenden die dunkle Oberflaeche." if de else "The light view appears only here in this guide: as a direct theme comparison. Every later feature example uses the dark interface.",
        "nav": "Navigation und Einstieg" if de else "Navigation and getting started",
        "dashboard": "Dashboard und Monatsuebersicht" if de else "Dashboard and monthly overview",
        "entries": "Einnahmen, Ausgaben und Schnellzugriff" if de else "Income, expenses, and Quick access",
        "settings": "Mehr-Menue und Einstellungen" if de else "More menu and settings",
        "io_title": "Import, Export und Sicherung" if de else "Import, export, and backup",
        "privacy": "Demo-Daten, Offline und Datenschutz" if de else "Demo data, offline use, and privacy",
        "workflows": "Typische Arbeitsablaeufe" if de else "Typical workflows",
    }
    story = []
    story += [p("BudgetAtlas", s["title"]), p(text["guide"], s["subtitle"]), p(text["version"], s["body"]), Spacer(1, 5 * mm)]
    story.append(p(("<b>LOKALE BUDGET-APP</b><br/>" if de else "<b>LOCAL BUDGET APP</b><br/>") + ("BudgetAtlas ist eine responsive Progressive Web App fuer die lokale Verwaltung eines Monatsbudgets. Das Dashboard verbindet Polster, Ausgabenanteil, Ausgaben-Mix, Listen und direkte Datenwerkzeuge auf Desktop und Mobilgeraeten." if de else "BudgetAtlas is a responsive Progressive Web App for managing a monthly budget locally. Its dashboard brings buffer, expense ratio, Expense Mix, lists, and direct data tools together on desktop and mobile devices."), s["body"]))
    story.append(Spacer(1, 4 * mm))
    story.append(two([[img("desktop_dark", 82 * mm, 65 * mm), Spacer(1, 3.5 * mm), p(("<b>DESKTOP - DUNKEL</b><br/>" if de else "<b>DESKTOP - DARK</b><br/>") + ("Sidebar, kompakte Karten und zwei Listen." if de else "Sidebar, compact cards, and two lists."), s["small"])], [img("mobile_dark", 37 * mm, 65 * mm), Spacer(1, 3.5 * mm), p(("<b>HANDY - DUNKEL</b><br/>" if de else "<b>MOBILE - DARK</b><br/>") + ("Bottom-Navigation und vertikales Dashboard." if de else "Bottom navigation and a vertical dashboard."), s["small"])]], (103 * mm, 63 * mm)))
    story.append(Spacer(1, 6 * mm))
    story.append(p(text["demo"], s["note"]))
    story.append(PageBreak())

    section(story, 1, text["themes"], s)
    story.append(p(text["themes_body"], s["note"]))
    story.append(Spacer(1, 4 * mm))
    story.append(two([[img("desktop_dark", 82 * mm, 66 * mm), Spacer(1, 3 * mm), p("<b>Desktop: dunkles Theme</b>" if de else "<b>Desktop: dark theme</b>", s["small"])], [img("desktop_light", 82 * mm, 66 * mm), Spacer(1, 3 * mm), p("<b>Desktop: helles Theme</b>" if de else "<b>Desktop: light theme</b>", s["small"])]]))
    story.append(Spacer(1, 5 * mm))
    story.append(two([[img("mobile_dark", 38 * mm, 64 * mm), Spacer(1, 3 * mm), p("<b>Handy: dunkel</b>" if de else "<b>Mobile: dark</b>", s["small"])], [img("mobile_light", 38 * mm, 64 * mm), Spacer(1, 3 * mm), p("<b>Handy: hell</b>" if de else "<b>Mobile: light</b>", s["small"])]], (84 * mm, 84 * mm)))
    story.append(Spacer(1, 6 * mm))
    story.append(p(("<b>Darstellung wechseln:</b> " if de else "<b>Change appearance:</b> ") + ("Am Desktop schaltet die Sonnen-/Mondtaste oben rechts das Theme. Auf dem Handy oeffnest du <b>Mehr</b> und waehlst <b>Darstellung</b>. Sprache und Theme werden lokal gespeichert." if de else "On desktop, the sun/moon button in the top right changes the theme. On mobile, open <b>More</b> and choose <b>Appearance</b>. Language and theme are stored locally."), s["body"]))
    story.append(PageBreak())

    section(story, 2, text["nav"], s)
    nav_body = ("<b>Desktop:</b> Die linke Sidebar fuehrt zu Uebersicht, Einnahmen, Ausgaben und Ausgaben-Mix. Unten liegt Import / Export. Der Monatskopf wechselt mit den Pfeilen den angezeigten Monat; die Kopfzeile enthaelt Sprache und Theme.<br/><br/><b>Handy:</b> Die Bottom-Navigation oeffnet Uebersicht, Einnahmen, Ausgaben und Mehr. <b>Mehr</b> buendelt Ausgaben-Mix, Datenwerkzeuge, Sprache, Darstellung und Listenansicht. Das vermeidet ein zusaetzliches mobiles Seitenmenue." if de else "<b>Desktop:</b> The left sidebar leads to Overview, Income, Expenses, and Expense Mix. Import / Export sits at the bottom. The month header changes the displayed month with its arrows; the top controls contain language and theme.<br/><br/><b>Mobile:</b> Bottom navigation opens Overview, Income, Expenses, and More. <b>More</b> groups Expense Mix, data tools, language, appearance, and list display. This avoids a second mobile sidebar.")
    story.append(two([card("DESKTOP", nav_body, s), [img("bottom_nav", 82 * mm, 30 * mm), Spacer(1, 2 * mm), img("more", 69 * mm, 75 * mm), p("<b>Mobile Bottom-Navigation und Mehr-Menue</b>" if de else "<b>Mobile bottom navigation and More menu</b>", s["small"])]]))
    story.append(Spacer(1, 7 * mm))
    story.append(p(("<b>Erster Schritt:</b> " if de else "<b>First step:</b> ") + ("Importiere die Demo-Excel oder lege zuerst Einnahmen und danach Ausgaben an. Danach aktualisieren sich Monats-Polster, Summenkarten, Anteil und Ausgaben-Mix automatisch." if de else "Import the demo workbook or add income first and expenses next. Monthly buffer, summary cards, ratio, and Expense Mix then update automatically."), s["note"]))
    story.append(Spacer(1, 6 * mm))
    story.append(two([[img("desktop_nav", 33 * mm, 95 * mm), p("<b>Desktop-Sidebar</b>" if de else "<b>Desktop sidebar</b>", s["small"])], card("SCHNELL ORIENTIEREN" if de else "ORIENT QUICKLY", ("Die aktive Navigation ist farblich hervorgehoben. Abschnittstitel und die Pfeiltaste an den Listen klappen Einnahmen und Ausgaben ein oder aus." if de else "The active navigation is highlighted. Section titles and the chevron in the lists collapse or expand income and expenses."), s)], (70 * mm, 100 * mm)))
    story.append(PageBreak())

    section(story, 3, text["dashboard"], s)
    story.append(img("desktop_dark", 156 * mm, 98 * mm))
    story.append(Spacer(1, 6 * mm))
    dashboard_body = ("<b>Monatliches Polster:</b> Einnahmen minus monatliche Ausgaben. Gruen steht fuer verfuegbar; bei einem negativen Ergebnis wechselt die Hervorhebung. Der Balken zeigt den Ausgabenanteil.<br/><br/><b>Ausgaben-Mix:</b> Donut und Legende verteilen die monatlichen Ausgaben nach Kategorien. Die Summenkarten zeigen Einnahmen / Monat und Ausgaben / Monat. Der Schnellzugriff oeffnet direkt die Formulare oder die Datenwerkzeuge." if de else "<b>Monthly buffer:</b> income minus monthly expenses. Green means available; the emphasis changes for a negative result. The bar shows the expense ratio.<br/><br/><b>Expense Mix:</b> the donut and legend split monthly expenses by category. Summary cards show Income / Month and Expenses / Month. Quick access opens the forms or data tools directly.")
    story.append(p(dashboard_body, s["body"]))
    story.append(Spacer(1, 7 * mm))
    story.append(two([[img("quick", 79 * mm, 28 * mm), p("<b>Schnellzugriff</b>" if de else "<b>Quick access</b>", s["small"])], card("FARBLOGIK" if de else "COLOR LOGIC", ("Gruen: positive und einkommensbezogene Werte.<br/>Orange: Ausgaben und Hervorhebung.<br/>Cyan: Navigation und Aktionen.<br/>Rot: negatives Polster oder Ersetzungswarnung." if de else "Green: positive and income-related values.<br/>Orange: expenses and emphasis.<br/>Cyan: navigation and actions.<br/>Red: negative buffer or replacement warning."), s)]))
    story.append(PageBreak())

    section(story, 4, text["entries"], s)
    entries_body = ("<b>Hinzufuegen:</b> Die Tasten <b>+ Einnahme hinzufuegen</b> und <b>+ Ausgabe hinzufuegen</b> oeffnen ein Formular. Gib Icon, Bezeichnung und Betrag ein; bei Ausgaben auch die Haeufigkeit.<br/><br/><b>Bearbeiten und loeschen:</b> Das Stift-Symbol bearbeitet einen vorhandenen Eintrag direkt. Das X loescht ihn; auf Mobilgeraeten ist auch Wischen zum Loeschen moeglich. Danach erscheint kurz <b>Rueckgaengig</b>.<br/><br/><b>Haeufigkeiten:</b> Monatlich, Alle 2 Monate, Quartalsweise, Jaehrlich und Variabel. Bei nicht monatlichen Ausgaben bleibt der Zahlungsbetrag sichtbar; fuer Polster und Diagramme verwendet die App den monatlichen Budgetanteil." if de else "<b>Add:</b> <b>+ Add income</b> and <b>+ Add expense</b> open a form. Enter icon, name, and amount; expenses also have a frequency.<br/><br/><b>Edit and delete:</b> The pencil icon edits an existing item inline. X deletes it; mobile also supports swipe-to-delete. <b>Undo</b> appears briefly afterwards.<br/><br/><b>Frequencies:</b> Monthly, Every 2 months, Quarterly, Yearly, and Variable. For non-monthly expenses, the payment amount stays visible while buffer and charts use the monthly budget equivalent.")
    story.append(two([card("EINTRAEGE VERWALTEN" if de else "MANAGE ENTRIES", entries_body, s), [img("income_add", 81 * mm, 29 * mm), Spacer(1, 3 * mm), img("expense_add", 81 * mm, 29 * mm), p("<b>Hinzufuegen von Einnahmen und Ausgaben</b>" if de else "<b>Adding income and expenses</b>", s["small"])]]))
    story.append(p(("<b>Seitennavigation:</b> " if de else "<b>Pagination:</b> ") + ("Bei mehr Eintraegen als der gewaehlten Anzahl erscheinen runde Pfeile und eine Anzeige wie 1 / 3. Einkommen und Ausgaben haben eigene Seitengroessen." if de else "When there are more entries than the chosen count, round arrows and a display such as 1 / 3 appear. Income and expenses keep separate page sizes."), s["note"]))
    story.append(Spacer(1, 3 * mm))
    story.append(img("desktop_dark", 153 * mm, 78 * mm))
    story.append(Spacer(1, 2.5 * mm))
    story.append(p(("<b>Desktop-Listen:</b> " if de else "<b>Desktop lists:</b> ") + ("Beide Listen zeigen die aktuelle Seite, einen Hinzufuegen-Button und die monatliche Summe." if de else "Both lists show the current page, an add button, and the monthly total."), s["small"]))
    story.append(PageBreak())

    section(story, 5, text["settings"], s)
    settings_body = ("<b>Ausgaben-Mix:</b> springt zur grafischen Ausgabenverteilung.<br/><br/><b>Import / Export:</b> oeffnet die sechs Datenaktionen.<br/><br/><b>Sprache:</b> wechselt Deutsch und Englisch; alle sichtbaren Beschriftungen passen sich an.<br/><br/><b>Darstellung:</b> schaltet hell/dunkel.<br/><br/><b>Listenansicht:</b> waehle getrennt fuer Einnahmen und Ausgaben 10, 15, 20 oder 25 Eintraege pro Seite. Die Auswahl wird lokal gespeichert und im JSON-Backup mitgesichert." if de else "<b>Expense Mix:</b> jumps to the graphical spending distribution.<br/><br/><b>Import / Export:</b> opens the six data actions.<br/><br/><b>Language:</b> switches German and English; all visible labels adapt.<br/><br/><b>Appearance:</b> switches light/dark.<br/><br/><b>List display:</b> choose 10, 15, 20, or 25 entries per page separately for income and expenses. The choice is stored locally and included in JSON backup.")
    story.append(two([card("MEHR" if de else "MORE", settings_body, s), [img("more", 71 * mm, 73 * mm), Spacer(1, 3 * mm), img("list_display", 81 * mm, 38 * mm), p("<b>Mehr-Menue mit Listenansicht</b>" if de else "<b>More menu with list display</b>", s["small"])]]))
    story.append(p(("<b>Einstellungen behalten:</b> " if de else "<b>Settings persist:</b> ") + ("Sprache, Theme, eingeklappte Bereiche und die gewaehlte Listenansicht werden im Browser gespeichert. Beim JSON-Backup werden diese Einstellungen zusammen mit den Budgetdaten gesichert." if de else "Language, theme, collapsed sections, and the selected list display are stored in the browser. JSON backup preserves these settings together with budget data."), s["note"]))
    story.append(PageBreak())

    section(story, 6, text["io_title"], s)
    story.append(img("io", 153 * mm, 95 * mm))
    story.append(Spacer(1, 5 * mm))
    io_body = ("<b>Excel importieren:</b> Liest .xlsx oder .xls. Eine Vorschau nennt erkannte Einnahmen, Ausgaben und fehlerhafte Zeilen; erst danach uebernimmst du den Import.<br/><br/><b>Excel exportieren:</b> Erstellt eine Arbeitsmappe mit Eintraegen, Monatswerten und Anteilen.<br/><br/><b>PDF:</b> Oeffnet eine druckbare Monatsuebersicht. <b>PNG:</b> exportiert den Dashboard-Bereich als Bild.<br/><br/><b>JSON-Backup:</b> sichert Budgetdaten und Einstellungen. <b>JSON wiederherstellen:</b> zeigt vor dem Ersetzen eine Vorschau. Abbrechen laesst die vorhandenen lokalen Daten unveraendert." if de else "<b>Import Excel:</b> reads .xlsx or .xls. A preview lists recognized income, expenses, and invalid rows; only then do you apply the import.<br/><br/><b>Export Excel:</b> creates a workbook with entries, monthly values, and shares.<br/><br/><b>PDF:</b> opens a printable monthly overview. <b>PNG:</b> exports the dashboard area as an image.<br/><br/><b>JSON backup:</b> stores budget data and settings. <b>Restore JSON:</b> shows a preview before replacement. Cancel keeps existing local data unchanged.")
    story.append(p(io_body, s["body"]))
    story.append(p(("<b>Wichtig:</b> " if de else "<b>Important:</b> ") + ("Eine JSON-Wiederherstellung ersetzt die aktuellen lokalen Daten. Erstelle vorher ein aktuelles JSON-Backup, wenn du einen Rueckweg brauchst." if de else "A JSON restore replaces current local data. Export a current JSON backup first if you need a rollback point."), s["note"]))
    story.append(PageBreak())

    section(story, 7, text["privacy"], s)
    privacy = ("<b>Demo-Arbeitsmappe:</b> Alle Screenshots in diesem Handbuch zeigen fiktive Werte aus <b>docs/examples/demo.xlsx</b>, der Demo-Excel im GitHub-Repository. Die Datei eignet sich zum sicheren Ausprobieren des Excel-Imports.<br/><br/><b>Lokal gespeichert:</b> Budgetdaten liegen ausschliesslich im Browser-Speicher (localStorage). Es gibt kein Backend, kein Benutzerkonto, kein Tracking und keine serverseitige Speicherung persoenlicher Finanzdaten.<br/><br/><b>Offline-PWA:</b> Ein Service Worker cached die statische App fuer die Offline-Nutzung. Nach dem Laden kann BudgetAtlas auf Handy und Desktop installiert werden. Ein Update-Hinweis kann erscheinen, wenn eine neuere version.json erkannt wird.<br/><br/><b>Bewegung:</b> Die Oberflaeche respektiert prefers-reduced-motion." if de else "<b>Demo workbook:</b> All screenshots in this guide show fictional values from <b>docs/examples/demo.xlsx</b>, the demo Excel workbook in the GitHub repository. It is safe for trying the Excel import.<br/><br/><b>Stored locally:</b> Budget data lives exclusively in browser storage (localStorage). There is no backend, user account, tracking, or server-side storage of personal financial data.<br/><br/><b>Offline PWA:</b> A Service Worker caches the static app for offline use. After loading, BudgetAtlas can be installed on mobile and desktop. An update notice can appear when a newer version.json is detected.<br/><br/><b>Motion:</b> the interface respects prefers-reduced-motion.")
    story.append(card("DATENSCHUTZ / PRIVACY", privacy, s))
    story.append(Spacer(1, 5 * mm))
    story.append(two([card("KEINE KONTEN" if de else "NO ACCOUNTS", ("Keine Anmeldung und keine Benutzerkonten." if de else "No sign-in and no user accounts."), s), card("KEIN SERVER-BUDGET" if de else "NO SERVER BUDGET", ("Keine serverseitige Speicherung der Budgetdaten." if de else "No server-side storage of budget data."), s)]))
    story.append(Spacer(1, 4 * mm))
    story.append(two([card("KEIN TRACKING" if de else "NO TRACKING", ("Die Projektbeschreibung nennt kein Tracking." if de else "The project documentation describes no tracking."), s), card("KEINE ERFUNDENEN MODULE" if de else "NO INVENTED MODULES", ("Keine Konten, Ziele, Belegscanner oder kuenstlichen Budgets." if de else "No accounts, goals, receipt scanner, or artificial budgets."), s)]))
    story.append(Spacer(1, 5 * mm))
    story.append(two([[img("month_header", 79 * mm, 18 * mm), p("<b>Monatskopf</b>" if de else "<b>Month header</b>", s["small"])], [img("bottom_nav", 79 * mm, 18 * mm), p("<b>Mobile Navigation</b>", s["small"])]]))
    story.append(PageBreak())

    section(story, 8, text["workflows"], s)
    flow = [
        ("1 - MONAT EINRICHTEN" if de else "1 - SET UP A MONTH", "Einnahmen anlegen, Ausgaben mit der passenden Haeufigkeit hinzufuegen und danach Polster, Anteil und Mix pruefen." if de else "Add income, add expenses with the appropriate frequency, then check buffer, ratio, and mix."),
        ("2 - SCHNELLEINGABE" if de else "2 - QUICK ENTRY", "Schnellzugriff verwenden, Einnahme oder Ausgabe eintragen und speichern. Die Monatswerte aktualisieren sich sofort." if de else "Use Quick access, add income or expense, and save. Monthly values update immediately."),
        ("3 - PRUEFEN" if de else "3 - REVIEW", "Ausgaben-Mix oeffnen, Listen ein- oder ausklappen und bei langen Listen Seitengroesse oder Seite wechseln." if de else "Open Expense Mix, collapse or expand lists, and change page size or page for long lists."),
        ("4 - SICHERN ODER AUSGEBEN" if de else "4 - BACK UP OR EXPORT", "JSON fuer eine vollstaendige Sicherung verwenden; Excel fuer Tabellen, PDF fuer einen Bericht und PNG fuer die Dashboard-Ansicht." if de else "Use JSON for a full backup; Excel for tables, PDF for a report, and PNG for the dashboard view."),
    ]
    story.append(Table([[card(a, b, s), card(c, d, s)] for (a, b), (c, d) in zip(flow[::2], flow[1::2])], colWidths=[87 * mm, 87 * mm], rowHeights=[42 * mm, 42 * mm], hAlign="CENTER", style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 2 * mm), ("RIGHTPADDING", (0, 0), (-1, -1), 2 * mm), ("TOPPADDING", (0, 0), (-1, -1), 3 * mm), ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm)])))
    story.append(Spacer(1, 5 * mm))
    story.append(p(("<b>REFERENZ</b><br/>" if de else "<b>REFERENCE</b><br/>") + ("Projekt: BudgetAtlas v1.1<br/>Live-App: schrotty74.github.io/BudgetAtlas<br/>Repository: github.com/Schrotty74/BudgetAtlas<br/><br/>Dieses Handbuch ist eine Bedienungsanleitung, keine Finanzempfehlung." if de else "Project: BudgetAtlas v1.1<br/>Live app: schrotty74.github.io/BudgetAtlas<br/>Repository: github.com/Schrotty74/BudgetAtlas<br/><br/>This guide is a user guide, not financial advice."), s["body"]))
    story.append(Spacer(1, 5 * mm))
    story.append(img("quick", 154 * mm, 38 * mm))
    story.append(p(("<b>Schnellzugriff:</b> " if de else "<b>Quick access:</b> ") + ("Einnahme, Ausgabe und Import / Export sind die drei direkten Aktionen auf der Uebersicht." if de else "Income, expense, and Import / Export are the three direct actions on Overview."), s["small"]))
    return story


def build(language, filename):
    doc = BaseDocTemplate(str(OUT / filename), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=17 * mm, bottomMargin=20 * mm)
    doc.footer_text = "BudgetAtlas v1.1 - Lokale Budget-PWA - Fiktive Demo-Daten" if language == "de" else "BudgetAtlas v1.1 - Local budget PWA - Fictional demo data"
    doc.addPageTemplates([__import__('reportlab.platypus', fromlist=['PageTemplate']).PageTemplate(id="main", frames=[Frame(doc.leftMargin, doc.bottomMargin, A4[0] - doc.leftMargin - doc.rightMargin, A4[1] - doc.topMargin - doc.bottomMargin, id="body")], onPage=footer)])
    doc.build(guide(language))


if __name__ == "__main__":
    build("de", "BudgetAtlas_Handbuch_DE.pdf")
    build("en", "BudgetAtlas_User_Guide_EN.pdf")
