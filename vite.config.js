import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  // dev時は '/', build時は GitHub Pages用に '/arch-lib/'
  base: command === 'serve' ? '/' : '/arch-lib/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true,
  },
}));
