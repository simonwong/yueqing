import path from 'path'
import Config from 'webpack-chain'

const config = new Config()

const PATHS = {
  build: __dirname,
  public: path.join(__dirname, '../public'),
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
}

// entry output
config
  .entry('add')
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
  .loader('babel-loader?cacheDirectory')

// resolve
config.resolve.extensions.add('js').add('jsx').add('tsx')
config.resolve.alias.set('@', path.join(PATHS.src))

export { PATHS, config }
