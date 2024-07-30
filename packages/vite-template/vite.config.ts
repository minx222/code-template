import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    AutoImport({
      imports: ['react', 'react-router-dom', 'ahooks'],
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  },
})
