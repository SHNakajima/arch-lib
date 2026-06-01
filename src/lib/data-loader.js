/**
 * data-loader.js — Fetch and cache architecture data
 */

const cache = new Map();

/**
 * Fetch JSON with error handling
 */
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * Load all architecture metadata (for catalog)
 */
export async function loadArchitectureList() {
  if (cache.has('__list__')) return cache.get('__list__');

  const ids = ['netflix', 'amazon', 'twitter', 'spotify', 'uber', 'youtube', 'airbnb', 'instagram'];
  const metas = await Promise.all(
    ids.map((id) =>
      fetchJSON(`${import.meta.env.BASE_URL}data/architectures/${id}/meta.json`)
    )
  );

  cache.set('__list__', metas);
  return metas;
}

/**
 * Load full architecture data for a specific company
 */
export async function loadArchitecture(id) {
  if (cache.has(id)) return cache.get(id);

  const base = `${import.meta.env.BASE_URL}data/architectures/${id}`;
  const [meta, nodes, edges, scenarios] = await Promise.all([
    fetchJSON(`${base}/meta.json`),
    fetchJSON(`${base}/nodes.json`),
    fetchJSON(`${base}/edges.json`),
    fetchJSON(`${base}/scenarios.json`),
  ]);

  const data = { meta, nodes, edges, scenarios };
  cache.set(id, data);
  return data;
}

/**
 * Get unique tags across all architectures
 */
export async function getAllTags() {
  const list = await loadArchitectureList();
  const tagSet = new Set();
  list.forEach(meta => meta.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}
