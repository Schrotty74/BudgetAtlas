(() => {
  function isEnglish() {
    return document.documentElement.lang === 'en';
  }

  function refreshReferenceMetrics() {
    if (typeof totalIncome !== 'function' || typeof totalExpenses !== 'function' || typeof fmt !== 'function') return;

    const incomeTotal = totalIncome();
    const expenseTotal = totalExpenses();
    const expensePct = incomeTotal > 0
      ? Math.min(Math.max((expenseTotal / incomeTotal) * 100, 0), 999)
      : 0;

    const heroLabel = document.getElementById('heroMetaLeft');
    const heroRatio = document.getElementById('heroRatio');
    const donutLabel = document.getElementById('donutCenterLabel');
    const donutTotal = document.getElementById('donutTotal');

    if (heroLabel) heroLabel.textContent = isEnglish() ? 'Expense ratio' : 'Ausgabenanteil';
    if (heroRatio) heroRatio.textContent = incomeTotal > 0 ? `${Math.round(expensePct)} %` : '–';
    if (donutLabel) donutLabel.textContent = isEnglish() ? 'Total expenses' : 'Gesamtausgaben';
    if (donutTotal) donutTotal.textContent = fmt(expenseTotal);
  }

  if (typeof setDonutDefault === 'function') {
    const originalSetDonutDefault = setDonutDefault;
    window.setDonutDefault = function() {
      originalSetDonutDefault();
      const total = typeof totalExpenses === 'function' ? totalExpenses() : 0;
      const value = document.getElementById('donutPct');
      const label = document.getElementById('donutLabel');
      if (value && typeof fmt === 'function') value.textContent = fmt(total);
      if (label) label.textContent = isEnglish() ? 'Total' : 'Gesamt';
    };
  }

  if (typeof update === 'function') {
    const originalUpdate = update;
    window.update = function(...args) {
      const result = originalUpdate.apply(this, args);
      refreshReferenceMetrics();
      if (typeof window.setDonutDefault === 'function') window.setDonutDefault();
      return result;
    };
  }

  let openMobileIO = () => {};

  function buildMobileIOMenu() {
    const existing = document.getElementById('mobileIOSheet');
    if (existing) {
      openMobileIO = () => {
        existing.hidden = false;
        requestAnimationFrame(() => existing.classList.add('open'));
      };
      window.openMobileIO = openMobileIO;
      return;
    }

    const sheet = document.createElement('div');
    sheet.id = 'mobileIOSheet';
    sheet.className = 'mobile-io-backdrop';
    sheet.hidden = true;
    sheet.innerHTML = `
      <div class="mobile-io-sheet" role="dialog" aria-modal="true" aria-labelledby="mobileIOTitle">
        <div class="mobile-io-handle"></div>
        <div class="mobile-io-head">
          <div>
            <strong id="mobileIOTitle">Import / Export</strong>
            <span>${isEnglish() ? 'Manage your local budget data' : 'Lokale Budgetdaten verwalten'}</span>
          </div>
          <button type="button" class="mobile-io-close" aria-label="Schließen">×</button>
        </div>
        <div class="mobile-io-grid">
          <label class="mobile-io-action primary"><span>↓</span><b>${isEnglish() ? 'Import Excel' : 'Excel importieren'}</b><input id="mobileExcelImport" type="file" accept=".xlsx,.xls" hidden></label>
          <button type="button" class="mobile-io-action" data-io="excel"><span>↥</span><b>${isEnglish() ? 'Export Excel' : 'Excel exportieren'}</b></button>
          <button type="button" class="mobile-io-action" data-io="pdf"><span>▤</span><b>PDF</b></button>
          <button type="button" class="mobile-io-action" data-io="image"><span>▣</span><b>PNG</b></button>
          <button type="button" class="mobile-io-action" data-io="json"><span>◇</span><b>JSON Backup</b></button>
          <label class="mobile-io-action"><span>↺</span><b>${isEnglish() ? 'Restore JSON' : 'JSON wiederherstellen'}</b><input id="mobileJsonImport" type="file" accept=".json,application/json" hidden></label>
        </div>
      </div>`;

    document.body.appendChild(sheet);

    const close = () => {
      sheet.classList.remove('open');
      setTimeout(() => { sheet.hidden = true; }, 180);
    };

    openMobileIO = () => {
      sheet.hidden = false;
      requestAnimationFrame(() => sheet.classList.add('open'));
    };
    window.openMobileIO = openMobileIO;

    sheet.addEventListener('click', event => {
      if (event.target === sheet || event.target.closest('.mobile-io-close')) close();
    });

    document.getElementById('mobileExcelImport')?.addEventListener('change', event => {
      if (event.target.files?.length && typeof importExcel === 'function') importExcel(event.target);
      close();
    });
    document.getElementById('mobileJsonImport')?.addEventListener('change', event => {
      if (event.target.files?.length && typeof importJsonBackup === 'function') importJsonBackup(event.target);
      close();
    });

    sheet.querySelector('[data-io="excel"]')?.addEventListener('click', () => { if (typeof exportExcel === 'function') exportExcel(); close(); });
    sheet.querySelector('[data-io="pdf"]')?.addEventListener('click', () => { if (typeof exportPDF === 'function') exportPDF(); close(); });
    sheet.querySelector('[data-io="image"]')?.addEventListener('click', () => { if (typeof exportImage === 'function') exportImage(); close(); });
    sheet.querySelector('[data-io="json"]')?.addEventListener('click', () => { if (typeof exportJsonBackup === 'function') exportJsonBackup(); close(); });

    const quickIO = document.querySelector('.quick-actions button:last-child');
    if (quickIO) {
      quickIO.onclick = null;
      quickIO.removeAttribute('onclick');
      quickIO.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        openMobileIO();
      });
    }

    window.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !sheet.hidden) close();
    });
  }

  function buildMoreMenu() {
    const moreButton = document.querySelector('.bottom-nav button:last-child');
    if (!moreButton) return;

    const sheet = document.createElement('div');
    sheet.id = 'mobileMoreSheet';
    sheet.className = 'mobile-more-backdrop';
    sheet.hidden = true;
    sheet.innerHTML = `
      <div class="mobile-more-sheet" role="dialog" aria-modal="true" aria-labelledby="mobileMoreTitle">
        <div class="mobile-more-handle"></div>
        <div class="mobile-more-head">
          <strong id="mobileMoreTitle">${isEnglish() ? 'More' : 'Mehr'}</strong>
          <button type="button" class="mobile-more-close" aria-label="Schließen">×</button>
        </div>
        <div class="mobile-more-list">
          <button type="button" data-more="mix"><span>◉</span><b>${isEnglish() ? 'Expense mix' : 'Ausgaben-Mix'}</b><small>${isEnglish() ? 'Show spending distribution' : 'Verteilung der Ausgaben anzeigen'}</small></button>
          <button type="button" data-more="io"><span>⇅</span><b>Import / Export</b><small>${isEnglish() ? 'Manage local data' : 'Lokale Daten verwalten'}</small></button>
          <button type="button" data-more="lang"><span>🌐</span><b>${isEnglish() ? 'Language' : 'Sprache'}</b><small>${isEnglish() ? 'Switch German / English' : 'Deutsch / Englisch wechseln'}</small></button>
          <button type="button" data-more="theme"><span>◐</span><b>${isEnglish() ? 'Appearance' : 'Darstellung'}</b><small>${isEnglish() ? 'Switch light / dark' : 'Hell / Dunkel wechseln'}</small></button>
        </div>
      </div>`;

    document.body.appendChild(sheet);

    const close = () => {
      sheet.classList.remove('open');
      setTimeout(() => { sheet.hidden = true; }, 180);
    };
    const open = () => {
      sheet.hidden = false;
      requestAnimationFrame(() => sheet.classList.add('open'));
    };

    document.addEventListener('click', event => {
      const clickedMore = event.target.closest('.bottom-nav button:last-child');
      if (!clickedMore) return;
      event.preventDefault();
      event.stopPropagation();
      open();
    }, true);

    sheet.addEventListener('click', event => {
      if (event.target === sheet || event.target.closest('.mobile-more-close')) {
        close();
        return;
      }
      const action = event.target.closest('[data-more]')?.dataset.more;
      if (!action) return;
      close();
      if (action === 'mix') {
        setTimeout(() => document.getElementById('mixSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 190);
      } else if (action === 'io') {
        setTimeout(() => window.openMobileIO?.(), 190);
      } else if (action === 'lang' && typeof toggleLang === 'function') {
        toggleLang();
      } else if (action === 'theme' && typeof toggleTheme === 'function') {
        toggleTheme();
      }
    });
  }

  refreshReferenceMetrics();
  if (typeof window.setDonutDefault === 'function') window.setDonutDefault();
  buildMobileIOMenu();
  buildMoreMenu();
})();

/* Consolidated from language-sync.js */
(() => {
  const copy = {
    de: {
      overview:'Übersicht', income:'Einnahmen', expenses:'Ausgaben', mix:'Ausgaben-Mix', more:'Mehr',
      monthlyOverview:'Monatliche Übersicht', monthlyBuffer:'Monatliches Polster', stillAvailable:'Noch verfügbar', available:'Verfügbar', expenseRatio:'Ausgabenanteil',
      incomeMonth:'Einnahmen / Monat', expenseMonth:'Ausgaben / Monat', thisMonth:'Diesen Monat', totalExpenses:'Gesamtausgaben', total:'Gesamt', totalMonth:'Gesamt / Monat',
      quick:'Schnellzugriff', quickIncome:'Einnahme', quickExpense:'Ausgabe',
      addIncome:'+ Einnahme hinzufügen', addExpense:'+ Ausgabe hinzufügen',
      localStored:'Daten lokal gespeichert', footer:'Daten werden lokal gespeichert · Läuft offline · v1.0',
      install:'📲 Als App installieren — läuft dann offline', installBtn:'Installieren',
      ioSub:'Daten importieren oder exportieren', importExcel:'Excel importieren', exportExcel:'Excel exportieren', exportPDF:'PDF exportieren', exportImage:'Bild exportieren', exportJson:'JSON-Backup exportieren', restoreJson:'JSON-Backup wiederherstellen',
      noData:'Keine Daten vorhanden', noDataSub:'Excel importieren oder manuell eintragen',
      icon:'Icon', name:'Bezeichnung', amount:'Betrag (€)', frequency:'Häufigkeit', cancel:'Abbrechen', add:'Hinzufügen',
      incomePlaceholder:'z. B. Nebenjob', expensePlaceholder:'z. B. Streaming',
      mobileData:'Lokale Budgetdaten verwalten', language:'Sprache', languageSub:'Deutsch / Englisch wechseln', appearance:'Darstellung', appearanceSub:'Hell / Dunkel wechseln', mixSub:'Verteilung der Ausgaben anzeigen', ioManage:'Lokale Daten verwalten',
      saved:'✓ gespeichert'
    },
    en: {
      overview:'Overview', income:'Income', expenses:'Expenses', mix:'Expense Mix', more:'More',
      monthlyOverview:'Monthly Overview', monthlyBuffer:'Monthly Buffer', stillAvailable:'Still available', available:'Available', expenseRatio:'Expense ratio',
      incomeMonth:'Income / Month', expenseMonth:'Expenses / Month', thisMonth:'This month', totalExpenses:'Total expenses', total:'Total', totalMonth:'Total / Month',
      quick:'Quick access', quickIncome:'Income', quickExpense:'Expense',
      addIncome:'+ Add income', addExpense:'+ Add expense',
      localStored:'Data stored locally', footer:'Data stored locally · Works offline · v1.0',
      install:'📲 Install as App — works offline', installBtn:'Install',
      ioSub:'Import or export data', importExcel:'Import Excel', exportExcel:'Export Excel', exportPDF:'Export PDF', exportImage:'Export image', exportJson:'Export JSON backup', restoreJson:'Restore JSON backup',
      noData:'No data yet', noDataSub:'Import Excel or add entries manually',
      icon:'Icon', name:'Name', amount:'Amount (€)', frequency:'Frequency', cancel:'Cancel', add:'Add',
      incomePlaceholder:'e.g. Side job', expensePlaceholder:'e.g. Streaming',
      mobileData:'Manage your local budget data', language:'Language', languageSub:'Switch German / English', appearance:'Appearance', appearanceSub:'Switch light / dark', mixSub:'Show spending distribution', ioManage:'Manage local data',
      saved:'✓ saved'
    }
  };

  function lang() {
    try { return currentLang === 'en' ? 'en' : 'de'; }
    catch (_) { return document.documentElement.lang === 'en' ? 'en' : 'de'; }
  }
  function q(sel){ return document.querySelector(sel); }
  function qa(sel){ return [...document.querySelectorAll(sel)]; }
  function setText(sel, value){ const el=q(sel); if(el) el.textContent=value; }

  function setButtonLabel(button, icon, label) {
    if (!button) return;
    button.innerHTML = `<span>${icon}</span>${label}`;
  }

  function syncMenus(c) {
    const mobileIO = document.getElementById('mobileIOSheet');
    if (mobileIO) {
      const sub = mobileIO.querySelector('.mobile-io-head span'); if (sub) sub.textContent = c.mobileData;
      const actions = mobileIO.querySelectorAll('.mobile-io-action b');
      if (actions[0]) actions[0].textContent = c.importExcel;
      if (actions[1]) actions[1].textContent = c.exportExcel;
      if (actions[5]) actions[5].textContent = c.restoreJson;
    }

    const more = document.getElementById('mobileMoreSheet');
    if (more) {
      setText('#mobileMoreTitle', c.more);
      const items = more.querySelectorAll('[data-more]');
      if (items[0]) { const b=items[0].querySelector('b'), s=items[0].querySelector('small'); if(b)b.textContent=c.mix; if(s)s.textContent=c.mixSub; }
      if (items[1]) { const s=items[1].querySelector('small'); if(s)s.textContent=c.ioManage; }
      if (items[2]) { const b=items[2].querySelector('b'), s=items[2].querySelector('small'); if(b)b.textContent=c.language; if(s)s.textContent=c.languageSub; }
      if (items[3]) { const b=items[3].querySelector('b'), s=items[3].querySelector('small'); if(b)b.textContent=c.appearance; if(s)s.textContent=c.appearanceSub; }
    }
  }

  function syncLanguageUI() {
    const code = lang();
    const c = copy[code];
    document.documentElement.lang = code;

    const langBtn = document.getElementById('langBtn');
    if (langBtn) langBtn.textContent = `🌐 ${code.toUpperCase()}`;

    setText('.header-label', c.monthlyOverview);
    setText('.eyebrow span', c.monthlyBuffer);
    setText('.hero-status', c.stillAvailable);
    setText('#heroMetaLeft', c.expenseRatio);
    setText('#donutCenterLabel', c.totalExpenses);

    const cardLabels = qa('.card-label');
    if (cardLabels[0]) cardLabels[0].textContent = c.incomeMonth;
    if (cardLabels[1]) cardLabels[1].textContent = c.expenseMonth;
    qa('.summary-caption').forEach(el => el.textContent = c.thisMonth);

    setText('#mixSection .section-title span', c.mix);
    setText('#incomeSectionLabel', c.income);
    setText('#expenseSectionLabel', c.expenses);

    const quick = q('.quick-title'); if (quick) quick.textContent = c.quick;
    const quickBtns = qa('.quick-actions button b');
    if (quickBtns[0]) quickBtns[0].textContent = c.quickIncome;
    if (quickBtns[1]) quickBtns[1].textContent = c.quickExpense;
    if (quickBtns[2]) quickBtns[2].textContent = 'Import / Export';

    const addBtns = qa('.btn-add');
    if (addBtns[0]) addBtns[0].textContent = c.addIncome;
    if (addBtns[1]) addBtns[1].textContent = c.addExpense;
    const totals = qa('.total-row span:first-child');
    if (totals[0]) totals[0].textContent = c.total;
    if (totals[1]) totals[1].textContent = c.totalMonth;

    const side = qa('.side-nav .nav-item');
    setButtonLabel(side[0], '⌂', c.overview);
    setButtonLabel(side[1], '▣', c.income);
    setButtonLabel(side[2], '▤', c.expenses);
    setButtonLabel(side[3], '◉', c.mix);

    const bottom = qa('.bottom-nav button');
    setButtonLabel(bottom[0], '⌂', c.overview);
    setButtonLabel(bottom[1], '▣', c.income);
    setButtonLabel(bottom[2], '▤', c.expenses);
    setButtonLabel(bottom[3], '•••', c.more);

    const ioToggle = document.getElementById('ioToggleBtn');
    if (ioToggle) ioToggle.innerHTML = `<span>⇅</span><b>Import / Export</b><small>${c.ioSub}</small>`;
    const ioImport = document.getElementById('ioImport'); if (ioImport?.firstChild) ioImport.firstChild.textContent = `📥 ${c.importExcel}`;
    setText('#ioExportExcel', `📊 ${c.exportExcel}`);
    setText('#ioExportPDF', `🖨️ ${c.exportPDF}`);
    setText('#ioExportImage', `📷 ${c.exportImage}`);
    setText('#ioExportJson', `💾 ${c.exportJson}`);
    const ioImportJson = document.getElementById('ioImportJson'); if (ioImportJson?.firstChild) ioImportJson.firstChild.textContent = `♻️ ${c.restoreJson}`;

    setText('.side-footer span:last-child', c.localStored);
    setText('.footer', c.footer);
    setText('#installBanner span', c.install);
    setText('.install-btn', c.installBtn);
    setText('.empty-title', c.noData);
    setText('.empty-sub', c.noDataSub);
    setText('#saveIndicator', c.saved);

    const incomeForm = document.getElementById('incomeAddForm');
    if (incomeForm) {
      const labels = incomeForm.querySelectorAll('label');
      if (labels[0]) labels[0].textContent = c.icon;
      if (labels[1]) labels[1].textContent = c.name;
      if (labels[2]) labels[2].textContent = c.amount;
      const name = document.getElementById('aiName'); if (name) name.placeholder = c.incomePlaceholder;
      setText('#aiCancel', c.cancel); setText('#aiAdd', c.add);
    }
    const expenseForm = document.getElementById('expenseAddForm');
    if (expenseForm) {
      const labels = expenseForm.querySelectorAll('label');
      if (labels[0]) labels[0].textContent = c.icon;
      if (labels[1]) labels[1].textContent = c.name;
      if (labels[2]) labels[2].textContent = c.amount;
      if (labels[3]) labels[3].textContent = c.frequency;
      const name = document.getElementById('aeName'); if (name) name.placeholder = c.expensePlaceholder;
      const opts = document.getElementById('aeFreq')?.options;
      if (opts && typeof I18N !== 'undefined') {
        [...opts].forEach((opt, i) => { if (I18N[code]?.freqs?.[i]) opt.textContent = I18N[code].freqs[i]; });
      }
    }

    syncMenus(c);
    if (typeof update === 'function') update(false);
  }

  const originalApplyLang = typeof applyLang === 'function' ? applyLang : null;
  if (originalApplyLang) {
    applyLang = function() {
      originalApplyLang();
      syncLanguageUI();
    };
  }

  window.syncBudgetAtlasLanguage = syncLanguageUI;
  syncLanguageUI();
})();

/* Consolidated from balance-status.js */
(() => {
  function isEnglish() {
    return document.documentElement.lang === 'en';
  }

  function updateHeroBudgetStatus() {
    if (typeof totalIncome !== 'function' || typeof totalExpenses !== 'function') return;

    const incomeTotal = totalIncome();
    const expenseTotal = totalExpenses();
    const balance = incomeTotal - expenseTotal;
    const status = document.querySelector('.hero-status');

    if (status) {
      status.textContent = balance < 0
        ? (isEnglish() ? 'Over budget' : 'Budget überschritten')
        : (isEnglish() ? 'Still available' : 'Noch verfügbar');
    }
  }

  const previousUpdate = window.update;
  if (typeof previousUpdate === 'function') {
    window.update = function(...args) {
      const result = previousUpdate.apply(this, args);
      updateHeroBudgetStatus();
      return result;
    };
  }

  const previousApplyLang = window.applyLang;
  if (typeof previousApplyLang === 'function') {
    window.applyLang = function(...args) {
      const result = previousApplyLang.apply(this, args);
      updateHeroBudgetStatus();
      return result;
    };
  }

  window.updateHeroBudgetStatus = updateHeroBudgetStatus;
  updateHeroBudgetStatus();
})();