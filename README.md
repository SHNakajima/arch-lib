# 🏗️ ArchLibrary — Architecture Encyclopedia

> Explore how the world's largest applications are built.
> Interactive architecture diagrams with component deep-dives and trade-off analysis.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Built with](https://img.shields.io/badge/built%20with-Vite-646CFF.svg)

## ✨ Features

- **Interactive Diagrams** — Explore architecture components with zoom, pan, and click interactions powered by Cytoscape.js
- **Scenario Drill-down** — Switch between use-case views (e.g., "Video Playback Flow") to highlight relevant components
- **Component Deep-dives** — Click any node for detailed information including trade-offs, alternatives, and selection rationale
- **Dark/Light Theme** — Developer-friendly dark mode with a clean glassmorphism UI
- **Zero Backend** — Pure static site, hosted on GitHub Pages

## 🗂️ Included Architectures

| Company | Scenarios |
|---------|-----------|
| **Netflix** | Global View, Video Playback, Recommendation Pipeline |
| **Amazon** | Global View, Purchase Flow, Search & Discovery |
| **Twitter/X** | Global View, Tweet Fanout, Trending Topics |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── main.js                 # App entry point & router
├── components/             # UI components
│   ├── catalog.js          # Company card grid
│   ├── diagram.js          # Cytoscape canvas
│   ├── sidebar.js          # Detail panel
│   └── header.js           # Navigation bar
├── lib/                    # Utilities
│   ├── data-loader.js      # JSON data fetcher
│   ├── graph-styles.js     # Cytoscape styles
│   └── animations.js       # Edge animations
├── styles/                 # CSS
│   ├── index.css           # Design system
│   ├── catalog.css         # Catalog page
│   ├── diagram.css         # Diagram page
│   └── panel.css           # Sidebar panel
└── data/architectures/     # Architecture data (JSON)
```

## 🤝 Contributing

Adding a new architecture requires **no code changes** — just JSON files!

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

## 📄 License

MIT
