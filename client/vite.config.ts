import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        quickStart: resolve(__dirname, 'quick-start.html'),
        api: resolve(__dirname, 'api.html'),
        envSpecies: resolve(__dirname, 'env-species.html'),
        tutorials: resolve(__dirname, 'tutorials.html'),
        addAnOrganismMesh: resolve(__dirname, 'add-an-organism-mesh.html'),
        addMultipleOrganisms: resolve(__dirname, 'add-multiple-organisms.html'),
      },
    },
  },
})