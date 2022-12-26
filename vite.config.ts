import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import * as path from 'path'

const manifest = require('./manifest.json')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    crx({ manifest })
  ],
  build: {
    minify: false
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: 'localhost',
    port: 12170
  },
  base: './'
})
