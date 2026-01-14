import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        // Reescreve o domínio do cookie retornado pelo backend para 'localhost'
        // assim o navegador aceitará o cookie quando a app estiver em http://localhost:5173
        cookieDomainRewrite: 'localhost',
      }
    }
  }
})
