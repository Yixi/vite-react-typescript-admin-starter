import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  build: {
    rolldownOptions: {
      output: {
        minify:
          mode !== 'development'
            ? {
                mangle: true,
                compress: { dropConsole: true, dropDebugger: true },
                codegen: true,
              }
            : undefined,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@root/': `${path.resolve(import.meta.dirname, 'src')}/`,
    },
  },
  server: {
    port: 8880,
  },
}))
