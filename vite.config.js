import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

export default defineConfig({
  root: 'src',
  base: './', // Use relative paths for GitHub Pages
  build: {
    outDir: '../docs',
    emptyOutDir: false, // Don't delete style.json and other existing files
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      },
      output: {
        // Disable hashing in filenames
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          // CSS files should have .css extension
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return '[name].css';
          }
          return '[name][extname]';
        }
      }
    },
    // Copy style.json to the output directory
    assetsInclude: ['**/*.json']
  },
  publicDir: false, // Disable copying public dir since we want to preserve existing docs files
  server: {
    open: true
  },
  plugins: [
    {
      name: 'copy-style-json',
      writeBundle() {
        // Copy src/style.json to docs/style.json after build
        copyFileSync('src/style.json', 'docs/style.json');
        console.log('✅ Copied src/style.json to docs/style.json');
      }
    }
  ]
});