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
  .quiet(true)

const developConfig = config.toConfig()

export default developConfig
