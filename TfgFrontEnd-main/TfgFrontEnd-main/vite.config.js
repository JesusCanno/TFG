import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    // Configurar proxy para redireccionar las peticiones a la API
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  },
  // Para manejar correctamente el enrutamiento en React
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  // Configuración para historyApiFallback (SPA)
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Asegurarse de que el proyecto funcione como SPA con enrutamiento del lado del cliente
  base: '/'
})
