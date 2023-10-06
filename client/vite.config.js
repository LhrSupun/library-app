import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    "/books":"http://127.0.0.1:5000/books"
  },
  server: {
    port: 3000,
  },
})

// proxy: {
//   "/books": {
//     target: "http://127.0.0.1:5000/books",
//       changeOrigin: true
//   },
//   "/book/:id": {
//     target: "http://127.0.0.1:5000/book/:id",
//       changeOrigin: true
//   }
// },