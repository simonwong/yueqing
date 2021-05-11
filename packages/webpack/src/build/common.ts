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
  .add('react-hot-loader/patch')
  .add(path.join(PATHS.src, 'index'))
  .end()
  .output.path(PATHS.dist)
  .filename('[name].[contenthash:8].js')

// module
config.module
  .rule('jsx')
  .test(/\.jsx?$/i)
  .exclude.add(/node_modules/)
  .end()
  .use('babel-loader')
  .loader('babel-loader')
  .options({
    cacheDirectory: true,
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      'react-hot-loader/babel',
      '@babel/plugin-transform-runtime',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-private-methods', { loose: true }],
    ],
  })

config.module
  .rule('style')
  .test(/\.(scss|css)$/i)
  .exclude.add(/node_modules/)
  .end()
  .use('css-loader')
  .loader('css-loader')
  .options({
    modules: {
      localIdentName: '[name]_[local]_[contenthash:base64:6]',
    },
    importLoaders: 1,
  })
  .end()
  .use('postcss-loader')
  .loader('postcss-loader')
  .options({
    postcssOptions: {
      plugins: [],
    },
  })
  .end()
  .use('sass-loader')
  .loader('sass-loader')
  .options({
    // eslint-disable-next-line global-require
    implementation: require('sass'),
    sassOptions: {
      // eslint-disable-next-line global-require
      fiber: require('fibers'),
    },
  })

// TODO: css image loader

// resolve
config.resolve.extensions.add('.js').add('.jsx').add('.tsx')
config.resolve.alias
  .set('@', path.join(PATHS.src))
  .set('react-dom', '@hot-loader/react-dom')

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
