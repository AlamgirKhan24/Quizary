/* ==============================================
   QUIZARY — SETTINGS PAGE
   Category tabs, appearance segment control,
   language dropdown, sync toggle persistence,
   and live search filtering of setting rows.
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Category tabs ---------- */
  const tabs = document.querySelectorAll('.set-tab');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('set-tab-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('set-tab-active');
      tab.setAttribute('aria-selected', 'true');
    });
  });

  /* ---------- Appearance: Light / Dark / System ---------- */
  const segmentBtns = document.querySelectorAll('.set-segment-btn');

  const applyTheme = (theme) => {
    segmentBtns.forEach((btn) => {
      const active = btn.textContent.trim() === theme;
      btn.classList.toggle('set-segment-btn-active', active);
      btn.setAttribute('aria-checked', active ? 'true' : 'false');
    });
    document.documentElement.setAttribute('data-theme', theme.toLowerCase());
    localStorage.setItem('quizary-theme', theme);
  };

  segmentBtns.forEach((btn) => {
    btn.addEventListener('click', () => applyTheme(btn.textContent.trim()));
  });

  const savedTheme = localStorage.getItem('quizary-theme');
  if (savedTheme) applyTheme(savedTheme);

  /* ---------- Language dropdown ---------- */
  const langBtn = document.getElementById('lang-select');
  const langLabel = document.getElementById('lang-select-label');
  const langMenu = document.getElementById('lang-menu');

  if (langBtn && langMenu) {
    const closeMenu = () => {
      langMenu.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    };

    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langMenu.classList.toggle('open');
      langBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    langMenu.querySelectorAll('li').forEach((item) => {
      item.addEventListener('click', () => {
        langLabel.textContent = item.dataset.value;
        localStorage.setItem('quizary-language', item.dataset.value);
        closeMenu();
      });
    });

    document.addEventListener('click', (e) => {
      if (!langMenu.contains(e.target) && e.target !== langBtn) closeMenu();
    });

    const savedLang = localStorage.getItem('quizary-language');
    if (savedLang) langLabel.textContent = savedLang;
  }

  /* ---------- Sync Across Devices toggle ---------- */
  const syncToggle = document.querySelector('.set-sync-card input[type="checkbox"]');

  if (syncToggle) {
    const savedSync = localStorage.getItem('quizary-sync');
    if (savedSync !== null) syncToggle.checked = savedSync === 'true';

    syncToggle.addEventListener('change', () => {
      localStorage.setItem('quizary-sync', syncToggle.checked);
    });
  }

  /* ---------- Live search filter ---------- */
  const searchInput = document.getElementById('set-search');
  const rows = document.querySelectorAll('.set-main > .set-row');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();

      rows.forEach((row) => {
        const title = row.querySelector('.set-row-title')?.textContent.toLowerCase() || '';
        const sub = row.querySelector('.set-row-sub')?.textContent.toLowerCase() || '';
        const match = !query || title.includes(query) || sub.includes(query);
        row.style.display = match ? '' : 'none';
      });
    });
  }

});
