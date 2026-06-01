/**
 * graph-styles.js — Cytoscape.js style definitions
 */

/** Color map for node types */
export const NODE_COLORS = {
  client:   'hsl(220, 70%, 60%)',
  gateway:  'hsl(190, 90%, 50%)',
  service:  'hsl(265, 65%, 60%)',
  database: 'hsl(280, 60%, 55%)',
  cache:    'hsl(38, 90%, 55%)',
  queue:    'hsl(350, 75%, 55%)',
  cdn:      'hsl(160, 65%, 45%)',
  ml:       'hsl(320, 70%, 55%)',
};

/** Japanese name map for node types */
export const NODE_TYPE_JA = {
  client:   'クライアント',
  gateway:  'APIゲートウェイ',
  service:  'マイクロサービス',
  database: 'データベース',
  cache:    '分散キャッシュ',
  queue:    'メッセージキュー',
  cdn:      'CDN',
  ml:       '機械学習 / ML',
};

/** Icon map for node types */
export const NODE_ICONS = {
  client:   '📱',
  gateway:  '🚪',
  service:  '⚙️',
  database: '🗄️',
  cache:    '⚡',
  queue:    '📨',
  cdn:      '🌐',
  ml:       '🧠',
};

/** Edge type styles */
const EDGE_STYLES = {
  sync:      { lineStyle: 'solid',  color: 'hsl(190, 80%, 55%)',  width: 2 },
  async:     { lineStyle: 'dashed', color: 'hsl(38, 85%, 55%)',   width: 2 },
  streaming: { lineStyle: 'solid',  color: 'hsl(160, 65%, 50%)',  width: 3 },
};

/**
 * Generate Cytoscape stylesheet
 */
export function getCytoscapeStyles() {
  return [
    // ─── Base Node ───
    {
      selector: 'node',
      style: {
        'shape': 'round-rectangle',
        'width': 170,
        'height': 60,
        'background-color': 'data(color)',
        'background-opacity': 0.15,
        'border-width': 2,
        'border-color': 'data(color)',
        'border-opacity': 0.7,
        'label': 'data(label)',
        'text-valign': 'center',
        'text-halign': 'center',
        'font-family': "'Inter', sans-serif",
        'font-size': 12,
        'font-weight': 600,
        'color': 'data(color)',
        'text-wrap': 'wrap',
        'text-max-width': 150,
        'padding': '12px',
        'transition-property': 'background-opacity, border-opacity, opacity, border-width',
        'transition-duration': '0.3s',
        'transition-timing-function': 'ease-out',
      },
    },

    // ─── Node Hover ───
    {
      selector: 'node:active',
      style: {
        'border-width': 3,
        'background-opacity': 0.25,
        'overlay-opacity': 0,
      },
    },

    // ─── Selected Node ───
    {
      selector: 'node:selected',
      style: {
        'border-width': 3,
        'background-opacity': 0.3,
        'border-opacity': 1,
        'overlay-opacity': 0,
      },
    },

    // ─── Dimmed Node (during scenario filtering) ───
    {
      selector: 'node.dimmed',
      style: {
        'opacity': 0.12,
        'transition-property': 'opacity',
        'transition-duration': '0.4s',
      },
    },

    // ─── Highlighted Node ───
    {
      selector: 'node.highlighted',
      style: {
        'border-width': 3,
        'background-opacity': 0.25,
        'border-opacity': 1,
        'opacity': 1,
        'transition-property': 'opacity, border-width, background-opacity',
        'transition-duration': '0.4s',
      },
    },

    // ─── Base Edge ───
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': 'data(color)',
        'target-arrow-color': 'data(color)',
        'target-arrow-shape': 'triangle',
        'arrow-scale': 1.2,
        'curve-style': 'bezier',
        'label': 'data(label)',
        'font-family': "'Inter', sans-serif",
        'font-size': 9,
        'color': 'hsl(220, 15%, 50%)',
        'text-rotation': 'autorotate',
        'text-margin-y': -10,
        'text-background-color': 'hsl(222, 25%, 6%)',
        'text-background-opacity': 0.85,
        'text-background-padding': '3px',
        'text-background-shape': 'roundrectangle',
        'transition-property': 'opacity, line-color, width',
        'transition-duration': '0.3s',
        'transition-timing-function': 'ease-out',
      },
    },

    // ─── Async Edge ───
    {
      selector: 'edge[type="async"]',
      style: {
        'line-style': 'dashed',
        'line-dash-pattern': [8, 5],
      },
    },

    // ─── Streaming Edge ───
    {
      selector: 'edge[type="streaming"]',
      style: {
        'width': 3,
        'line-style': 'solid',
      },
    },

    // ─── Dimmed Edge ───
    {
      selector: 'edge.dimmed',
      style: {
        'opacity': 0.08,
        'transition-property': 'opacity',
        'transition-duration': '0.4s',
      },
    },

    // ─── Highlighted Edge ───
    {
      selector: 'edge.highlighted',
      style: {
        'opacity': 1,
        'width': 3,
        'transition-property': 'opacity, width',
        'transition-duration': '0.4s',
      },
    },
  ];
}

/**
 * Convert architecture data to Cytoscape elements
 */
export function toElements(nodes, edges) {
  const cyNodes = nodes.map(node => ({
    data: {
      id: node.id,
      label: node.label,
      type: node.type,
      color: NODE_COLORS[node.type] || NODE_COLORS.service,
      // Store full node data for sidebar
      _nodeData: node,
    },
    position: {
      x: node.position.x * 1.5,
      y: node.position.y * 1.2,
    },
  }));

  const cyEdges = edges.map((edge, i) => ({
    data: {
      id: `e-${edge.source}-${edge.target}-${i}`,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      type: edge.type,
      color: EDGE_STYLES[edge.type]?.color || EDGE_STYLES.sync.color,
      scenarios: edge.scenarios,
    },
  }));

  return [...cyNodes, ...cyEdges];
}
