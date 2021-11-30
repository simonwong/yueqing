import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackDevServer from 'webpack-dev-server'

export type UserConfig = {
  env: 'development' | 'production'
  entry?: string
  alias?: {
    [key: string]: string
  }
  devServer?: WebpackDevServer.Configuration
  // HtmlWebpackPlugin Config
  htmlWebpack?: HtmlWebpackPlugin.Options
}

export type GetConfig = (userConfig: UserConfig) => webpack.Configuration

export type SetConfigHelp = {
  development: GetConfig
  production: GetConfig
}
