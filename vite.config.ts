import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  esbuild: {
    drop: mode !== 'development' ? ['console', 'debugger'] : [],
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@root/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    port: 8880,
  },
}))
