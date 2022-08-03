import { RuleSetRule, RuleSetUseItem } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { SetConfigHelp, ConfigContext } from '../interface'

const cssRegexp = /\.css$/
const cssModuleRegexp = /\.module\.css$/
const sassRegexp = /\.(scss|sass)$/
const sassModuleRegexp = /\.module\.(scss|sass)$/

const getStyleLoader = (
  ctx: ConfigContext,
  cssLoaderConfig: string | { [index: string]: any },
) => {
  const loaders: RuleSetUseItem[] = [
    ctx.isProductionEnv
      ? {
          loader: MiniCssExtractPlugin.loader,
        }
      : {
          loader: require.resolve('style-loader'),
        },
    {
      loader: require.resolve('css-loader'),
      options: cssLoaderConfig,
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
  ]

  return loaders
}

const getSaasLoader = () => {
  const saasLoader: RuleSetUseItem = {
    loader: require.resolve('sass-loader'),
    options: {
      // eslint-disable-next-line global-require
      implementation: require('sass'),
      sassOptions: {
        fiber: false,
      },
    },
  }
  return saasLoader
}

const getModuleBase = (ctx: ConfigContext): RuleSetRule[] => {
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

  const styleRule: RuleSetRule[] = [
    {
      test: cssRegexp,
      exclude: cssModuleRegexp,
      use: getStyleLoader(ctx, {
        importLoaders: 1,
        modules: {
          mode: 'icss',
        },
      }),
      // See https://github.com/webpack/webpack/issues/6571
      sideEffects: true,
    },
    {
      test: cssModuleRegexp,
      use: getStyleLoader(ctx, {
        importLoaders: 1,
        modules: {
          mode: 'local',
          localIdentName: '[name]_[local]_[contenthash:base64:6]',
        },
      }),
    },
    {
      test: sassRegexp,
      exclude: sassModuleRegexp,
      use: [
        ...getStyleLoader(ctx, {
          importLoaders: 3,
          modules: {
            mode: 'icss',
          },
        }),
        getSaasLoader(),
      ],
      sideEffects: true,
    },
    {
      test: sassModuleRegexp,
      use: [
        ...getStyleLoader(ctx, {
          importLoaders: 3,
          modules: {
            mode: 'local',
            localIdentName: '[name]_[local]_[contenthash:base64:6]',
          },
        }),
        getSaasLoader(),
      ],
    },
  ]

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

  return [jsRule, ...styleRule, imgRule, iconRule]
}

export const setModule: () => SetConfigHelp = () => ({
  development: ctx => {
    const rules = getModuleBase(ctx)

    return {
      module: {
        rules,
      },
    }
  },
  production: ctx => {
    const rules = getModuleBase(ctx)

    return {
      module: {
        rules,
      },
    }
  },
})
