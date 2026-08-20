/* Lightweight history search and filters, preserving existing quiz links. */
document.addEventListener('DOMContentLoaded', () => {
  const rows = [...document.querySelectorAll('.hist-row')];
  const tabs = [...document.querySelectorAll('.hist-tab')];
  const search = document.querySelector('.search input');
  const category = document.querySelector('#historyCategory');
  const empty = document.querySelector('.hist-empty');
  const reset = document.querySelector('.hist-reset');
  let status = 'all';
  const applyFilters = () => {
    const query = search?.value.trim().toLowerCase() || '';
    let visible = 0;
    rows.forEach((row) => {
      const show = (status === 'all' || row.dataset.status.includes(status))
        && (!category || category.value === 'all' || row.dataset.category === category.value)
        && (!query || row.dataset.name.includes(query));
      row.hidden = !show;
      if (show) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
  };
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    status = tab.dataset.filter;
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('hist-tab-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    applyFilters();
  }));
  search?.addEventListener('input', applyFilters);
  category?.addEventListener('change', applyFilters);
  reset?.addEventListener('click', () => {
    status = 'all';
    if (search) search.value = '';
    if (category) category.value = 'all';
    tabs.forEach((tab) => {
      const active = tab.dataset.filter === 'all';
      tab.classList.toggle('hist-tab-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    applyFilters();
  });
});
