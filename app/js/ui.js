(() => {
  const sidebar = document.getElementById('sidebar');
  const scrim = document.getElementById('mobileScrim');
  const menuButton = document.getElementById('mobileMenuBtn');
  const fab = document.getElementById('mobileFab');

  function closeSidebar() {
    sidebar?.classList.remove('open');
    scrim?.classList.remove('show');
  }

  function openSidebar() {
    sidebar?.classList.add('open');
    scrim?.classList.add('show');
  }

  menuButton?.addEventListener('click', () => {
    if (sidebar?.classList.contains('open')) closeSidebar();
    else openSidebar();
  });
  scrim?.addEventListener('click', closeSidebar);

  function scrollToTarget(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('[data-target]').forEach(button => {
      button.classList.toggle('active', button.dataset.target === targetId);
    });
    closeSidebar();
  }

  document.querySelectorAll('[data-target]').forEach(button => {
    button.addEventListener('click', () => scrollToTarget(button.dataset.target));
  });

  fab?.addEventListener('click', () => {
    scrollToTarget('expenseSection');
    setTimeout(() => toggleAdd('expense'), 220);
  });

  function updateMonthLabel() {
    const monthLabel = document.getElementById('monthLabel');
    if (!monthLabel) return;
    monthLabel.textContent = new Intl.DateTimeFormat(
      document.documentElement.lang === 'en' ? 'en' : 'de-AT',
      { month: 'long', year: 'numeric' }
    ).format(new Date());
  }

  function syncDashboardMeta() {
    const donutTotal = document.getElementById('donutTotal');
    if (donutTotal) donutTotal.textContent = document.getElementById('totalOut')?.textContent || '–';
  }

  function syncLanguageExtras() {
    const en = document.documentElement.lang === 'en';
    const donutLabel = document.getElementById('donutCenterLabel');
    const quickTitle = document.querySelector('.quick-title');
    const quickButtons = document.querySelectorAll('.quick-card button b');
    const moreButton = document.querySelector('.bottom-nav button[data-target="mixSection"]');
    if (donutLabel) donutLabel.textContent = en ? 'Total expenses' : 'Gesamtausgaben';
    if (quickTitle) quickTitle.textContent = en ? 'Quick access' : 'Schnellzugriff';
    if (quickButtons[0]) quickButtons[0].textContent = en ? 'Income' : 'Einnahme';
    if (quickButtons[1]) quickButtons[1].textContent = en ? 'Expense' : 'Ausgabe';
    if (quickButtons[2]) quickButtons[2].textContent = 'Import / Export';
    if (moreButton) moreButton.lastChild.textContent = en ? 'More' : 'Mehr';
    updateMonthLabel();
  }

  function restoreStructuredIOToggle() {
    const button = document.getElementById('ioToggleBtn');
    if (!button || button.querySelector('b')) return;
    const en = document.documentElement.lang === 'en';
    button.innerHTML = `<span>⇅</span><b>Import / Export</b><small>${en ? 'Import or export data' : 'Daten importieren oder exportieren'}</small>`;
  }

  const totals = [document.getElementById('totalIn'), document.getElementById('totalOut')].filter(Boolean);
  const totalObserver = new MutationObserver(syncDashboardMeta);
  totals.forEach(el => totalObserver.observe(el, { childList: true, characterData: true, subtree: true }));

  const langObserver = new MutationObserver(() => {
    restoreStructuredIOToggle();
    syncLanguageExtras();
    syncDashboardMeta();
  });
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  const ioButton = document.getElementById('ioToggleBtn');
  if (ioButton) {
    new MutationObserver(() => requestAnimationFrame(restoreStructuredIOToggle))
      .observe(ioButton, { childList: true, subtree: true });
  }

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeSidebar();
  });

  updateMonthLabel();
  syncLanguageExtras();
  syncDashboardMeta();
})();