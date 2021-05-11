import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import { config } from './common'

config.mode('production')

config.optimization.minimizer('css').use(CssMinimizerPlugin)

// 在 css-loader 前装入 css-loader
config.module
  .rule('style')
  .use('mini-css-extract-plugin-loader')
  .loader(MiniCssExtractPlugin.loader)
  .before('css-loader')

config.plugin('clean-webpack-plugin').use(CleanWebpackPlugin)

config.plugin('mini-css-extract-plugin').use(MiniCssExtractPlugin, [
  {
    filename: '[name].[contenthash:8].css',
    chunkFilename: '[id].[contenthash:8].css',
  },
])

const developConfig = config.toConfig()

export default developConfig
