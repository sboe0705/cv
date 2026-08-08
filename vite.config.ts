import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// The site is published to https://sboe0705.github.io/curriculum-vitae/, so the
// production build needs the repository name as its base path. `npm run dev`
// serves from the root, hence the mode switch.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/curriculum-vitae/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
