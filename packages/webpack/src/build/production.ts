import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { config } from './common'

config.mode('production')

config.plugin('clean-webpack-plugin').use(CleanWebpackPlugin)

const developConfig = config.toConfig()

export default developConfig
