(() => {
  const copy = {
    de: {
      overview:'Übersicht', income:'Einnahmen', expenses:'Ausgaben', mix:'Ausgaben-Mix', more:'Mehr',
      monthlyOverview:'Monatliche Übersicht', monthlyBuffer:'Monatliches Polster', stillAvailable:'Noch verfügbar', available:'Verfügbar',
      incomeMonth:'Einnahmen / Monat', expenseMonth:'Ausgaben / Monat', thisMonth:'Diesen Monat', totalExpenses:'Gesamtausgaben', total:'Gesamt', totalMonth:'Gesamt / Monat',
      quick:'Schnellzugriff', quickIncome:'Einnahme', quickExpense:'Ausgabe',
      addIncome:'+ Einnahme hinzufügen', addExpense:'+ Ausgabe hinzufügen',
      localStored:'Daten lokal gespeichert', footer:'Daten werden lokal gespeichert · Läuft offline · v1.8',
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
      monthlyOverview:'Monthly Overview', monthlyBuffer:'Monthly Buffer', stillAvailable:'Still available', available:'Available',
      incomeMonth:'Income / Month', expenseMonth:'Expenses / Month', thisMonth:'This month', totalExpenses:'Total expenses', total:'Total', totalMonth:'Total / Month',
      quick:'Quick access', quickIncome:'Income', quickExpense:'Expense',
      addIncome:'+ Add income', addExpense:'+ Add expense',
      localStored:'Data stored locally', footer:'Data stored locally · Works offline · v1.8',
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

    // The language button now shows the ACTIVE language, not the target language.
    const langBtn = document.getElementById('langBtn');
    if (langBtn) langBtn.textContent = `🌐 ${code.toUpperCase()}`;

    setText('.header-label', c.monthlyOverview);
    setText('.eyebrow span', c.monthlyBuffer);
    setText('.hero-status', c.stillAvailable);
    setText('#heroMetaLeft', c.available);
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

    // Side navigation.
    const side = qa('.side-nav .nav-item');
    setButtonLabel(side[0], '⌂', c.overview);
    setButtonLabel(side[1], '▣', c.income);
    setButtonLabel(side[2], '▤', c.expenses);
    setButtonLabel(side[3], '◉', c.mix);

    // Bottom navigation.
    const bottom = qa('.bottom-nav button');
    setButtonLabel(bottom[0], '⌂', c.overview);
    setButtonLabel(bottom[1], '▣', c.income);
    setButtonLabel(bottom[2], '▤', c.expenses);
    setButtonLabel(bottom[3], '•••', c.more);

    // Sidebar import/export. Rebuild the toggle because the old applyLang() replaced its children via textContent.
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

    // Add forms.
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

    // Re-render rows so frequency labels also match the active language.
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