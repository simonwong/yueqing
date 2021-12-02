import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

import { SetConfigHelp, UserConfig } from './interface'

const getPluginsBase = (userConfig: UserConfig) => {
  const defaultHtmlMeta = {
    charset: 'UTF-8',
    viewport: 'width=device-width, initial-scale=1.0',
    'Content-Security-Policy': {
      'http-equiv': 'X-UA-Compatible',
      content: 'ie=edge',
    },
  }

  return [
    new HtmlWebpackPlugin({
      title: 'YueQing',
      inject: 'body',
      // TODO: if not has favicon favicon: path.join(PATHS.public, 'favicon.ico'),
      template: path.join(__dirname, './template.ejs'),
      ...userConfig.htmlWebpack,
      meta: {
        ...defaultHtmlMeta,
        ...userConfig.htmlWebpack?.meta,
      },
    }),
    // TODO: ForkTsCheckerWebpackPlugin
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(userConfig.env),
    }),
  ]
}

export const setPlugins: () => SetConfigHelp = () => ({
  development: userConfig => ({
    plugins: [
      ...getPluginsBase(userConfig),
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
    ],
  }),
  production: userConfig => ({
    plugins: [
      ...getPluginsBase(userConfig),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
        chunkFilename: 'chunk.[contenthash:8].css',
      }),
    ],
  }),
})
