const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)

const cracoLess = require('craco-less')
const WebpackBar = require('webpackbar')

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src'),
      '@pages': resolve('src/pages'),
      '@components': resolve('src/components')
    },
    plugins: [
      new WebpackBar()
    ]
  },
  style: {
    postOption: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  },
  plugins: [
    {
      plugin: cracoLess
    }
  ],
  devServer: {
    port: 4000,
    headers: {
      // 允许跨域
      'Access-Control-Allow-Origin': '*',
    },
    open: false,
  }
}
