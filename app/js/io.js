// ---- Import / Export UI ----
function toggleIOMenu() {
  const open = document.getElementById('ioDropdown').classList.toggle('open');
  document.getElementById('ioToggleBtn').classList.toggle('active', open);
}
function closeIOMenu() {
  document.getElementById('ioDropdown').classList.remove('open');
  document.getElementById('ioToggleBtn').classList.remove('active');
}
document.addEventListener('click', e => {
  if (!document.getElementById('ioMenu').contains(e.target)) closeIOMenu();
});

// ---- Excel Import ----
function importExcel(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const wb = XLSX.read(e.target.result, {type: 'array', raw: false});
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, {header: 1, defval: null, raw: true, blankrows: false});
      let newIncome = [], newExpenses = [], mode = null, skippedRows = [];

      const FREQ_MAP = {
        'alle 2 monate': 'Alle 2 Monate', 'alle zwei monate': 'Alle 2 Monate',
        'quartalsweise': 'Quartalsweise', 'quartal': 'Quartalsweise',
        'jährlich': 'Jährlich', 'variabel': 'Variabel', 'monatlich': 'Monatlich',
      };
      function parseFreq(str) {
        if (!str) return 'Monatlich';
        const value = String(str).replace(/[^\w\säöüÄÖÜ]/g, ' ').replace(/\s+/g, ' ').toLowerCase().trim();
        for (const [key, frequency] of Object.entries(FREQ_MAP)) if (value.includes(key)) return frequency;
        return 'Monatlich';
      }
      function stripLeadingEmoji(str) {
        return String(str).replace(/^[\u{1F000}-\u{1FFFF}\u{2600}-\u{26FF}\u{FE00}-\u{FE0F}\u{1F300}-\u{1FAFF}\s\u00A0\u200B]+/gu, '').trim();
      }
      function getLeadingEmoji(str) {
        const match = String(str).match(/^([\u{1F000}-\u{1FFFF}\u{2600}-\u{26FF}\u{1F300}-\u{1FAFF}][\u{FE0F}]?)/u);
        return match ? match[1] : null;
      }

      const SKIP = ['gesamt','bilanz','betrag','kategorie','häufigkeit','übersicht','regelmäßig','hinweis','% vom','budget','differenz','übrig','intervall','monatl. kosten','kosten'];
      const isSkipRow = joined => SKIP.some(word => joined.includes(word));
      function detectMode(joined) {
        const clean = joined.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{26FF}\u{1F300}-\u{1FAFF}\u{FE0F}]+/gu, '').trim();
        if (clean.includes('einnahmen') && !clean.includes('gesamt')) return 'income';
        if (clean.includes('ausgaben') && !clean.includes('gesamt')) return 'expenses';
        return null;
      }

      for (const [rowIndex, row] of rows.entries()) {
        if (!row || row.length === 0) continue;
        const strCells = row.map(cell => cell !== null && cell !== undefined ? String(cell).replace(/[\u00A0\u200B]+/g, ' ').trim() : '');
        const joined = strCells.join(' ').toLowerCase().replace(/\s+/g, ' ');
        const detected = detectMode(joined);
        if (detected) { mode = detected; continue; }
        if (isSkipRow(joined) || !mode) continue;

        const rawName = strCells[0];
        if (!rawName) {
          skippedRows.push(l('excelInvalidName')(rowIndex + 1));
          continue;
        }

        let amount = null, freqStr = null;
        for (let i = 1; i < row.length; i++) {
          const value = row[i];
          if (value === null || value === undefined) continue;
          if (typeof value === 'number' && value > 0 && amount === null) {
            amount = value;
          } else if (typeof value === 'string') {
            const number = parseFloat(value.replace(',', '.'));
            if (!isNaN(number) && number > 0 && amount === null && !value.includes('=') && !value.includes('%') && !value.includes('█')) {
              amount = number;
            } else if (!value.includes('=') && !value.includes('%') && !value.includes('█') && freqStr === null) {
              freqStr = value;
            }
          }
        }

        const name = stripLeadingEmoji(rawName);
        if (!name) {
          skippedRows.push(l('excelInvalidName')(rowIndex + 1));
          continue;
        }
        if (amount === null) {
          skippedRows.push(l('excelInvalidAmount')(rowIndex + 1, name));
          continue;
        }

        const icon = getLeadingEmoji(rawName) || guessImportEmoji(name);
        const freq = parseFreq(freqStr);
        if (mode === 'income') newIncome.push({ icon, name, amount });
        else newExpenses.push({ icon, name, freq, amount, monthly: freqToMonthly(amount, freq) });
      }

      input.value = '';
      if (!newIncome.length && !newExpenses.length) {
        alert(l('excelNoData') + (skippedRows.length ? '\n\n' + skippedRows.join('\n') : ''));
        return;
      }

      const details = skippedRows.length ? [l('excelSkipped')(skippedRows.length), ...skippedRows] : [];
      showImportPreview({
        title: l('excelPreviewTitle'),
        summary: l('excelPreviewSummary')(newIncome.length, newExpenses.length),
        details,
        confirmLabel: l('import'),
        onConfirm: () => {
          income = newIncome;
          expenses = newExpenses;
          update(true);
          const toast = document.getElementById('importToast');
          toast.textContent = l('excelImported')(newIncome.length, newExpenses.length);
          toast.style.display = 'block';
          setTimeout(() => toast.style.display = 'none', 4000);
        }
      });
    } catch(err) {
      alert(l('excelImportError')(err.message));
      input.value = '';
    }
  };
  reader.readAsArrayBuffer(file);
}

function guessImportEmoji(name) {
  const n = name.toLowerCase();
  if (n.includes('pension') || n.includes('rente')) return '🏦';
  if (n.includes('wohnbei') || n.includes('beihilfe')) return '🏘️';
  if (n.includes('miete')) return '🏠';
  if (n.includes('gas')) return '🔥';
  if (n.includes('strom') || n.includes('elektro')) return '⚡';
  if (n.includes('wärme') || n.includes('heiz')) return '♨️';
  if (n.includes('handy') || n.includes('mobil') || n.includes('telefon')) return '📱';
  if (n.includes('internet') || n.includes('upc') || n.includes('wifi')) return '🌐';
  if (n.includes('versicher')) return '🛡️';
  if (n.includes('karte') || n.includes('öffi') || n.includes('bahn')) return '🚇';
  if (n.includes('lebensmittel') || n.includes('essen') || n.includes('supermarkt')) return '🛒';
  if (n.includes('arzt') || n.includes('medizin') || n.includes('apotheke')) return '💊';
  if (n.includes('sport') || n.includes('fitness')) return '🏋️';
  if (n.includes('auto') || n.includes('tank')) return '🚗';
  return '💸';
}

// ---- PDF Export ----
function exportPDF() {
  const tin  = totalIncome();
  const tout = totalExpenses();
  const bal  = tin - tout;
  const date = new Date().toLocaleDateString('de-AT', {month:'long', year:'numeric'});

  const rows_income = income.map(r =>
    `<tr><td>${r.icon} ${r.name}</td><td>Monatlich</td><td class="num">${fmt(r.amount)}</td></tr>`
  ).join('');

  const rows_expense = expenses.map(r => {
    const pct = tout > 0 ? (r.monthly/tout*100).toFixed(1) : '0';
    return `<tr><td>${r.icon} ${r.name}</td><td>${r.freq}</td><td class="num">${fmt(r.amount ?? r.monthly)}</td><td class="num">${fmt(r.monthly)}</td><td class="num">${pct}%</td></tr>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<style>
  body { font-family: -apple-system, Arial, sans-serif; color: #1a1a1a; margin: 0; padding: 32px; }
  h1 { font-size: 24px; font-weight: 700; margin: 0 0 4px; }
  .sub { color: #666; font-size: 13px; margin-bottom: 32px; }
  .banner { background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px; }
  .banner-label { font-size: 12px; color: #666; margin-bottom: 4px; }
  .banner-amount { font-size: 32px; font-weight: 700; color: ${bal >= 0 ? '#16a34a' : '#dc2626'}; }
  .cards { display: flex; gap: 16px; margin-bottom: 24px; }
  .card { flex: 1; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; }
  .card-label { font-size: 11px; color: #666; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
  .card-value { font-size: 20px; font-weight: 700; }
  .green { color: #16a34a; } .orange { color: #ea580c; }
  h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #666; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin: 24px 0 12px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { text-align: left; padding: 8px 10px; background: #f9fafb; border-bottom: 2px solid #e5e7eb; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #666; }
  td { padding: 9px 10px; border-bottom: 1px solid #f3f4f6; }
  .num { text-align: right; font-family: monospace; }
  .total-row td { font-weight: 700; border-top: 2px solid #e5e7eb; background: #f9fafb; }
  .footer { margin-top: 40px; font-size: 11px; color: #999; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 16px; }
</style>
</head>
<body>
<h1>💶 BudgetAtlas</h1>
<div class="sub">Monatliche Übersicht · ${date}</div>
<div class="banner"><div class="banner-label">Monatliches Polster</div><div class="banner-amount">${bal >= 0 ? '+' : ''}${fmt(bal)}</div></div>
<div class="cards">
  <div class="card"><div class="card-label">Einnahmen / Monat</div><div class="card-value green">${fmt(tin)}</div></div>
  <div class="card"><div class="card-label">Ausgaben / Monat</div><div class="card-value orange">${fmt(tout)}</div></div>
</div>
<h2>Einnahmen</h2>
<table><tr><th>Bezeichnung</th><th>Häufigkeit</th><th class="num">Betrag</th></tr>${rows_income}<tr class="total-row"><td colspan="2">Gesamt</td><td class="num">${fmt(tin)}</td></tr></table>
<h2>Ausgaben</h2>
<table><tr><th>Bezeichnung</th><th>Häufigkeit</th><th class="num">Betrag</th><th class="num">/ Monat</th><th class="num">Anteil</th></tr>${rows_expense}<tr class="total-row"><td colspan="3">Gesamt / Monat</td><td class="num">${fmt(tout)}</td><td></td></tr></table>
<div class="footer">Erstellt mit BudgetAtlas · ${new Date().toLocaleDateString('de-AT')}</div>
</body></html>`;

  const w = window.open('', '_blank');
  w.document.write(html);
  w.document.close();
  setTimeout(() => w.print(), 500);
}

// ---- Excel Export ----
function exportExcel() {
  const wb = XLSX.utils.book_new();
  const date = new Date().toLocaleDateString('de-AT', {month:'long', year:'numeric'});

  const data = [
    ['BudgetAtlas - ' + date],
    [],
    ['EINNAHMEN'],
    ['Bezeichnung', 'Betrag (€)', 'Häufigkeit'],
    ...income.map(r => [r.icon + ' ' + r.name, r.amount, 'Monatlich']),
    ['EINNAHMEN GESAMT', totalIncome()],
    [],
    ['AUSGABEN'],
    ['Bezeichnung', 'Betrag (€)', 'Betrag/Monat (€)', 'Häufigkeit', '% vom Budget'],
    ...expenses.map(r => {
      const pct = totalExpenses() > 0 ? +(r.monthly/totalExpenses()*100).toFixed(1) : 0;
      return [r.icon + ' ' + r.name, r.amount ?? r.monthly, r.monthly, r.freq, pct];
    }),
    ['AUSGABEN GESAMT / MONAT', null, totalExpenses()],
    [],
    ['BILANZ (Einnahmen - Ausgaben)', totalIncome() - totalExpenses()],
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  ws['!cols'] = [{wch:35},{wch:18},{wch:20},{wch:18},{wch:14}];
  XLSX.utils.book_append_sheet(wb, ws, 'Budget');
  XLSX.writeFile(wb, 'BudgetAtlas_' + new Date().toLocaleDateString('de-AT').replace(/\./g,'-') + '.xlsx');
}

// ---- JSON Backup ----
function exportJsonBackup() {
  const backup = {
    app: 'BudgetAtlas',
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
    data: { income, expenses },
    settings: {
      lang: currentLang,
      theme: currentTheme,
      sectionState: JSON.parse(localStorage.getItem('sectionState') || '{}'),
      pageSizes: {
        income: getListPageSize('income'),
        expenses: getListPageSize('expenses')
      }
    }
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'BudgetAtlas_Backup_' + new Date().toLocaleDateString('de-AT').replace(/\./g, '-') + '.json';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
  showToast(l('jsonExported'));
}

function normalizeBackupData(data) {
  if (!data || !Array.isArray(data.income) || !Array.isArray(data.expenses)) return null;
  const cleanIncome = data.income.map(r => ({
    icon: String(r.icon || '💰').trim() || '💰',
    name: String(r.name || '').trim(),
    amount: Number(r.amount)
  })).filter(r => r.name && Number.isFinite(r.amount) && r.amount >= 0);

  const cleanExpenses = data.expenses.map(r => {
    const freq = FREQ_KEYS.includes(r.freq) ? r.freq : 'Monatlich';
    const amount = Number(r.amount ?? freqFromMonthly(Number(r.monthly), freq));
    return {
      icon: String(r.icon || '💸').trim() || '💸',
      name: String(r.name || '').trim(),
      freq,
      amount,
      monthly: freqToMonthly(amount, freq)
    };
  }).filter(r => r.name && Number.isFinite(r.amount) && r.amount >= 0);

  return { income: cleanIncome, expenses: cleanExpenses };
}

let pendingImportAction = null;

function showImportPreview({ title, summary, notice = '', details = [], confirmLabel, onConfirm }) {
  const modal = document.getElementById('importPreviewModal');
  document.getElementById('importPreviewTitle').textContent = title;
  document.getElementById('importPreviewSummary').textContent = summary;
  document.getElementById('importPreviewNotice').textContent = notice;
  document.getElementById('importPreviewDetails').replaceChildren(...details.map(detail => {
    const item = document.createElement('li');
    item.textContent = detail;
    return item;
  }));
  document.getElementById('importPreviewCancel').textContent = l('cancel');
  document.getElementById('importPreviewConfirm').textContent = confirmLabel;
  pendingImportAction = onConfirm;
  modal.hidden = false;
  document.getElementById('importPreviewConfirm').focus();
}

function closeImportPreview() {
  const modal = document.getElementById('importPreviewModal');
  if (modal.hidden) return false;
  modal.hidden = true;
  pendingImportAction = null;
  return true;
}

function confirmImportPreview() {
  const action = pendingImportAction;
  closeImportPreview();
  if (action) action();
}

function containsBackupSettings(settings) {
  return !!settings && typeof settings === 'object' &&
    ['lang', 'theme', 'sectionState', 'pageSizes'].some(key => Object.prototype.hasOwnProperty.call(settings, key));
}

function restoreJsonBackup(restoredData, settings) {
  income = restoredData.income;
  expenses = restoredData.expenses;
  localStorage.setItem('budgetData', JSON.stringify({ income, expenses }));

  if (settings.lang === 'de' || settings.lang === 'en') {
    currentLang = settings.lang;
    localStorage.setItem('budgetLang', currentLang);
  }
  if (settings.theme === 'dark' || settings.theme === 'light') {
    currentTheme = settings.theme;
    localStorage.setItem('budgetTheme', currentTheme);
  }
  if (settings.sectionState && typeof settings.sectionState === 'object') {
    localStorage.setItem('sectionState', JSON.stringify(settings.sectionState));
  }
  if (settings.pageSizes && typeof settings.pageSizes === 'object') {
    ['income', 'expenses'].forEach(type => {
      const pageSize = Number(settings.pageSizes[type]);
      if (isListPageSize(pageSize)) {
        localStorage.setItem(getListPageSizeKey(type), String(pageSize));
      }
    });
  }
  document.querySelectorAll('.section-body').forEach(el => el.classList.remove('collapsed'));
  document.querySelectorAll('.section-chevron').forEach(el => el.style.transform = '');
  applyTheme();
  applyLang();
  initSectionState();
  update(false);
  showToast(l('jsonRestored'));
}

function importJsonBackup(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      const restoredData = normalizeBackupData(parsed.data || parsed);
      if (!restoredData) throw new Error('Invalid backup');

      const settings = parsed.settings || {};
      input.value = '';
      showImportPreview({
        title: l('jsonRestoreTitle'),
        summary: l('jsonRestoreSummary')(restoredData.income.length, restoredData.expenses.length, containsBackupSettings(settings)),
        notice: l('jsonRestoreReplaceNotice'),
        confirmLabel: l('restore'),
        onConfirm: () => restoreJsonBackup(restoredData, settings)
      });
    } catch(err) {
      alert(l('jsonInvalid'));
      input.value = '';
    }
  };
  reader.readAsText(file);
}

// ---- Image Export ----
async function exportImage() {
  const btn = document.getElementById('ioExportImage');
  const orig = btn.textContent;
  btn.textContent = '⏳ Wird erstellt…';
  btn.disabled = true;
  try {
    if (!window.html2canvas) {
      await new Promise((res, rej) => {
        const s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        s.onload = res; s.onerror = rej;
        document.head.appendChild(s);
      });
    }
    const container = document.querySelector('.main-content');
    if (!container) throw new Error('Dashboard not found');
    const canvas = await html2canvas(container, {
      backgroundColor: getComputedStyle(document.body).getPropertyValue('--bg').trim() || '#0f1117',
      scale: 2,
      useCORS: true,
      logging: false
    });
    const filename = 'BudgetAtlas_' + new Date().toLocaleDateString('de-AT').replace(/\./g, '-') + '.png';
    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(result => result ? resolve(result) : reject(new Error('PNG konnte nicht erstellt werden.')), 'image/png');
    });
    const file = new File([blob], filename, { type: 'image/png' });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'BudgetAtlas' });
        return;
      } catch (shareError) {
        if (shareError && shareError.name === 'AbortError') return;
      }
    }

    const link = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);
    link.download = filename;
    link.href = objectUrl;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  } catch(e) {
    alert('Bild-Export fehlgeschlagen. Bitte erneut versuchen.');
  } finally {
    btn.textContent = orig;
    btn.disabled = false;
  }
}
