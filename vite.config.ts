import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export defaul defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})
