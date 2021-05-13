import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { SetConfigHelpParams } from './base'

export const setModule: () => SetConfigHelpParams = () => ({
  common: config => {
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
  },
  development: config => {
    // 在 css-loader 前装入 css-loader
    config.module
      .rule('style')
      .use('style-loader')
      .loader('style-loader')
      .before('css-loader')
  },
  production: config => {
    // 在 css-loader 前装入 css-loader
    config.module
      .rule('style')
      .use('mini-css-extract-plugin-loader')
      .loader(MiniCssExtractPlugin.loader)
      .before('css-loader')
  },
})
