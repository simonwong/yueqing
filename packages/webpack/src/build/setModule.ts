import { RuleSetRule, RuleSetUseItem } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { SetConfigHelp, ConfigContext } from '../interface'

const getModuleBase = (
  ctx: ConfigContext,
  styleLoader: RuleSetUseItem,
): RuleSetRule[] => {
  // module
  const jsRule: RuleSetRule = {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          babelrc: false,
          presets: [require.resolve('@yueqing/babel-preset-react-app')],
          plugins: [
            ctx.isDevelopmentEnv && require.resolve('react-refresh/babel'),
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
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 8192,
      },
    },
  }

  const iconRule: RuleSetRule = {
    test: /\.svg$/,
    use: [
      {
        loader: require.resolve('@svgr/webpack'),
      },
      {
        loader: require.resolve('url-loader'),
      },
    ],
  }

  return [jsRule, styleRule, imgRule, iconRule]
}

export const setModule: () => SetConfigHelp = () => ({
  development: ctx => {
    const styleLoader: RuleSetUseItem = {
      loader: require.resolve('style-loader'),
    }

    const rules = getModuleBase(ctx, styleLoader)

    return {
      module: {
        rules,
      },
    }
  },
  production: ctx => {
    const styleLoader: RuleSetUseItem = {
      loader: MiniCssExtractPlugin.loader,
    }
    const rules = getModuleBase(ctx, styleLoader)

    return {
      module: {
        rules,
      },
    }
  },
})
