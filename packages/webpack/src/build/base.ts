import Config from 'webpack-chain'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

export type EnvConfig = {
  env: 'development' | 'production'
  entry?: string
  alias?: {
    [key: string]: string
  }
  // HtmlWebpackPlugin Config
  htmlWebpack?: HtmlWebpackPlugin.Options
}

export type GetConfig = (envConf: EnvConfig) => webpack.Configuration

export const workPath = process.env.PWD || process.cwd()

export const PATHS = {
  build: workPath,
  public: path.join(workPath, './public'),
  src: path.join(workPath, './src'),
  dist: path.join(workPath, './dist'),
} as const

export type SetPartConfig = (config: Config, envConf: EnvConfig) => void

export type SetConfigHelpParams = {
  common?: SetPartConfig
  development?: SetPartConfig
  production?: SetPartConfig
}

type SetConfigHelpBack = (envHelp: SetConfigHelpParams) => void
type SetConfigHelp = (config: Config, envConf: EnvConfig) => SetConfigHelpBack

export const setConfigHelp: SetConfigHelp =
  (config, envConf) => (envHelp: SetConfigHelpParams) => {
    if (envHelp.common) {
      envHelp.common(config, envConf)
    }
    if (envHelp.development && envConf.env === 'development') {
      envHelp.development(config, envConf)
    }
    if (envHelp.production && envConf.env === 'production') {
      envHelp.production(config, envConf)
    }
  }
