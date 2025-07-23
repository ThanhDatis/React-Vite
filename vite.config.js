import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src'),
      // eslint-disable-next-line no-undef
      '@components': path.resolve(__dirname, './src/components'),
      // eslint-disable-next-line no-undef
      '@pages': path.resolve(__dirname, './src/pages'),
      // eslint-disable-next-line no-undef
      '@utils': path.resolve(__dirname, './src/utils'),
      // eslint-disable-next-line no-undef
      '@hooks': path.resolve(__dirname, './src/hooks'),
      // eslint-disable-next-line no-undef
      '@store': path.resolve(__dirname, './src/store'),
      // eslint-disable-next-line no-undef
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server : {
    host: true,
    port: 5173,
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
    allowedHosts: [ '.ngrok-free.app' ]
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          router: ['react-router-dom'],
        }
      }
    }
  },
  define: {
    // eslint-disable-next-line no-undef
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
})
