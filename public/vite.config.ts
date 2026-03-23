import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  envDir: '..',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://backend-julesstudio.juleskid5102.workers.dev',
        changeOrigin: true,
      },
    },
  },
})
