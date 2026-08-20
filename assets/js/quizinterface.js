/* Quiz library search and status filters. Leaves all quiz links/data flows untouched. */
document.addEventListener('DOMContentLoaded', () => {
  const cards = [...document.querySelectorAll('.qz-item')];
  const tabs = [...document.querySelectorAll('.qz-tab')];
  const search = document.querySelector('.search input');
  const difficulty = document.querySelector('#difficultyFilter');
  const empty = document.querySelector('.qz-empty');
  const reset = document.querySelector('.qz-reset');
  let status = 'all';

  const applyFilters = () => {
    const query = search?.value.trim().toLowerCase() || '';
    const level = difficulty?.value || 'all';
    let visible = 0;
    cards.forEach((card) => {
      const matchesStatus = status === 'all' || card.dataset.status.includes(status);
      const matchesLevel = level === 'all' || card.dataset.difficulty === level;
      const matchesSearch = !query || card.dataset.name.includes(query);
      const show = matchesStatus && matchesLevel && matchesSearch;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
  };

  tabs.forEach((tab) => tab.addEventListener('click', () => {
    status = tab.dataset.filter;
    tabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle('qz-tab-active', selected);
      item.setAttribute('aria-selected', String(selected));
    });
    applyFilters();
  }));

  search?.addEventListener('input', applyFilters);
  difficulty?.addEventListener('change', applyFilters);
  reset?.addEventListener('click', () => {
    status = 'all';
    if (search) search.value = '';
    if (difficulty) difficulty.value = 'all';
    tabs.forEach((tab) => {
      const selected = tab.dataset.filter === 'all';
      tab.classList.toggle('qz-tab-active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });
    applyFilters();
  });
});
