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
        // TODO: 抽成一个 babel preset
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
            ctx.isDevelopmentEnv && require.resolve('react-refresh/babel'),
            '@babel/plugin-transform-runtime',
            // TC39 Proposals: 使用装饰器 @xxx
            ['@babel/plugin-proposal-decorators', false],
            // ES2022: 类属性 class Foo { name = 'foo'; static getName = ... }
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            // ES2022: 私有属性 class Foo { #name = 'foo'; getName = () => this.#name }
            [
              '@babel/plugin-proposal-private-property-in-object',
              { loose: true },
            ],
            // TC39 Proposals: 私有方法
            ['@babel/plugin-proposal-private-methods', { loose: true }],
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
