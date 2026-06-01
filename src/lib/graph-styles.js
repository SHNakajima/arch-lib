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

/** High-resolution brand logo URLs for microservices & databases */
export const TECH_LOGOS = {
  // Netflix
  client: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  zuul: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  eureka: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'api-services': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  evcache: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  cassandra: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cassandra/cassandra-original.svg',
  kafka: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg',
  recommendation: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  titus: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
  cdn: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',

  // Amazon
  elb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  'api-gateway': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  'product-service': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'order-service': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  search: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg',
  dynamodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  'sqs-sns': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  elasticache: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',

  // Twitter/X
  'load-balancer': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  'api-service': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg',
  'tweet-service': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg',
  'fanout-service': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg',
  'timeline-service': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg',
  'redis-cache': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'tweet-store': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cassandra/cassandra-original.svg',
  'social-graph': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',

  // Spotify
  'spotify-client': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spotify/spotify-original.svg',
  'spotify-cdn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg',
  'spotify-gateway': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'spotify-playlist': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'spotify-cassandra': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cassandra/cassandra-original.svg',
  'spotify-memcached': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'spotify-kafka': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg',
  'spotify-recommendation': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  'spotify-audio-storage': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',

  // Uber
  'uber-passenger': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'uber-driver': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'uber-gateway': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
  'uber-location': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
  'uber-redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'uber-matching': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
  'uber-schemaless': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'uber-kafka': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg',
  'uber-surge': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',

  // YouTube
  'yt-client': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'yt-gateway': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  'yt-transcoder': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
  'yt-vitess': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'yt-cdn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  'yt-blob-storage': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  'yt-memcached': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'yt-recommendation': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',

  // Airbnb
  'ab-client': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'ab-gateway': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg',
  'ab-search-service': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'ab-elasticsearch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg',
  'ab-booking-service': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'ab-mysql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'ab-redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'ab-payment-gateway': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg',

  // Instagram
  'ig-client': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'ig-gateway': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  'ig-media-service': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'ig-media-storage': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  'ig-feed-service': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  'ig-redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'ig-postgresql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'ig-cdn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
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
        'width': 190,
        'height': 75,
        'background-color': 'data(color)',
        'background-opacity': 0.12,
        'border-width': 2,
        'border-color': 'data(color)',
        'border-opacity': 0.85,
        'label': 'data(label)',
        'text-valign': 'center',
        'text-halign': 'center',
        'font-family': "'Inter', sans-serif",
        'font-size': 11,
        'font-weight': 600,
        'color': 'hsl(220, 20%, 95%)',
        'text-wrap': 'wrap',
        'text-max-width': 140,
        'padding': '10px',
        // Real tech logo background image configurations
        'background-image': 'data(bgImage)',
        'background-fit': 'contain',
        'background-width': '22px',
        'background-height': '22px',
        'background-position-x': '12px',
        'background-position-y': '50%',
        'text-margin-x': '14px', // Shift text right to avoid overlapping with logo
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
  const cyNodes = nodes.map(node => {
    const icon = NODE_ICONS[node.type] || '⚙️';
    const typeJa = NODE_TYPE_JA[node.type] || node.type;
    // Format: "Zuul API Gateway\n[APIゲートウェイ]" (Icon is now displayed as a graphic logo!)
    const displayLabel = `${node.label}\n[${typeJa}]`;
    const bgImage = TECH_LOGOS[node.id] || '';

    return {
      data: {
        id: node.id,
        label: displayLabel,
        type: node.type,
        color: NODE_COLORS[node.type] || NODE_COLORS.service,
        bgImage: bgImage,
        // Store full node data for sidebar
        _nodeData: node,
      },
      position: {
        x: node.position.x * 1.5,
        y: node.position.y * 1.2,
      },
    };
  });

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
