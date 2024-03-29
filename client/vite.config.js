import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import Fonts from 'unplugin-fonts/vite';
import TailwindCSS from 'tailwindcss';
import Autoprefixer from 'autoprefixer';
import path from 'path';

export default defineConfig({
  plugins: [
    // million.vite({ auto: true, mute: true }),
    react(),
    Fonts({
      google: {
        families: ['Lato', 'Inter', 'Fira Code']
      }
    })
  ],
  css: {
    postcss: {
      plugins: [TailwindCSS, Autoprefixer]
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@types': path.resolve(__dirname, './src/types')
    }
  }
});
