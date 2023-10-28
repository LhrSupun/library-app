import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    cors: false,
    proxy: {
      '/books': 'http://127.0.0.1:5000',
      '/book': 'http://127.0.0.1:5000',
      '/authors': 'http://127.0.0.1:5000',
      '/author': 'http://127.0.0.1:5000'
    },
  },
})