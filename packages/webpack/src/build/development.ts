import webpack from 'webpack'
import { PATHS, config } from './common'

config.mode('development')

config.devtool('inline-source-map')

config.devServer
  .open(true)
  .contentBase(PATHS.dist)
  .historyApiFallback(true)
  .hot(true)
  .inline(true)
  .overlay(true)
  .quiet(false)

config
  .plugin('HotModuleReplacementPlugin')
  .use(webpack.HotModuleReplacementPlugin)

const developConfig = config.toConfig()

export default developConfig
