import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    // HMR can be disabled via DISABLE_HMR env var (used in AI Studio environments).
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
