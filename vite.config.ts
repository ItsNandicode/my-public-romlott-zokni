import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Remove the tailwindcss() plugin below if you switch to Tailwind v3
// (in that case also delete src/index-v4.css and keep tailwind.config.js)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
