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

  refreshReferenceMetrics();
  if (typeof window.setDonutDefault === 'function') window.setDonutDefault();
})();
