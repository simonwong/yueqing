import path from 'path'
import { PATHS } from './base'
import { SetConfigHelp, GetConfig } from './interface'

const getBasicBase: GetConfig = userConfig => ({
  entry: {
    app: [userConfig.entry || path.join(PATHS.src, 'index')],
  },
  output: {
    path: PATHS.dist,
  },
  mode: userConfig.env,
})

export const setBasic: () => SetConfigHelp = () => ({
  development: userConfig => ({
    ...getBasicBase(userConfig),
    // https://www.webpackjs.com/guides/build-performance/#devtool
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      ...userConfig.devServer,
    },
  }),
  production: userConfig => {
    const { output, ...common } = getBasicBase(userConfig)

    return {
      ...common,
      devtool: 'source-map',
      output: {
        ...output,
        filename: '[name].[contenthash:8].js',
        chunkFilename: 'chunk.[contenthash:8].js',
      },
    }
  },
})
