import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        api: resolve(__dirname, 'api.html'),
        envSpecies: resolve(__dirname, 'env-species.html'),
      },
    },
  },
})