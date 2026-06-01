/**
 * main.js — App entry point, routing, initialization
 */

import './styles/index.css';
import './styles/catalog.css';
import './styles/diagram.css';
import './styles/panel.css';

import { createHeader } from './components/header.js';
import { createCatalog } from './components/catalog.js';
import { createDiagram } from './components/diagram.js';
import { initSidebar } from './components/sidebar.js';

// ── App Container ──
const app = document.getElementById('app');

// ── Clear loading state ──
app.innerHTML = '';

// ── Header ──
const header = createHeader();
document.body.insertBefore(header, app);

// ── Sidebar (singleton) ──
initSidebar();

// ── Main Content Area ──
const main = document.createElement('main');
main.id = 'main-content';
app.appendChild(main);

// ── Hash-based Router ──
function getRoute() {
  const hash = window.location.hash.slice(1) || '/';
  const parts = hash.split('/').filter(Boolean);
  return { path: parts[0] || '', param: parts[1] || '' };
}

async function router() {
  const { path, param } = getRoute();

  try {
    if (path && path !== '' && param === '') {
      await showDiagram(path);
    } else if (path && param) {
      await showDiagram(path);
    } else {
      await showCatalog();
    }
  } catch (err) {
    console.error('Router error:', err);
    main.innerHTML = `
      <div style="padding:40px;text-align:center;color:var(--text-secondary)">
        <h2>⚠️ エラーが発生しました</h2>
        <p>${err.message}</p>
      </div>
    `;
  }
}

async function showCatalog() {
  header.style.display = '';
  main.className = '';
  await createCatalog(main, (archId) => {
    window.location.hash = `#/${archId}`;
  });
}

async function showDiagram(archId) {
  header.style.display = 'none';
  main.className = 'diagram-view';
  await createDiagram(main, archId, () => {
    window.location.hash = '#/';
  });
}

// ── Listen for hash changes ──
window.addEventListener('hashchange', router);

// ── Initial route ──
router();
