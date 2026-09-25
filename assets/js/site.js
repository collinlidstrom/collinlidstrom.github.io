(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  const year = document.querySelector('#y');
  if (year) year.textContent = new Date().getFullYear();

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (toggle) toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  let storedTheme = null;
  try { storedTheme = localStorage.getItem('theme'); } catch (_) { /* storage can be unavailable */ }
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  applyTheme(storedTheme || (media.matches ? 'dark' : 'light'));
  toggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (_) { /* keep in-page preference */ }
  });
  media.addEventListener?.('change', e => {
    try { if (localStorage.getItem('theme')) return; } catch (_) { /* follow system preference */ }
    applyTheme(e.matches ? 'dark' : 'light');
  });
  function closeMenu() {
    if (!menu || !menuButton) return;
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  }
  menuButton?.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
    menuButton.setAttribute('aria-expanded', String(!menu.hidden));
    menuButton.setAttribute('aria-label', menu.hidden ? 'Open menu' : 'Close menu');
  });
  menu?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.querySelectorAll('.links a').forEach(a => {
    if (a.getAttribute('href') === location.pathname) a.setAttribute('aria-current', 'page');
  });
})();
