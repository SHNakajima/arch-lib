# Contributing to ArchLibrary

Thank you for your interest in contributing to the Architecture Encyclopedia! 🏗️

## Adding a New Architecture

Adding a new company/service architecture requires **no code changes** — just data files!

### 1. Create the Data Directory

```
src/data/architectures/your-company/
├── meta.json          # Company metadata
├── nodes.json         # Architecture components
├── edges.json         # Connections between components
└── scenarios.json     # Use-case scenario definitions
```

Also copy the same files to `public/data/architectures/your-company/`.

### 2. Register the Architecture

Add your company ID to the `ids` array in `src/lib/data-loader.js`:

```javascript
const ids = ['netflix', 'amazon', 'twitter', 'your-company'];
```

### 3. Data Schema Reference

#### meta.json

```json
{
  "id": "your-company",
  "name": "Your Company",
  "description": "Brief description of the service/platform",
  "category": "Category (e.g., E-Commerce, Social Media)",
  "tags": ["tag1", "tag2", "tag3"],
  "color": "#HEX_COLOR",
  "accentGradient": "linear-gradient(135deg, #COLOR1, #COLOR2)"
}
```

#### nodes.json

Each node represents a component in the architecture:

```json
[
  {
    "id": "unique-id",
    "label": "Display Name",
    "type": "service",
    "description": "What this component does",
    "techStack": "Technologies used",
    "role": "Why this component exists in the architecture",
    "whyChosen": "Why this technology was selected",
    "tradeoffs": {
      "pros": ["Advantage 1", "Advantage 2"],
      "cons": ["Disadvantage 1", "Disadvantage 2"]
    },
    "alternatives": [
      { "name": "Alternative Tech", "context": "When to use it instead" }
    ],
    "position": { "x": 100, "y": 200 }
  }
]
```

**Node types:** `client`, `gateway`, `service`, `database`, `cache`, `queue`, `cdn`, `ml`

#### edges.json

Connections between nodes:

```json
[
  {
    "source": "node-id-1",
    "target": "node-id-2",
    "label": "Description of data flow",
    "type": "sync",
    "scenarios": ["global", "scenario-id"]
  }
]
```

**Edge types:** `sync` (solid line), `async` (dashed), `streaming` (thick solid)

#### scenarios.json

Use-case drill-down views:

```json
[
  {
    "id": "global",
    "name": "🌐 Global View",
    "description": "Full system overview",
    "highlightNodes": "*",
    "highlightEdges": "*"
  },
  {
    "id": "use-case-id",
    "name": "📋 Use Case Name",
    "description": "What this scenario shows",
    "highlightNodes": ["node1", "node2"],
    "highlightEdges": ["node1->node2"],
    "steps": [
      { "order": 1, "description": "Step description", "nodes": ["node1", "node2"] }
    ]
  }
]
```

### 4. Positioning Guide

Node positions use `{ x, y }` coordinates. A good layout typically:
- Places clients on the **left** (~100)
- Load balancers/gateways in the **center-left** (~300-500)
- Backend services in the **center** (~500-700)
- Data stores on the **right** (~800-1000)
- y-axis spread: ~100-500

### 5. Quality Checklist

- [ ] All node IDs are unique within the architecture
- [ ] All edges reference valid node IDs in both source and target
- [ ] Every scenario includes at least the "global" view
- [ ] Descriptions cite publicly available sources (engineering blogs, conference talks)
- [ ] Trade-offs include both pros AND cons
- [ ] At least 2 alternatives listed per node

### 6. Submit a PR

1. Fork the repository
2. Create a feature branch: `git checkout -b add-your-company`
3. Add your data files
4. Test locally: `npm run dev`
5. Open a Pull Request with:
   - Company name and brief description
   - Sources for architectural information

## Fixing Existing Data

If you spot inaccuracies or want to improve descriptions:

1. Locate the relevant JSON file in `src/data/architectures/`
2. Make your changes
3. Copy changes to `public/data/architectures/` too
4. Submit a PR with the source of your correction

## Code Contributions

For UI/code changes:

1. Fork and clone the repo
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Make changes
5. Test: `npm run build` to verify static output
6. Submit a PR

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
