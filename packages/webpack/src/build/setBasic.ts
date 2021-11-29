import WebpackDevServer from 'webpack-dev-server'
import Config from 'webpack-chain'
import path from 'path'
import { SetConfigHelpParams, PATHS } from './base'

export const setBasic: () => SetConfigHelpParams = () => ({
  common: (config, envConf) => {
    config
      .entry('app')
      .add('react-hot-loader/patch')
      .add(envConf.entry || path.join(PATHS.src, 'index'))
      .end()
      .output.path(PATHS.dist)

    config.mode(envConf.env)
  },
  development: (config, userConfig) => {
    // https://www.webpackjs.com/guides/build-performance/#devtool
    config.devtool('eval-cheap-module-source-map' as Config.DevTool)
    config.merge({
      devServer: {
        historyApiFallback: true,
        hot: true,
        ...userConfig.devServer,
      } as WebpackDevServer.Configuration,
    })
  },
  production: config => {
    config.devtool('source-map')
    config.output
      .filename('[name].[contenthash:8].js')
      .chunkFilename('chunk.[contenthash:8].js')
  },
})
