import Config from 'webpack-chain'
import path from 'path'
import { SetConfigHelpParams, PATHS } from './base'

export const setBasic: () => SetConfigHelpParams = () => ({
  common: (config, envConf) => {
    config
      .entry('app')
      .add('react-hot-loader/patch')
      .add(path.join(PATHS.src, 'index'))
      .end()
      .output.path(PATHS.dist)

    config.mode(envConf.env)
  },
  development: config => {
    // https://www.webpackjs.com/guides/build-performance/#devtool
    config.devtool('eval-cheap-module-source-map' as Config.DevTool)
    config.devServer
      .open(true)
      .contentBase(PATHS.dist)
      .historyApiFallback(true)
      .hot(true)
      .inline(true)
      .overlay(true)
      .quiet(false)
  },
  production: config => {
    config.devtool('source-map')
    config.output
      .filename('[name].[contenthash:8].js')
      .chunkFilename('chunk.[contenthash:8].js')
  },
})
