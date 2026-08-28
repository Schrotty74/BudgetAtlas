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
    const label = document.getElementById('heroMetaLeft');
    const ratio = document.getElementById('heroRatio');

    if (balance < 0) {
      const overPct = incomeTotal > 0
        ? (Math.abs(balance) / incomeTotal) * 100
        : (expenseTotal > 0 ? 100 : 0);

      if (status) status.textContent = isEnglish() ? 'Over budget' : 'Budget überschritten';
      if (label) label.textContent = isEnglish() ? 'Over by' : 'Überschritten';
      if (ratio) ratio.textContent = `${Math.round(overPct)}%`;
    } else {
      const availablePct = incomeTotal > 0
        ? Math.max(0, Math.min(100, (balance / incomeTotal) * 100))
        : 0;

      if (status) status.textContent = isEnglish() ? 'Still available' : 'Noch verfügbar';
      if (label) label.textContent = isEnglish() ? 'Available' : 'Verfügbar';
      if (ratio) ratio.textContent = `${Math.round(availablePct)}%`;
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