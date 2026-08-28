(() => {
  function isEnglish() {
    return document.documentElement.lang === 'en';
  }

  function refreshReferenceMetrics() {
    if (typeof totalIncome !== 'function' || typeof totalExpenses !== 'function' || typeof fmt !== 'function') return;

    const incomeTotal = totalIncome();
    const expenseTotal = totalExpenses();
    const balance = incomeTotal - expenseTotal;
    const availablePct = incomeTotal > 0
      ? Math.max(0, Math.min(100, (balance / incomeTotal) * 100))
      : 0;

    const heroLabel = document.getElementById('heroMetaLeft');
    const heroRatio = document.getElementById('heroRatio');
    const donutLabel = document.getElementById('donutCenterLabel');
    const donutTotal = document.getElementById('donutTotal');

    if (heroLabel) heroLabel.textContent = isEnglish() ? 'Available' : 'Verfügbar';
    if (heroRatio) heroRatio.textContent = `${Math.round(availablePct)}%`;
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

  refreshReferenceMetrics();
  if (typeof window.setDonutDefault === 'function') window.setDonutDefault();
  buildMobileIOMenu();
})();
