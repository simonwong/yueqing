import { RuleSetRule, RuleSetUseItem } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { SetConfigHelp, UserConfig } from './interface'

const getModuleBase = (
  userConfig: UserConfig,
  styleLoader: RuleSetUseItem,
): RuleSetRule[] => {
  // module
  const jsxRule: RuleSetRule = {
    test: /\.(j|t)sx?$/i,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            '@babel/preset-env',
            '@babel/preset-typescript',
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
              },
            ],
          ],
          plugins: [
            userConfig.env === 'development' &&
              require.resolve('react-refresh/babel'),
            '@babel/plugin-transform-runtime',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: false }],
            ['@babel/plugin-proposal-private-methods', { loose: false }],
          ].filter(Boolean),
        },
      },
    ],
  }

  const styleRule: RuleSetRule = {
    test: /\.(scss|css)$/i,
    exclude: /node_modules/,
    use: [
      // 在 css-loader 前装入 styleLoader
      styleLoader,
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: {
            localIdentName: '[name]_[local]_[contenthash:base64:6]',
          },
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            plugins: [
              // eslint-disable-next-line global-require
              require('autoprefixer'),
            ],
          },
        },
      },
      {
        loader: require.resolve('sass-loader'),
        options: {
          // eslint-disable-next-line global-require
          implementation: require('sass'),
          sassOptions: {
            fiber: false,
          },
        },
      },
    ],
  }

  const imgRule: RuleSetRule = {
    test: /\.(png|jpe?g|gif|webp|bmp)$/i,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('url-loader'),
        options: {
          options: {
            // 小于这个是，会专成 base64 。大于，会使用 file-loader ，引用路径
            limit: 8192,
          },
        },
      },
    ],
  }

  const iconRule: RuleSetRule = {
    test: /\.(eot|woff|ttf|woff2|svg)$/i,
    use: [
      {
        loader: require.resolve('url-loader'),
      },
    ],
  }

  return [jsxRule, styleRule, imgRule, iconRule]
}

export const setModule: () => SetConfigHelp = () => ({
  development: userConfig => {
    const styleLoader: RuleSetUseItem = {
      loader: require.resolve('style-loader'),
    }

    const rules = getModuleBase(userConfig, styleLoader)

    return {
      module: {
        rules,
      },
    }
  },
  production: userConfig => {
    const styleLoader: RuleSetUseItem = {
      loader: MiniCssExtractPlugin.loader,
    }
    const rules = getModuleBase(userConfig, styleLoader)

    return {
      module: {
        rules,
      },
    }
  },
})
