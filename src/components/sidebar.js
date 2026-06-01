/**
 * sidebar.js — Detail panel (slide-in) for node information
 */

import { NODE_COLORS, NODE_ICONS } from '../lib/graph-styles.js';

let sidebarEl = null;
let overlayEl = null;
let isOpen = false;

/**
 * Initialize the sidebar (call once)
 */
export function initSidebar() {
  // Overlay
  overlayEl = document.createElement('div');
  overlayEl.className = 'sidebar-overlay';
  overlayEl.id = 'sidebar-overlay';
  overlayEl.addEventListener('click', closeSidebar);
  document.body.appendChild(overlayEl);

  // Sidebar
  sidebarEl = document.createElement('aside');
  sidebarEl.className = 'sidebar';
  sidebarEl.id = 'sidebar';
  sidebarEl.innerHTML = `
    <div class="sidebar__header">
      <div class="sidebar__header-info">
        <div class="sidebar__type-badge" id="sidebar-badge"></div>
        <h2 class="sidebar__title" id="sidebar-title"></h2>
        <div class="sidebar__tech-stack" id="sidebar-tech"></div>
      </div>
      <button class="sidebar__close" id="sidebar-close" aria-label="Close panel">✕</button>
    </div>
    <div class="sidebar__content" id="sidebar-content"></div>
  `;
  document.body.appendChild(sidebarEl);

  sidebarEl.querySelector('#sidebar-close').addEventListener('click', closeSidebar);

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeSidebar();
  });
}

/**
 * Open the sidebar with node data
 */
export function openSidebar(nodeData) {
  if (!sidebarEl || !nodeData) return;

  const color = NODE_COLORS[nodeData.type] || NODE_COLORS.service;
  const icon = NODE_ICONS[nodeData.type] || '⚙️';

  // Badge
  const badge = sidebarEl.querySelector('#sidebar-badge');
  badge.textContent = `${icon} ${nodeData.type}`;
  badge.style.background = color.replace(')', ', 0.15)').replace('hsl', 'hsla');
  badge.style.color = color;

  // Title & tech
  sidebarEl.querySelector('#sidebar-title').textContent = nodeData.label;
  sidebarEl.querySelector('#sidebar-tech').textContent = nodeData.techStack || '';

  // Content
  const content = sidebarEl.querySelector('#sidebar-content');
  content.innerHTML = `
    ${buildSection('📋', 'Overview', `<p class="sidebar__text">${nodeData.description}</p>`)}

    ${buildSection('🎯', 'Role & Responsibility', `<p class="sidebar__text">${nodeData.role}</p>`)}

    ${nodeData.whyChosen ? buildSection('💡', 'Why This Was Chosen', `<p class="sidebar__text">${nodeData.whyChosen}</p>`) : ''}

    ${nodeData.tradeoffs ? buildSection('⚖️', 'Trade-offs', buildTradeoffs(nodeData.tradeoffs)) : ''}

    ${nodeData.alternatives?.length ? buildSection('🔄', 'Alternatives', buildAlternatives(nodeData.alternatives)) : ''}
  `;

  // Show
  overlayEl.classList.add('sidebar-overlay--visible');
  sidebarEl.classList.add('sidebar--open');
  isOpen = true;
}

/**
 * Close the sidebar
 */
export function closeSidebar() {
  if (!sidebarEl) return;
  overlayEl.classList.remove('sidebar-overlay--visible');
  sidebarEl.classList.remove('sidebar--open');
  isOpen = false;
}

/**
 * Check if sidebar is open
 */
export function isSidebarOpen() {
  return isOpen;
}

// ── Helper builders ──

function buildSection(icon, title, content) {
  return `
    <div class="sidebar__section">
      <div class="sidebar__section-title">
        <span class="sidebar__section-icon">${icon}</span>
        ${title}
      </div>
      ${content}
    </div>
  `;
}

function buildTradeoffs(tradeoffs) {
  let html = '<div class="tradeoff-list">';

  if (tradeoffs.pros) {
    tradeoffs.pros.forEach(pro => {
      html += `
        <div class="tradeoff-item tradeoff-item--pro">
          <span class="tradeoff-icon">✅</span>
          <span>${pro}</span>
        </div>
      `;
    });
  }

  if (tradeoffs.cons) {
    tradeoffs.cons.forEach(con => {
      html += `
        <div class="tradeoff-item tradeoff-item--con">
          <span class="tradeoff-icon">⚠️</span>
          <span>${con}</span>
        </div>
      `;
    });
  }

  html += '</div>';
  return html;
}

function buildAlternatives(alternatives) {
  let html = '<div class="alternatives-list">';

  alternatives.forEach(alt => {
    html += `
      <div class="alternative-item">
        <span class="alternative-item__name">${alt.name}</span>
        <span class="alternative-item__context">${alt.context}</span>
      </div>
    `;
  });

  html += '</div>';
  return html;
}
