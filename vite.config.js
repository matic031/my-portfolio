const path = require('path')
import minify from 'vite-plugin-minify'

module.exports = {
  root: 'src',

  plugins: [
    minify({
      removeComments: true,
    }),
  ],

  build: {
    outDir: '../dist',
  rollupOptions: {
    input: {
      main: path.resolve(__dirname, 'src/index.html'),
      slovenscina: path.resolve(__dirname, 'src/slovenscina.html')
    }
  }
  },

  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
}
