/* ==============================================
   QUIZARY — TOPBAR
   Expands the mobile search icon into a full search
   bar on click, and collapses it again on outside click.
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

  const search = document.querySelector('.search');
  const searchInput = search?.querySelector('input');

  if (!search || !searchInput) return;

  search.addEventListener('click', (e) => {
    if (!search.classList.contains('search--open') && window.innerWidth <= 640) {
      e.preventDefault();
      search.classList.add('search--open');
      searchInput.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 640 && !search.contains(e.target)) {
      search.classList.remove('search--open');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 640) search.classList.remove('search--open');
  });

});