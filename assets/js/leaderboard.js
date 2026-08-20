/* Leaderboard period selector and live player search. */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = [...document.querySelectorAll('.hist-tab')];
  const rows = [...document.querySelectorAll('.lb-table .lb-row:not(.lb-row-head)')];
  const search = document.querySelector('.search input');
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.toggle('hist-tab-active', item === tab));
  }));
  search?.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    rows.forEach((row) => {
      const name = row.querySelector('.lb-player-name')?.textContent.toLowerCase() || '';
      row.hidden = Boolean(query) && !name.includes(query);
    });
  });
});
