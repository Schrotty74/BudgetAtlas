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

  const monthLabel = document.getElementById('monthLabel');
  if (monthLabel) {
    monthLabel.textContent = new Intl.DateTimeFormat(
      document.documentElement.lang === 'en' ? 'en' : 'de-AT',
      { month: 'long', year: 'numeric' }
    ).format(new Date());
  }

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeSidebar();
  });
})();