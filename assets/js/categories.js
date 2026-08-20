/* Quizary category discovery: filter cards and connect the shared search field. */
document.addEventListener('DOMContentLoaded', () => {
  const cards = [...document.querySelectorAll('.cat-card')];
  const filters = [...document.querySelectorAll('.cat-filter')];
  const search = document.querySelector('.search input');
  let activeFilter = 'all';

  const applyFilters = () => {
    const query = search?.value.trim().toLowerCase() || '';
    let visible = 0;

    cards.forEach((card) => {
      const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
      const matchesSearch = !query || card.dataset.name.includes(query);
      const show = matchesFilter && matchesSearch;
      card.hidden = !show;
      if (show) visible += 1;
    });

    const empty = document.querySelector('.cat-empty');
    if (empty) empty.hidden = visible !== 0;
  };

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      activeFilter = filter.dataset.filter;
      filters.forEach((item) => {
        const selected = item === filter;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-selected', String(selected));
      });
      applyFilters();
    });
  });

  search?.addEventListener('input', applyFilters);

  const grid = document.querySelector('.cat-grid');
  if (grid) {
    const empty = document.createElement('div');
    empty.className = 'cat-empty panel';
    empty.hidden = true;
    empty.innerHTML = '<span>✦</span><h3>No categories found</h3><p>Try another topic or return to all categories.</p>';
    grid.after(empty);
  }
});
