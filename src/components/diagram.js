/**
 * diagram.js — Cytoscape.js interactive diagram component
 */

import cytoscape from 'cytoscape';
import { loadArchitecture } from '../lib/data-loader.js';
import { getCytoscapeStyles, toElements, NODE_COLORS, NODE_ICONS, NODE_TYPE_JA } from '../lib/graph-styles.js';
import { startEdgeAnimations, stopEdgeAnimations } from '../lib/animations.js';
import { openSidebar, closeSidebar } from './sidebar.js';

let cy = null;
let currentScenario = 'global';
let archData = null;

/**
 * Create the diagram page
 */
export async function createDiagram(container, archId, navigateBack) {
  container.innerHTML = '';
  archData = await loadArchitecture(archId);

  const page = document.createElement('div');
  page.className = 'diagram-page';

  // ── Toolbar ──
  const toolbar = document.createElement('div');
  toolbar.className = 'diagram-toolbar';
  toolbar.innerHTML = `
    <div class="diagram-toolbar__left">
      <button class="diagram-toolbar__back" id="diagram-back" aria-label="カタログに戻る">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        戻る
      </button>
      <h1 class="diagram-toolbar__title">
        ${archData.meta.name}
        <span class="diagram-toolbar__company">システムアーキテクチャ</span>
      </h1>
    </div>
    <div class="diagram-toolbar__right">
      <div class="diagram-toolbar__zoom-controls">
        <button class="diagram-toolbar__zoom-btn" id="zoom-out" aria-label="ズームアウト">−</button>
        <span class="diagram-toolbar__zoom-level" id="zoom-level">100%</span>
        <button class="diagram-toolbar__zoom-btn" id="zoom-in" aria-label="ズームイン">+</button>
      </div>
      <button class="diagram-toolbar__fit-btn" id="fit-view">全体表示</button>
    </div>
  `;
  page.appendChild(toolbar);

  // ── Scenario Bar ──
  const scenarioBar = document.createElement('div');
  scenarioBar.className = 'scenario-bar';
  scenarioBar.innerHTML = `
    <span class="scenario-bar__label">シナリオ:</span>
    ${archData.scenarios.map(s => `
      <button
        class="scenario-pill ${s.id === 'global' ? 'scenario-pill--active' : ''}"
        data-scenario="${s.id}"
      >${s.name}</button>
    `).join('')}
  `;
  page.appendChild(scenarioBar);

  // ── Canvas ──
  const canvasWrap = document.createElement('div');
  canvasWrap.className = 'diagram-canvas-wrap';

  const canvasEl = document.createElement('div');
  canvasEl.className = 'diagram-canvas';
  canvasEl.id = 'cy-canvas';
  canvasWrap.appendChild(canvasEl);

  // ── Legend ──
  const legend = document.createElement('div');
  legend.className = 'diagram-legend glass';
  legend.innerHTML = `
    <div class="diagram-legend__title">コンポーネントの種類</div>
    <div class="diagram-legend__items">
      ${Object.entries(NODE_COLORS).map(([type, color]) => `
        <div class="diagram-legend__item">
          <div class="diagram-legend__dot" style="background: ${color}"></div>
          <span>${NODE_ICONS[type] || ''} ${NODE_TYPE_JA[type] || type}</span>
        </div>
      `).join('')}
    </div>
  `;
  canvasWrap.appendChild(legend);

  page.appendChild(canvasWrap);
  container.appendChild(page);

  // ── Initialize Cytoscape ──
  initCytoscape(canvasEl);

  // ── Event Handlers ──
  toolbar.querySelector('#diagram-back').addEventListener('click', () => {
    destroyCytoscape();
    navigateBack();
  });

  toolbar.querySelector('#zoom-in').addEventListener('click', () => {
    cy.zoom({ level: cy.zoom() * 1.2, renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 } });
    updateZoomLevel();
  });

  toolbar.querySelector('#zoom-out').addEventListener('click', () => {
    cy.zoom({ level: cy.zoom() * 0.8, renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 } });
    updateZoomLevel();
  });

  toolbar.querySelector('#fit-view').addEventListener('click', () => {
    cy.fit(undefined, 50);
    cy.animate({ fit: { eles: cy.elements(), padding: 50 }, duration: 400 });
    updateZoomLevel();
  });

  // Scenario switching
  const scenarioPills = scenarioBar.querySelectorAll('.scenario-pill');
  scenarioPills.forEach(pill => {
    pill.addEventListener('click', () => {
      scenarioPills.forEach(p => p.classList.remove('scenario-pill--active'));
      pill.classList.add('scenario-pill--active');
      currentScenario = pill.dataset.scenario;
      applyScenario(canvasWrap);
    });
  });
}

/**
 * Initialize Cytoscape instance
 */
function initCytoscape(containerEl) {
  const elements = toElements(archData.nodes, archData.edges);

  cy = cytoscape({
    container: containerEl,
    elements,
    style: getCytoscapeStyles(),
    layout: {
      name: 'preset',
    },
    minZoom: 0.3,
    maxZoom: 3,
    wheelSensitivity: 0.15,
    boxSelectionEnabled: false,
    autoungrabify: false,
  });

  // Fit to view after initialization
  setTimeout(() => {
    cy.fit(undefined, 60);
    updateZoomLevel();
  }, 100);

  // ── Node click → open sidebar ──
  cy.on('tap', 'node', (evt) => {
    const nodeData = evt.target.data('_nodeData');
    if (nodeData) {
      openSidebar(nodeData);
    }
  });

  // ── Canvas click → close sidebar ──
  cy.on('tap', (evt) => {
    if (evt.target === cy) {
      closeSidebar();
    }
  });

  // ── Track zoom level ──
  cy.on('zoom', () => updateZoomLevel());

  // ── Node hover effects ──
  cy.on('mouseover', 'node', (evt) => {
    const node = evt.target;
    containerEl.style.cursor = 'pointer';
    node.style({
      'border-width': 3,
      'background-opacity': 0.3,
    });
  });

  cy.on('mouseout', 'node', (evt) => {
    const node = evt.target;
    containerEl.style.cursor = 'default';
    if (!node.selected()) {
      node.style({
        'border-width': 2,
        'background-opacity': 0.15,
      });
    }
  });
}

/**
 * Apply scenario highlighting
 */
function applyScenario(canvasWrap) {
  if (!cy || !archData) return;

  stopEdgeAnimations();

  const scenario = archData.scenarios.find(s => s.id === currentScenario);
  if (!scenario) return;

  // Remove existing overlays
  canvasWrap.querySelectorAll('.scenario-info, .scenario-steps').forEach(el => el.remove());

  if (scenario.highlightNodes === '*') {
    // Global view — remove all classes
    cy.elements().removeClass('dimmed highlighted');
    return;
  }

  // Dim everything, highlight relevant
  cy.elements().addClass('dimmed').removeClass('highlighted');

  // Highlight nodes
  const nodeIds = new Set(scenario.highlightNodes);
  cy.nodes().forEach(node => {
    if (nodeIds.has(node.id())) {
      node.removeClass('dimmed').addClass('highlighted');
    }
  });

  // Highlight edges
  const edgeKeys = new Set(scenario.highlightEdges);
  cy.edges().forEach(edge => {
    const key = `${edge.data('source')}->${edge.data('target')}`;
    if (edgeKeys.has(key)) {
      edge.removeClass('dimmed').addClass('highlighted');
    }
  });

  // Start edge animations
  startEdgeAnimations(cy);

  // Show scenario description
  const infoEl = document.createElement('div');
  infoEl.className = 'scenario-info';
  infoEl.innerHTML = `
    <div class="scenario-info__card glass">
      <div class="scenario-info__title">${scenario.name}</div>
      <div class="scenario-info__desc">${scenario.description}</div>
    </div>
  `;
  canvasWrap.appendChild(infoEl);

  // Show steps if available
  if (scenario.steps?.length) {
    const stepsEl = document.createElement('div');
    stepsEl.className = 'scenario-steps';
    stepsEl.innerHTML = `
      <div class="scenario-steps__card glass">
        <div class="scenario-steps__title">データフローの手順</div>
        ${scenario.steps.map(step => `
          <div class="scenario-step">
            <div class="scenario-step__number">${step.order}</div>
            <div class="scenario-step__text">${step.description}</div>
          </div>
        `).join('')}
      </div>
    `;
    canvasWrap.appendChild(stepsEl);
  }
}

/**
 * Update zoom level display
 */
function updateZoomLevel() {
  const el = document.querySelector('#zoom-level');
  if (el && cy) {
    el.textContent = `${Math.round(cy.zoom() * 100)}%`;
  }
}

/**
 * Cleanup
 */
function destroyCytoscape() {
  stopEdgeAnimations();
  if (cy) {
    cy.destroy();
    cy = null;
  }
  archData = null;
  currentScenario = 'global';
}
