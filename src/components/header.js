/**
 * header.js — Application header component
 */

export function createHeader() {
  const header = document.createElement('header');
  header.className = 'app-header glass';
  header.innerHTML = `
    <a href="#/" class="app-header__logo" id="header-logo">
      <span class="app-header__logo-icon">🏗️</span>
      <span class="app-header__logo-text">Arch<span class="gradient-text">Library</span></span>
    </a>
    <div class="app-header__actions">
      <a href="https://github.com" target="_blank" rel="noopener" class="app-header__btn" id="header-github">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        <span>GitHub</span>
      </a>
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark/light theme">
        🌙
      </button>
    </div>
  `;

  // Theme toggle
  const toggle = header.querySelector('#theme-toggle');
  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    toggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });

  // Restore saved theme
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    toggle.textContent = '☀️';
  }

  return header;
}
