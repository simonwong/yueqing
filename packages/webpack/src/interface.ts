import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackDevServer from 'webpack-dev-server'

export type UserConfig = {
  target?: Configuration['target']
  entry?: string
  alias?: {
    [key: string]: string
  }
  devServer?: WebpackDevServer.Configuration
  // HtmlWebpackPlugin Config
  htmlWebpack?: HtmlWebpackPlugin.Options
}

export type GetEnvConfig = () => Configuration

export type NodeEnv = 'development' | 'production'

export type ConfigContext = {
  nodeEnv: NodeEnv
  useTypescript: boolean
  isDevelopmentEnv: boolean
  isProductionEnv: boolean
  userConfig: UserConfig
}

export type GetConfig = (ctx: ConfigContext) => Configuration

export type SetConfigHelp = {
  development: GetConfig
  production: GetConfig
}
