/* ==============================================
   QUIZARY — ACHIEVEMENTS PAGE
   Category tabs, rarity dropdown filter, and live
   search — all combine to filter the achievement grid.
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

  const cards = document.querySelectorAll('.ach-card');
  const emptyMsg = createEmptyMessage();

  let activeCategory = 'all';
  let activeRarity = 'all';
  let activeQuery = '';

  /* ---------- Category tabs ---------- */
  const tabs = document.querySelectorAll('.ach-tab');

  const tabCategoryMap = {
    'all achievements': 'all',
    'milestones': 'milestones',
    'performance': 'performance',
    'streaks': 'streaks',
    'special': 'special'
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('ach-tab-active'));
      tab.classList.add('ach-tab-active');

      const key = tab.textContent.trim().toLowerCase();
      activeCategory = tabCategoryMap[key] || 'all';
      applyFilters();
    });
  });

  /* ---------- Rarity dropdown ---------- */
  const raritySelect = document.getElementById('achRaritySelect');
  const rarityLabel = document.getElementById('achRarityLabel');
  const rarityMenu = document.getElementById('achRarityMenu');

  if (raritySelect && rarityMenu) {
    const closeMenu = () => {
      rarityMenu.classList.remove('open');
      raritySelect.setAttribute('aria-expanded', 'false');
    };

    raritySelect.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = rarityMenu.classList.toggle('open');
      raritySelect.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    rarityMenu.querySelectorAll('li').forEach((item) => {
      item.addEventListener('click', () => {
        const value = item.dataset.value;
        activeRarity = value;
        rarityLabel.textContent = value === 'all' ? 'Rarity: All' : `Rarity: ${item.textContent.trim()}`;
        closeMenu();
        applyFilters();
      });
    });

    document.addEventListener('click', (e) => {
      if (!rarityMenu.contains(e.target) && e.target !== raritySelect) closeMenu();
    });
  }

  /* ---------- Live search (topbar search input) ---------- */
  const searchInput = document.querySelector('.search input');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      activeQuery = searchInput.value.trim().toLowerCase();
      applyFilters();
    });
  }

  /* ---------- Core filter logic ---------- */
  function applyFilters() {
    let visibleCount = 0;

    cards.forEach((card) => {
      const category = card.dataset.category || '';
      const rarity = card.dataset.rarity || '';
      const title = card.querySelector('.ach-card-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.ach-card-desc')?.textContent.toLowerCase() || '';

      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesRarity = activeRarity === 'all' || rarity === activeRarity;
      const matchesQuery = !activeQuery || title.includes(activeQuery) || desc.includes(activeQuery);

      const visible = matchesCategory && matchesRarity && matchesQuery;
      card.style.display = visible ? '' : 'none';
      if (visible) visibleCount++;
    });

    toggleEmptyMessage(visibleCount === 0);
  }

  /* ---------- "No results" message ---------- */
  function createEmptyMessage() {
    const grid = document.querySelector('.ach-grid');
    if (!grid) return null;

    const msg = document.createElement('p');
    msg.className = 'ach-empty-msg';
    msg.textContent = 'No achievements match your filters.';
    msg.style.display = 'none';
    msg.style.gridColumn = '1 / -1';
    msg.style.textAlign = 'center';
    msg.style.padding = '40px 0';
    msg.style.color = 'var(--text-2)';
    msg.style.fontSize = '13.5px';
    grid.appendChild(msg);
    return msg;
  }

  function toggleEmptyMessage(show) {
    if (emptyMsg) emptyMsg.style.display = show ? 'block' : 'none';
  }

});