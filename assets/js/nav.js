/* ==============================================
   QUIZARY — MOBILE NAV
   Hamburger toggle for the off-canvas sidebar drawer.
   Shared across every page that has a sidebar.
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

  const sidebar = document.querySelector('.sidebar');
  const toggle = document.getElementById('menuToggle');
  const overlay = document.getElementById('sidebarOverlay');

  if (!sidebar || !toggle) return;

  const openMenu = () => {
    sidebar.classList.add('sidebar--open');
    toggle.setAttribute('aria-expanded', 'true');
    if (overlay) overlay.classList.add('sidebar-overlay--visible');
  };

  const closeMenu = () => {
    sidebar.classList.remove('sidebar--open');
    toggle.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.classList.remove('sidebar-overlay--visible');
  };

  toggle.addEventListener('click', () => {
    sidebar.classList.contains('sidebar--open') ? closeMenu() : openMenu();
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  sidebar.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 640) closeMenu();
  });

});