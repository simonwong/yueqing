import webpack from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
// eslint-disable-next-line import/no-extraneous-dependencies
import TerserPlugin from 'terser-webpack-plugin'
import { config } from './common'

config.output
  .filename('[name].[contenthash:8].js')
  .chunkFilename('chunk.[contenthash:8].js')

config.mode('production')
config.devtool('source-map')

config.optimization.minimize(true)
config.optimization.minimizer('css').use(CssMinimizerPlugin)
config.optimization.minimizer('js').use(TerserPlugin)

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
    chunkFilename: 'chunk.[contenthash:8].css',
  },
])

config
  .plugin('DefinePlugin')
  .use(webpack.DefinePlugin, [
    { 'process.env.NODE_ENV': JSON.stringify('production') },
  ])

const developConfig = config.toConfig()

export default developConfig
