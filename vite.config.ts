import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // IMPORTANT: GitHub Pages project site base path
  // This makes built asset URLs like /portfolio-mui/...
  base: '/portfolio-mui/',
  plugins: [react()],
})
