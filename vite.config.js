import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5347,
  },
  build: {
    outDir: 'docs'
  }
});
