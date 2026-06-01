/**
 * catalog.js — Company card grid with filtering
 */

import { loadArchitectureList, getAllTags } from '../lib/data-loader.js';

let currentFilter = '';
let activeTag = '';

/**
 * Create the catalog page
 */
export async function createCatalog(container, navigateTo) {
  container.innerHTML = '';

  const list = await loadArchitectureList();
  const tags = await getAllTags();

  // ── Hero ──
  const hero = document.createElement('section');
  hero.className = 'hero';
  hero.innerHTML = `
    <h1 class="hero__title">
      Architecture <span class="gradient-text">Encyclopedia</span>
    </h1>
    <p class="hero__subtitle">
      世界規模のサービスがどのように構築されているかを探索しましょう。
      インタラクティブな構成図、コンポーネントの深掘り、設計のトレードオフをこの一つの場所で学べます。
    </p>
    <div class="hero__stats">
      <div class="hero__stat">
        <div class="hero__stat-value gradient-text">${list.length}</div>
        <div class="hero__stat-label">掲載数</div>
      </div>
      <div class="hero__stat">
        <div class="hero__stat-value gradient-text">${tags.length}</div>
        <div class="hero__stat-label">技術スタック</div>
      </div>
      <div class="hero__stat">
        <div class="hero__stat-value gradient-text">${list.reduce((sum, m) => sum + (m.tags?.length || 0), 0)}</div>
        <div class="hero__stat-label">コンポーネント</div>
      </div>
    </div>
  `;
  container.appendChild(hero);

  // ── Filter Bar ──
  const filterBar = document.createElement('div');
  filterBar.className = 'filter-bar';
  filterBar.innerHTML = `
    <div class="filter-bar__search">
      <svg class="filter-bar__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        type="text"
        class="filter-bar__input"
        id="search-input"
        placeholder="アーキテクチャ名や技術スタックで検索..."
        autocomplete="off"
      />
    </div>
    <div class="filter-bar__tags" id="filter-tags">
      ${tags.map(tag => `
        <button class="filter-tag" data-tag="${tag}">${tag}</button>
      `).join('')}
    </div>
  `;
  container.appendChild(filterBar);

  // ── Card Grid ──
  const grid = document.createElement('div');
  grid.className = 'catalog-grid';
  grid.id = 'catalog-grid';
  container.appendChild(grid);

  renderCards(grid, list, navigateTo);

  // ── Event Listeners ──
  const searchInput = filterBar.querySelector('#search-input');
  searchInput.addEventListener('input', (e) => {
    currentFilter = e.target.value.toLowerCase();
    filterAndRender(grid, list, navigateTo);
  });

  const tagBtns = filterBar.querySelectorAll('.filter-tag');
  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag;
      if (activeTag === tag) {
        activeTag = '';
        btn.classList.remove('filter-tag--active');
      } else {
        tagBtns.forEach(b => b.classList.remove('filter-tag--active'));
        activeTag = tag;
        btn.classList.add('filter-tag--active');
      }
      filterAndRender(grid, list, navigateTo);
    });
  });
}

function filterAndRender(grid, list, navigateTo) {
  const filtered = list.filter(item => {
    const matchesSearch = !currentFilter ||
      item.name.toLowerCase().includes(currentFilter) ||
      item.description.toLowerCase().includes(currentFilter) ||
      item.tags.some(t => t.includes(currentFilter));

    const matchesTag = !activeTag || item.tags.includes(activeTag);

    return matchesSearch && matchesTag;
  });

  renderCards(grid, filtered, navigateTo);
}

function renderCards(grid, items, navigateTo) {
  if (items.length === 0) {
    grid.innerHTML = `
      <div class="catalog-empty">
        <div class="catalog-empty__icon">🔍</div>
        <p class="catalog-empty__message">条件に一致するアーキテクチャが見つかりませんでした。</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map((item, i) => `
    <article
      class="catalog-card"
      data-id="${item.id}"
      style="--card-accent: ${item.accentGradient}; animation-delay: ${i * 0.08}s"
      role="button"
      tabindex="0"
      aria-label="${item.name}のアーキテクチャを表示"
    >
      <div class="catalog-card__header">
        <div class="catalog-card__icon" style="background: ${item.accentGradient}">
          ${item.name.charAt(0)}
        </div>
        <div>
          <h2 class="catalog-card__title">${item.name}</h2>
          <div class="catalog-card__category">${item.category}</div>
        </div>
      </div>
      <p class="catalog-card__description">${item.description}</p>
      <div class="catalog-card__tags">
        ${item.tags.slice(0, 5).map(tag => `
          <span class="catalog-card__tag">${tag}</span>
        `).join('')}
      </div>
      <div class="catalog-card__arrow">→</div>
    </article>
  `).join('');

  // Click handlers
  grid.querySelectorAll('.catalog-card').forEach(card => {
    const handler = () => navigateTo(card.dataset.id);
    card.addEventListener('click', handler);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler();
      }
    });
  });
}
