import path from 'path'
import Config from 'webpack-chain'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import Webpackbar from 'webpackbar'

const config = new Config()

const workPath = process.env.PWD || process.cwd()

const PATHS = {
  build: workPath,
  public: path.join(workPath, './public'),
  src: path.join(workPath, './src'),
  dist: path.join(workPath, './dist'),
}

// entry output
config
  .entry('app')
  .add(path.join(PATHS.src, 'index'))
  .end()
  .output.path(PATHS.dist)
  .filename('[name].[contenthash:8].js')

// module
config.module
  // jsx
  .rule('jsx')
  .test(/\.jsx?$/)
  .exclude.add(/node_modules/)
  .end()
  .use('babel-loader')
  .loader('babel-loader')
  .options({
    cacheDirectory: true,
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      // TODO: 'react-hot-loader/babel',
      '@babel/plugin-transform-runtime',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-private-methods', { loose: true }],
    ],
  })

// TODO: css image loader

// resolve
config.resolve.extensions.add('.js').add('.jsx').add('.tsx')
config.resolve.alias.set('@', path.join(PATHS.src))

// plugin
config.plugin('html-webpack-plugin').use(HtmlWebpackPlugin, [
  {
    title: 'YueQing',
    template: path.join(__dirname, './template.html'),
    // TODO: if not has favicon favicon: path.join(PATHS.public, 'favicon.ico'),
  },
])

config
  .plugin('webpackbar')
  .use(Webpackbar, [{ name: '🚀 YueQing building', color: '#20b2aa' }])

export { PATHS, config }
