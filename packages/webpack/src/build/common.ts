import path from 'path'
import Config from 'webpack-chain'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
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

// module
config.module
  .rule('jsx')
  .test(/\.(j|t)sx?$/i)
  .exclude.add(/node_modules/)
  .end()
  .use('babel-loader')
  .loader('babel-loader')
  .options({
    cacheDirectory: true,
    babelrc: false,
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
      plugins: [
        // eslint-disable-next-line global-require
        require('autoprefixer'),
      ],
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

config.module
  .rule('image')
  .test(/\.(png|jpe?g|gif|webp|bmp)$/i)
  .exclude.add(/node_modules/)
  .end()
  .use('url-loader')
  .options({
    options: {
      // 小于这个是，会专成 base64 。大于，会使用 file-loader ，引用路径
      limit: 8192,
    },
  })

config.module
  .rule('icon')
  .test(/\.(eot|woff|ttf|woff2|svg)$/i)
  .use('url-loader')

// resolve
config.resolve.extensions.add('.js').add('.ts').add('.jsx').add('.tsx')
config.resolve.alias
  .set('@', path.join(PATHS.src))
  .set('react-dom', '@hot-loader/react-dom')

// plugin
config.plugin('html-webpack-plugin').use(HtmlWebpackPlugin, [
  {
    title: 'YueQing',
    inject: 'body',
    meta: {
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1.0',
      'Content-Security-Policy': {
        'http-equiv': 'X-UA-Compatible',
        content: 'ie=edge',
      },
    },
    template: path.join(__dirname, './template.ejs'),
    // TODO: if not has favicon favicon: path.join(PATHS.public, 'favicon.ico'),
  },
])

config.plugin('fork-ts-checker-webpack-plugin').use(ForkTsCheckerWebpackPlugin)

config
  .plugin('webpackbar')
  .use(Webpackbar, [{ name: '🚀 YueQing building', color: '#20b2aa' }])

export { PATHS, config }
