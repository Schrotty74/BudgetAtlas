// Service Worker is registered from ./sw.js in <head>.

// ---- i18n ----
const I18N = {
  de: {
    monthlyOverview: 'Monatliche Übersicht',
    appTitle: '<span class="hl">BudgetAtlas</span>',
    installBanner: '📲 Als App installieren — läuft dann offline',
    installBtn: 'Installieren',
    discordTitle: 'Discord öffnen',
    githubTitle: 'GitHub öffnen',
    monthlyBuffer: 'Monatliches Polster',
    incomeMonth: 'Einnahmen / Monat',
    expenseMonth: 'Ausgaben / Monat',
    expenseMix: 'Ausgaben-Mix',
    income: 'Einnahmen',
    expenses: 'Ausgaben',
    addIncome: '+ Einnahme hinzufügen',
    addExpense: '+ Ausgabe hinzufügen',
    total: 'Gesamt',
    totalMonth: 'Gesamt / Monat',
    cancel: 'Abbrechen',
    save: 'Speichern',
    add: 'Hinzufügen',
    iconLabel: 'Icon',
    nameLabel: 'Bezeichnung',
    amountLabel: 'Betrag (€)',
    freqLabel: 'Häufigkeit',
    namePlaceholderIncome: 'z. B. Nebenjob',
    namePlaceholderExpense: 'z. B. Streaming',
    ioMenu: '📤 Import / Export',
    ioImport: '📥 Excel importieren',
    exportPDF: '🖨️ PDF exportieren',
    exportExcel: '📊 Excel exportieren',
    exportImage: '📷 Bild exportieren',
    exportJson: '💾 JSON-Backup exportieren',
    importJson: '♻️ JSON-Backup wiederherstellen',
    importExcel: '📥 Excel',
    importBig: '📥 Excel importieren',
    noData: 'Keine Daten vorhanden',
    noDataSub: 'Excel importieren oder manuell eintragen',
    footer: 'Daten werden lokal gespeichert · Läuft offline · v1.8',
    saved: '✓ gespeichert',
    updateAvailable: v => `🆕 Neue Version verfügbar: ${v} — Tippen zum Aktualisieren`,
    jsonExported: '✓ JSON-Backup exportiert',
    jsonRestored: '✓ JSON-Backup wiederhergestellt',
    jsonInvalid: 'Dieses JSON-Backup konnte nicht gelesen werden.',
    restoreConfirm: 'JSON-Backup wiederherstellen?\nAktuelle Daten und Einstellungen werden ersetzt.',
    jsonRestoreTitle: 'JSON-Backup wiederherstellen',
    jsonRestoreSummary: (incomeCount, expenseCount, hasSettings) => `${incomeCount} Einnahmen · ${expenseCount} Ausgaben${hasSettings ? ' · Einstellungen enthalten' : ''}`,
    jsonRestoreReplaceNotice: 'Aktuelle Daten und Einstellungen werden ersetzt.',
    restore: 'Wiederherstellen',
    excelPreviewTitle: 'Excel-Import prüfen',
    excelPreviewSummary: (incomeCount, expenseCount) => `${incomeCount} Einnahmen und ${expenseCount} Ausgaben erkannt`,
    import: 'Importieren',
    excelSkipped: count => `${count} fehlerhafte ${count === 1 ? 'Zeile wird' : 'Zeilen werden'} übersprungen:`,
    excelInvalidName: row => `Zeile ${row}: Bezeichnung fehlt.`,
    excelInvalidAmount: (row, name) => `Zeile ${row} (${name}): Betrag fehlt oder ist ungültig.`,
    excelNoData: 'Keine Daten erkannt.\nBitte prüfe, ob die Datei Abschnitte mit „Einnahmen“ und „Ausgaben“ enthält.',
    excelImportError: error => `Fehler beim Excel-Import: ${error}`,
    excelImported: (incomeCount, expenseCount) => `✓ ${incomeCount} Einnahmen & ${expenseCount} Ausgaben importiert`,
    freqs: ['🔁 Monatlich','📅 Alle 2 Monate','📅 Quartalsweise','📅 Jährlich','🔀 Variabel'],
    freqMonthly: 'Monatlich',
    itemDeleted: 'Eintrag gelöscht',
    undo: 'Rückgängig',
    deleteConfirm: null,
  },
  en: {
    monthlyOverview: 'Monthly Overview',
    appTitle: '<span class="hl">BudgetAtlas</span>',
    installBanner: '📲 Install as App — works offline',
    installBtn: 'Install',
    discordTitle: 'Open Discord',
    githubTitle: 'Open GitHub',
    monthlyBuffer: 'Monthly Buffer',
    incomeMonth: 'Income / Month',
    expenseMonth: 'Expenses / Month',
    expenseMix: 'Expense Mix',
    income: 'Income',
    expenses: 'Expenses',
    addIncome: '+ Add income',
    addExpense: '+ Add expense',
    total: 'Total',
    totalMonth: 'Total / Month',
    cancel: 'Cancel',
    save: 'Save',
    add: 'Add',
    iconLabel: 'Icon',
    nameLabel: 'Name',
    amountLabel: 'Amount (€)',
    freqLabel: 'Frequency',
    namePlaceholderIncome: 'e.g. Side job',
    namePlaceholderExpense: 'e.g. Streaming',
    ioMenu: '📤 Import / Export',
    ioImport: '📥 Import Excel',
    exportPDF: '🖨️ Export PDF',
    exportExcel: '📊 Export Excel',
    exportImage: '📷 Export image',
    exportJson: '💾 Export JSON backup',
    importJson: '♻️ Restore JSON backup',
    importExcel: '📥 Excel',
    importBig: '📥 Import Excel',
    noData: 'No data yet',
    noDataSub: 'Import Excel or add entries manually',
    footer: 'Data stored locally · Works offline · v1.8',
    saved: '✓ saved',
    updateAvailable: v => `🆕 New version available: ${v} — Tap to update`,
    jsonExported: '✓ JSON backup exported',
    jsonRestored: '✓ JSON backup restored',
    jsonInvalid: 'This JSON backup could not be read.',
    restoreConfirm: 'Restore JSON backup?\nCurrent data and settings will be replaced.',
    jsonRestoreTitle: 'Restore JSON backup',
    jsonRestoreSummary: (incomeCount, expenseCount, hasSettings) => `${incomeCount} income · ${expenseCount} expenses${hasSettings ? ' · settings included' : ''}`,
    jsonRestoreReplaceNotice: 'Current data and settings will be replaced.',
    restore: 'Restore',
    excelPreviewTitle: 'Check Excel import',
    excelPreviewSummary: (incomeCount, expenseCount) => `${incomeCount} income and ${expenseCount} expenses detected`,
    import: 'Import',
    excelSkipped: count => `${count} invalid ${count === 1 ? 'row is' : 'rows are'} skipped:`,
    excelInvalidName: row => `Row ${row}: Name is missing.`,
    excelInvalidAmount: (row, name) => `Row ${row} (${name}): Amount is missing or invalid.`,
    excelNoData: 'No data detected.\nPlease check that the file contains sections named “Einnahmen” and “Ausgaben”.',
    excelImportError: error => `Excel import error: ${error}`,
    excelImported: (incomeCount, expenseCount) => `✓ ${incomeCount} income & ${expenseCount} expenses imported`,
    freqs: ['🔁 Monthly','📅 Every 2 months','📅 Quarterly','📅 Yearly','🔀 Variable'],
    freqMonthly: 'Monthly',
    itemDeleted: 'Item deleted',
    undo: 'Undo',
    deleteConfirm: null,
  }
};

let currentLang = localStorage.getItem('budgetLang') || 'de';
let currentTheme = localStorage.getItem('budgetTheme') || 'dark';
let pendingDelete = null;
let undoTimer = null;

function t(key) { return I18N[currentLang][key]; }
function l(key) { return t(key); }

function applyTheme() {
  const root = document.getElementById('htmlRoot');
  if (currentTheme === 'light') {
    root.classList.add('light');
    document.getElementById('themeBtn').textContent = '🌙';
  } else {
    root.classList.remove('light');
    document.getElementById('themeBtn').textContent = '☀️';
  }
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('budgetTheme', currentTheme);
  applyTheme();
}

function applyLang() {
  const l = t;
  document.getElementById('htmlRoot').lang = currentLang;
  document.getElementById('langBtn').textContent = currentLang === 'de' ? '🌐 EN' : '🌐 DE';
  document.querySelector('.header-label').textContent = l('monthlyOverview');
  document.querySelector('.header h1').innerHTML = l('appTitle') + ' <span id="offlineBadge" style="' + document.getElementById('offlineBadge').getAttribute('style') + '">Offline</span>';
  document.querySelector('#installBanner span').textContent = l('installBanner');
  const installBtn = document.querySelector('.install-btn');
  if (installBtn) installBtn.textContent = l('installBtn');
  document.getElementById('discordBtn').title = l('discordTitle');
  document.getElementById('discordBtn').setAttribute('aria-label', l('discordTitle'));
  document.getElementById('githubBtn').title = l('githubTitle');
  document.getElementById('githubBtn').setAttribute('aria-label', l('githubTitle'));
  const bufferLabel = document.querySelector('.eyebrow span');
  if (bufferLabel) bufferLabel.textContent = l('monthlyBuffer');
  document.querySelectorAll('.card-label')[0].textContent = l('incomeMonth');
  document.querySelectorAll('.card-label')[1].textContent = l('expenseMonth');
  document.querySelector('.section-title span').textContent = l('expenseMix');
  document.getElementById('incomeSectionLabel').textContent = l('income');
  document.getElementById('expenseSectionLabel').textContent = l('expenses');
  document.querySelectorAll('.btn-add')[0].textContent = l('addIncome');
  document.querySelectorAll('.btn-add')[1].textContent = l('addExpense');
  document.querySelectorAll('.total-row span')[0].textContent = l('total');
  document.querySelectorAll('.total-row span')[2].textContent = l('totalMonth');
  document.getElementById('ioToggleBtn').textContent = l('ioMenu');
  document.getElementById('ioImport').childNodes[0].textContent = l('ioImport');
  document.getElementById('ioExportExcel').textContent = l('exportExcel');
  document.getElementById('ioExportPDF').textContent = l('exportPDF');
  document.getElementById('ioExportImage').textContent = l('exportImage');
  document.getElementById('ioExportJson').textContent = l('exportJson');
  document.getElementById('ioImportJson').childNodes[0].textContent = l('importJson');
  document.querySelector('.empty-title').textContent = l('noData');
  document.querySelector('.empty-sub').textContent = l('noDataSub');
  document.querySelector('.footer').textContent = l('footer');
  document.getElementById('saveIndicator').textContent = l('saved');
  const ub = document.getElementById('updateBanner');
  if (ub.dataset.version) document.getElementById('updateBannerText').textContent = l('updateAvailable')(ub.dataset.version);
  updateUndoToastText();
  update(false);
}

function toggleLang() {
  currentLang = currentLang === 'de' ? 'en' : 'de';
  localStorage.setItem('budgetLang', currentLang);
  applyLang();
}

// ---- Swipe to delete ----
function initSwipe(el, onDelete) {
  let startX = 0, curX = 0, swiping = false;
  const row = el.querySelector('.row');
  const bg  = el.querySelector('.swipe-bg');
  const threshold = 70;

  el.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    curX = startX;
    swiping = true;
  }, { passive: true });

  el.addEventListener('touchmove', e => {
    if (!swiping) return;
    curX = e.touches[0].clientX;
    const dx = Math.min(0, curX - startX);
    if (dx < -5) {
      row.style.transform = `translateX(${Math.max(dx, -90)}px)`;
      bg.style.opacity = Math.min(Math.abs(dx) / threshold, 1);
    }
  }, { passive: true });

  el.addEventListener('touchend', () => {
    if (!swiping) return;
    swiping = false;
    const dx = curX - startX;
    if (dx < -threshold) {
      row.style.transform = 'translateX(-110%)';
      bg.style.opacity = '1';
      setTimeout(onDelete, 200);
    } else {
      row.style.transform = '';
      bg.style.opacity = '0';
    }
  });
}

// ---- PWA Install ----
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBanner').classList.add('show');
});
document.getElementById('installBtn')?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById('installBanner').classList.remove('show');
});
function dismissInstall() { document.getElementById('installBanner').classList.remove('show'); }
window.addEventListener('appinstalled', () => document.getElementById('installBanner').classList.remove('show'));

// ---- Offline indicator ----
function updateOnlineStatus() {
  document.getElementById('offlineBadge').style.display = navigator.onLine ? 'none' : 'inline';
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

// ---- Data ----
const COLORS = ['#60a5fa','#f97316','#a78bfa','#34d399','#f43f5e','#fbbf24','#e879f9','#22d3ee','#fb7185','#84cc16'];
const DEFAULTS = { income: [], expenses: [] };

function freqFromMonthly(monthly, freq) {
  if (freq==='Alle 2 Monate') return monthly*2;
  if (freq==='Quartalsweise') return monthly*3;
  if (freq==='Jährlich') return monthly*12;
  return monthly;
}
function loadData() {
  try {
    const saved = localStorage.getItem('budgetData');
    if (saved) {
      const data = JSON.parse(saved);
      data.expenses = (data.expenses||[]).map(e => e.amount == null ? {...e, amount: freqFromMonthly(e.monthly, e.freq)} : e);
      return data;
    }
  } catch(e) {}
  return { income: [...DEFAULTS.income], expenses: [...DEFAULTS.expenses] };
}

let { income, expenses } = loadData();
let editing = null;
let saveTimer = null;

function saveData() {
  try {
    localStorage.setItem('budgetData', JSON.stringify({ income, expenses }));
    const ind = document.getElementById('saveIndicator');
    ind.classList.add('show');
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => ind.classList.remove('show'), 1800);
  } catch(e) {}
}

function showToast(message) {
  const toast = document.getElementById('importToast');
  toast.textContent = message;
  toast.style.display = 'block';
  setTimeout(() => toast.style.display = 'none', 4000);
}

// ---- Helpers ----
function freqToMonthly(amount, freq) {
  if (freq==='Alle 2 Monate') return amount/2;
  if (freq==='Quartalsweise') return amount/3;
  if (freq==='Jährlich') return amount/12;
  return amount;
}
function freqEmoji(f) { return f==='Monatlich'?'🔁':f==='Variabel'?'🔀':'📅'; }
const FREQ_KEYS = ['Monatlich','Alle 2 Monate','Quartalsweise','Jährlich','Variabel'];
function localFreq(f) {
  const idx = FREQ_KEYS.indexOf(f);
  if (idx < 0) return f;
  return I18N[currentLang].freqs[idx].replace(/^[^\w]+/, '').trim();
}
function fmt(n) { return n.toLocaleString('de-AT',{minimumFractionDigits:2,maximumFractionDigits:2})+' €'; }
function totalIncome() { return income.reduce((s,r)=>s+r.amount,0); }
function totalExpenses() { return expenses.reduce((s,r)=>s+r.monthly,0); }

// ---- Render income ----
function renderIncome() {
  const container = document.getElementById('incomeRows');
  container.innerHTML = '';
  income.forEach((r, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'row-wrap';
    wrap.id = `irow-${i}`;
    wrap.innerHTML = `
      <div class="swipe-bg">🗑</div>
      <div class="row">
        <span class="row-icon">${r.icon}</span>
        <div class="row-name-wrap"><span class="row-name">${r.name}</span></div>
        <span class="row-amount green">${fmt(r.amount)}</span>
        <div class="row-actions">
          <button class="icon-btn edit" onclick="startEdit('income',${i})" title="Bearbeiten">✎</button>
          <button class="icon-btn del" onclick="deleteItem('income',${i})" title="Löschen">×</button>
        </div>
      </div>`;
    container.appendChild(wrap);
    initSwipe(wrap, () => deleteItem('income', i));
    if (editing && editing.type==='income' && editing.idx===i) {
      const editDiv = document.createElement('div');
      editDiv.innerHTML = inlineEditHTML('income', i, r.icon, r.name, r.amount, '', false);
      container.appendChild(editDiv.firstElementChild);
    }
  });
}

// ---- Render expenses ----
function renderExpenses() {
  const total = totalExpenses();
  const container = document.getElementById('expenseRows');
  container.innerHTML = '';
  expenses.forEach((r, i) => {
    const pct = total > 0 ? r.monthly/total*100 : 0;
    const large = pct > 30;
    const wrap = document.createElement('div');
    wrap.className = 'row-wrap';
    wrap.id = `erow-${i}`;
    wrap.innerHTML = `
      <div class="swipe-bg">🗑</div>
      <div class="row">
        <span class="row-icon">${r.icon}</span>
        <div class="row-name-wrap">
          <span class="row-name">${r.name}</span>
          ${r.freq !== 'Monatlich' ? `<span class="row-freq-sub">${freqEmoji(r.freq)} ${localFreq(r.freq)}</span>` : ''}
        </div>
        <span class="row-amount">${fmt(r.amount ?? r.monthly)}</span>
        <span class="row-pct">${pct.toFixed(1)}%</span>
        <div class="pct-bar"><div class="pct-fill ${large?'large':''}" style="width:${Math.min(pct*2,100)}%"></div></div>
        <div class="row-actions">
          <button class="icon-btn edit" onclick="startEdit('expense',${i})" title="Bearbeiten">✎</button>
          <button class="icon-btn del" onclick="deleteItem('expense',${i})" title="Löschen">×</button>
        </div>
      </div>`;
    container.appendChild(wrap);
    initSwipe(wrap, () => deleteItem('expense', i));
    if (editing && editing.type==='expense' && editing.idx===i) {
      const editDiv = document.createElement('div');
      editDiv.innerHTML = inlineEditHTML('expense', i, r.icon, r.name, r.amount ?? r.monthly, r.freq, true);
      container.appendChild(editDiv.firstElementChild);
    }
  });
}

function inlineEditHTML(type, i, icon, name, amount, freq, showFreq) {
  const freqSel = showFreq ? `
    <div class="ef ef-freq"><label>${t('freqLabel')}</label>
      <select id="ef-freq-${type}-${i}">
        ${FREQ_KEYS.map((f,fi)=>`<option value="${f}"${f===freq?' selected':''}>${I18N[currentLang].freqs[fi]}</option>`).join('')}
      </select></div>` : '';
  return `<div class="edit-row open" id="edit-${type}-${i}">
    <div class="edit-fields">
      <div class="ef ef-icon"><label>${t('iconLabel')}</label><input id="ef-icon-${type}-${i}" value="${icon}" maxlength="4"></div>
      <div class="ef ef-name"><label>${t('nameLabel')}</label><input id="ef-name-${type}-${i}" value="${name}"></div>
      <div class="ef ef-amount"><label>${t('amountLabel')}</label><input id="ef-amount-${type}-${i}" type="number" inputmode="decimal" min="0" step="0.01" value="${amount}"></div>
      ${freqSel}
    </div>
    <div class="edit-actions">
      <button class="btn-discard" onclick="cancelEdit()">${t('cancel')}</button>
      <button class="btn-save" onclick="saveEdit('${type}',${i})">${t('save')}</button>
    </div>
  </div>`;
}

// ---- Edit ----
function startEdit(type, i) {
  if (editing && editing.type===type && editing.idx===i) { cancelEdit(); return; }
  editing = { type, idx: i };
  update(false);
  setTimeout(()=>{ const el=document.getElementById(`ef-name-${type}-${i}`); if(el){el.focus();el.select();} },60);
}
function cancelEdit() { editing = null; update(false); }
function saveEdit(type, i) {
  const icon = (document.getElementById(`ef-icon-${type}-${i}`)?.value.trim()) || (type==='income'?'💰':'💸');
  const name = document.getElementById(`ef-name-${type}-${i}`)?.value.trim();
  const rawVal = parseFloat(document.getElementById(`ef-amount-${type}-${i}`)?.value);
  if (!name || isNaN(rawVal) || rawVal < 0) return;
  if (type==='income') {
    income[i] = { icon, name, amount: rawVal };
  } else {
    const freq = document.getElementById(`ef-freq-${type}-${i}`)?.value || 'Monatlich';
    expenses[i] = { icon, name, freq, amount: rawVal, monthly: freqToMonthly(rawVal, freq) };
  }
  editing = null;
  update(true);
}

function updateUndoToastText() {
  const toast = document.getElementById('undoToast');
  if (!toast) return;
  toast.querySelector('span').textContent = t('itemDeleted');
  toast.querySelector('button').textContent = t('undo');
}
function showUndoToast() {
  const toast = document.getElementById('undoToast');
  clearTimeout(undoTimer);
  updateUndoToastText();
  toast.classList.add('show');
  undoTimer = setTimeout(() => {
    pendingDelete = null;
    toast.classList.remove('show');
  }, 5000);
}
function undoDelete() {
  if (!pendingDelete) return;
  clearTimeout(undoTimer);
  const { type, index, item } = pendingDelete;
  const list = type === 'income' ? income : expenses;
  list.splice(Math.min(index, list.length), 0, item);
  pendingDelete = null;
  document.getElementById('undoToast').classList.remove('show');
  update(true);
}
function deleteItem(type, i) {
  if (editing && editing.type===type && editing.idx===i) editing = null;
  const list = type === 'income' ? income : expenses;
  if (i < 0 || i >= list.length) return;
  pendingDelete = { type, index: i, item: list[i] };
  list.splice(i, 1);
  update(true);
  showUndoToast();
}

// ---- Collapsible sections ----
function toggleSection(type) {
  const body = document.getElementById(type === 'income' ? 'incomeBody' : 'expenseBody');
  const chevron = document.getElementById(type === 'income' ? 'incomeChevron' : 'expenseChevron');
  const collapsed = body.classList.toggle('collapsed');
  chevron.style.transform = collapsed ? 'rotate(-90deg)' : '';
  try {
    const state = JSON.parse(localStorage.getItem('sectionState') || '{}');
    state[type] = collapsed;
    localStorage.setItem('sectionState', JSON.stringify(state));
  } catch(e) {}
}
function initSectionState() {
  try {
    const state = JSON.parse(localStorage.getItem('sectionState') || '{}');
    ['income','expense'].forEach(type => {
      if (state[type]) {
        const body = document.getElementById(type === 'income' ? 'incomeBody' : 'expenseBody');
        const chevron = document.getElementById(type === 'income' ? 'incomeChevron' : 'expenseChevron');
        body.classList.add('collapsed');
        chevron.style.transform = 'rotate(-90deg)';
      }
    });
  } catch(e) {}
}

// ---- Add ----
function toggleAdd(type) {
  const id = type==='income' ? 'incomeAddForm' : 'expenseAddForm';
  const el = document.getElementById(id);
  const wasOpen = el.classList.contains('open');
  closeAdd('income'); closeAdd('expense');
  if (!wasOpen) {
    el.classList.add('open');
    setTimeout(()=>{ const f=el.querySelector('input[placeholder]'); if(f)f.focus(); },50);
  }
}
function closeAdd(type) { document.getElementById(type==='income'?'incomeAddForm':'expenseAddForm').classList.remove('open'); }
function confirmAddIncome() {
  const icon=document.getElementById('aiIcon').value.trim()||'💰';
  const name=document.getElementById('aiName').value.trim();
  const amount=parseFloat(document.getElementById('aiAmount').value);
  if(!name||isNaN(amount)||amount<=0){document.getElementById('aiName').focus();return;}
  income.push({icon,name,amount});
  document.getElementById('aiName').value=''; document.getElementById('aiAmount').value=''; document.getElementById('aiIcon').value='💰';
  closeAdd('income'); update(true);
}
function confirmAddExpense() {
  const icon=document.getElementById('aeIcon').value.trim()||'💸';
  const name=document.getElementById('aeName').value.trim();
  const raw=parseFloat(document.getElementById('aeAmount').value);
  const freq=document.getElementById('aeFreq').value;
  if(!name||isNaN(raw)||raw<=0){document.getElementById('aeName').focus();return;}
  expenses.push({icon,name,freq,amount:raw,monthly:freqToMonthly(raw,freq)});
  document.getElementById('aeName').value=''; document.getElementById('aeAmount').value=''; document.getElementById('aeIcon').value='💸';
  closeAdd('expense'); update(true);
}

// ---- Donut ----
function renderDonut() {
  const total=totalExpenses();
  const circ=2*Math.PI*72; let offset=0, paths='';
  expenses.forEach((exp,i)=>{
    const dash=total>0?exp.monthly/total*circ:0;
    paths+=`<circle cx="90" cy="90" r="72" fill="none" stroke="${COLORS[i%COLORS.length]}" stroke-width="22"
      stroke-dasharray="${dash.toFixed(2)} ${(circ-dash).toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}"
      style="cursor:pointer;transition:opacity 0.15s"
      onmouseenter="hlSlice(${i})" onmouseleave="hlSlice(-1)"
      ontouchstart="hlSlice(${i})" ontouchend="hlSlice(-1)"/>`;
    offset+=dash;
  });
  document.getElementById('donutSvg').innerHTML=`<circle cx="90" cy="90" r="61" fill="var(--bg)"/>` + paths;
  document.getElementById('legend').innerHTML=expenses.map((e,i)=>`<div class="legend-item"><div class="legend-dot" style="background:${COLORS[i%COLORS.length]}"></div>${e.name}</div>`).join('');
  setDonutDefault();
}
function setDonutDefault() {
  const total=totalExpenses();
  const top=expenses.length?expenses.reduce((a,b)=>a.monthly>b.monthly?a:b):{name:'–',monthly:0};
  document.getElementById('donutPct').textContent = total>0?(top.monthly/total*100).toFixed(0)+'%':'–';
  document.getElementById('donutLabel').textContent = top.name;
}
function hlSlice(idx) {
  const total=totalExpenses();
  document.querySelectorAll('#donutSvg circle').forEach((c,i)=>c.style.opacity=(idx===-1||i===idx)?'1':'0.2');
  if(idx>=0){
    const e=expenses[idx];
    document.getElementById('donutPct').textContent = total>0?(e.monthly/total*100).toFixed(0)+'%':'–';
    document.getElementById('donutLabel').textContent = e.name;
  } else setDonutDefault();
}

// ---- Main update ----
function update(save=true) {
  const tin=totalIncome(), tout=totalExpenses(), bal=tin-tout;
  document.getElementById('totalIn').textContent = fmt(tin);
  document.getElementById('totalOut').textContent = fmt(tout);
  document.getElementById('inTotal').textContent = fmt(tin);
  document.getElementById('outTotal').textContent = fmt(tout);
  document.getElementById('balance').textContent = (bal>=0?'+':'')+fmt(bal);
  document.getElementById('balance').style.color = bal>=0?'var(--accent)':'var(--red)';
  document.getElementById('balanceBanner').classList.toggle('negative', bal<0);
  const barPct=tin>0?Math.max(Math.min(bal/tin*100,100),0):0;
  setTimeout(()=>{
    document.getElementById('balanceBar').style.width=barPct+'%';
    document.getElementById('balanceBar').style.background=bal>=0?'var(--accent)':'var(--red)';
  },80);
  renderIncome();
  renderExpenses();
  renderDonut();
  if (save) saveData();
  checkEmptyState();
}

document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){
    if (typeof closeImportPreview === 'function' && closeImportPreview()) return;
    cancelEdit(); closeAdd('income'); closeAdd('expense');
  }
  if(e.key==='Enter'&&!e.shiftKey){
    if(document.getElementById('incomeAddForm').classList.contains('open')) confirmAddIncome();
    else if(document.getElementById('expenseAddForm').classList.contains('open')) confirmAddExpense();
    else if(editing) saveEdit(editing.type, editing.idx);
  }
});

function checkEmptyState() {
  const empty = !income.length && !expenses.length;
  const el = document.getElementById('emptyState');
  if (el) el.style.display = empty ? 'block' : 'none';
  const banner = document.getElementById('balanceBanner');
  if (banner) banner.style.display = empty ? 'none' : '';
  const cards = document.querySelector('.cards');
  if (cards) cards.style.display = empty ? 'none' : '';
}

update(false);
checkEmptyState();
applyTheme();
if (currentLang === 'en') applyLang();
initSectionState();

// ---- Update check ----
const APP_VERSION = 'v1.8';
function dismissUpdate() {
  document.getElementById('updateBanner').classList.remove('show');
}
async function checkForUpdate() {
  try {
    const stored = JSON.parse(localStorage.getItem('updateCheck') || '{}');
    const now = Date.now();
    if (stored.ts && now - stored.ts < 86400000) return;
    const res = await fetch('https://schrotty74.github.io/BudgetAtlas/version.json?t=' + now, {cache: 'no-store'});
    if (!res.ok) return;
    const data = await res.json();
    const latest = (data.version || '').trim();
    localStorage.setItem('updateCheck', JSON.stringify({ts: now, latest}));
    if (latest && latest !== APP_VERSION) {
      const banner = document.getElementById('updateBanner');
      banner.dataset.version = latest;
      document.getElementById('updateBannerText').textContent = l('updateAvailable')(latest);
      banner.classList.add('show');
    }
  } catch(e) {}
}
setTimeout(checkForUpdate, 3000);

// ---- Reminder / Push Notifications ----
function updateReminderBtn(enabled) {
  const btn = document.getElementById('reminderBtn');
  btn.style.color = enabled ? 'var(--accent)' : '';
  btn.style.borderColor = enabled ? 'var(--accent)' : '';
  btn.title = enabled ? 'Erinnerung aktiv – zum Deaktivieren klicken' : 'Tägliche Erinnerung aktivieren';
}
async function toggleReminder() {
  const enabled = localStorage.getItem('reminderEnabled') === 'true';
  if (enabled) {
    localStorage.setItem('reminderEnabled', 'false');
    updateReminderBtn(false);
    return;
  }
  if (!('Notification' in window)) {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (isIOS) {
      alert('Benachrichtigungen funktionieren auf iPhone/iPad nur wenn die App installiert ist.\n\n👉 Teilen → „Zum Home-Bildschirm" → App öffnen → 🔔 aktivieren');
    } else {
      alert('Dein Browser unterstützt keine Benachrichtigungen.');
    }
    return;
  }
  if (Notification.permission === 'denied') {
    alert('Benachrichtigungen sind blockiert. Bitte in den Browser-Einstellungen freigeben.');
    return;
  }
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return;
  const time = prompt('Uhrzeit für tägliche Erinnerung (Format HH:MM):', '20:00');
  if (!time || !/^\d{1,2}:\d{2}$/.test(time)) return;
  localStorage.setItem('reminderEnabled', 'true');
  localStorage.setItem('reminderTime', time);
  updateReminderBtn(true);
  scheduleReminderToday();
}
function scheduleReminderToday() {
  const time = localStorage.getItem('reminderTime') || '20:00';
  const [h, m] = time.split(':').map(Number);
  const today = new Date().toDateString();
  if (localStorage.getItem('reminderLastSent') === today) return;
  const scheduled = new Date();
  scheduled.setHours(h, m, 0, 0);
  const diff = scheduled - Date.now();
  if (diff <= 0) showReminder();
  else setTimeout(showReminder, diff);
}
function showReminder() {
  localStorage.setItem('reminderLastSent', new Date().toDateString());
  const opts = { body: 'Hast du heute deine Ausgaben eingetragen? 💶' };
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'SHOW_NOTIFICATION', title: 'BudgetAtlas', ...opts });
  } else {
    new Notification('BudgetAtlas', opts);
  }
}
(function initReminder() {
  const enabled = localStorage.getItem('reminderEnabled') === 'true';
  updateReminderBtn(enabled);
  if (enabled && Notification.permission === 'granted') scheduleReminderToday();
})();

// ---- Motion enhancements ----
(() => {
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let previousTotals = null;
  let importTimer = null;

  function restartClass(el, className) {
    if (!el || reduceMotion()) return;
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
  }

  function animateDonut() {
    const svg = document.getElementById('donutSvg');
    if (!svg || reduceMotion()) return;
    const circumference = 2 * Math.PI * 72;
    [...svg.querySelectorAll('circle')].slice(1).forEach(circle => {
      circle.style.setProperty('--donut-circumference', `${circumference}`);
      restartClass(circle, 'donut-segment-animate');
    });
  }

  function animatePctBars() {
    if (reduceMotion()) return;
    document.querySelectorAll('.pct-fill').forEach(el => restartClass(el, 'pct-animate'));
  }

  function animateCardsIfChanged() {
    const incomeValue = document.getElementById('totalIn')?.textContent || '';
    const expenseValue = document.getElementById('totalOut')?.textContent || '';
    const balanceValue = document.getElementById('balance')?.textContent || '';
    const next = { income: incomeValue, expense: expenseValue, balance: balanceValue };
    if (previousTotals) {
      const cards = document.querySelectorAll('.cards .card');
      if (incomeValue !== previousTotals.income) restartClass(cards[0], 'motion-pulse');
      if (expenseValue !== previousTotals.expense) restartClass(cards[1], 'motion-pulse');
      if (balanceValue !== previousTotals.balance) restartClass(document.getElementById('balanceBanner'), 'motion-pulse');
    }
    previousTotals = next;
  }

  function animateDashboardImport() {
    const container = document.querySelector('.main-content');
    if (!container || reduceMotion()) return;
    clearTimeout(importTimer);
    container.classList.remove('dashboard-import-pulse');
    void container.offsetWidth;
    container.classList.add('dashboard-import-pulse');
    importTimer = setTimeout(() => container.classList.remove('dashboard-import-pulse'), 900);
  }

  const originalUpdate = window.update;
  if (typeof originalUpdate === 'function') {
    window.update = function(...args) {
      const result = originalUpdate.apply(this, args);
      requestAnimationFrame(() => {
        animateDonut();
        animatePctBars();
        animateCardsIfChanged();
      });
      return result;
    };
  }

  const originalDeleteItem = window.deleteItem;
  if (typeof originalDeleteItem === 'function') {
    window.deleteItem = function(type, index) {
      if (reduceMotion()) return originalDeleteItem.call(this, type, index);
      const id = type === 'income' ? `irow-${index}` : `erow-${index}`;
      const row = document.getElementById(id);
      if (!row) return originalDeleteItem.call(this, type, index);
      const height = row.getBoundingClientRect().height;
      row.style.maxHeight = `${height}px`;
      row.classList.add('motion-removing');
      setTimeout(() => originalDeleteItem.call(this, type, index), 230);
    };
  }

  const toast = document.getElementById('importToast');
  if (toast) {
    const observer = new MutationObserver(() => {
      const text = toast.textContent || '';
      if (text.includes('importiert') || text.includes('imported') || text.includes('wiederhergestellt') || text.includes('restored')) {
        animateDashboardImport();
      }
    });
    observer.observe(toast, { childList: true, characterData: true, subtree: true });
  }

  requestAnimationFrame(() => {
    previousTotals = {
      income: document.getElementById('totalIn')?.textContent || '',
      expense: document.getElementById('totalOut')?.textContent || '',
      balance: document.getElementById('balance')?.textContent || ''
    };
    animateDonut();
    animatePctBars();
  });
})();