/**
 * animations.js — Edge flow animations using Cytoscape
 */

let animationFrameId = null;
let animatedEdges = [];

/**
 * Start flowing animation on highlighted edges
 */
export function startEdgeAnimations(cy) {
  stopEdgeAnimations();

  animatedEdges = cy.edges('.highlighted').toArray();
  if (animatedEdges.length === 0) return;

  let offset = 0;
  const speed = 0.5;

  function animate() {
    offset = (offset + speed) % 20;

    animatedEdges.forEach(edge => {
      try {
        edge.style('line-dash-offset', -offset);
      } catch (_) {
        // Edge may have been removed
      }
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  // Set edges to have animated dashes
  animatedEdges.forEach(edge => {
    const type = edge.data('type');
    if (type !== 'async') {
      edge.style({
        'line-style': 'dashed',
        'line-dash-pattern': [10, 6],
      });
    }
  });

  animate();
}

/**
 * Stop all edge animations
 */
export function stopEdgeAnimations() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  // Restore original edge styles
  animatedEdges.forEach(edge => {
    try {
      const type = edge.data('type');
      if (type !== 'async') {
        edge.style({
          'line-style': 'solid',
          'line-dash-pattern': [],
          'line-dash-offset': 0,
        });
      }
    } catch (_) {
      // Edge may have been removed
    }
  });

  animatedEdges = [];
}
