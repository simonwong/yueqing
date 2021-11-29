import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import Webpackbar from 'webpackbar'

import { SetConfigHelpParams } from './base'

export const setPlugins: () => SetConfigHelpParams = () => ({
  common: (config, userConfig) => {
    const defaultHtmlMeta = {
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1.0',
      'Content-Security-Policy': {
        'http-equiv': 'X-UA-Compatible',
        content: 'ie=edge',
      },
    }
    config.plugin('html-webpack-plugin').use(HtmlWebpackPlugin, [
      {
        title: 'YueQing',
        inject: 'body',
        // TODO: if not has favicon favicon: path.join(PATHS.public, 'favicon.ico'),
        template: path.join(__dirname, './template.ejs'),
        ...userConfig.htmlWebpack,
        meta: {
          ...defaultHtmlMeta,
          ...userConfig.htmlWebpack?.meta,
        },
      },
    ])

    // TODO: config
    //   .plugin('fork-ts-checker-webpack-plugin')
    //   .use(ForkTsCheckerWebpackPlugin)

    config
      .plugin('webpackbar')
      .use(Webpackbar, [{ name: '🚀 YueQing building', color: '#20b2aa' }])
  },
  development: config => {
    config
      .plugin('HotModuleReplacementPlugin')
      .use(webpack.HotModuleReplacementPlugin)

    config
      .plugin('DefinePlugin')
      .use(webpack.DefinePlugin, [
        { 'process.env.NODE_ENV': JSON.stringify('development') },
      ])
  },
  production: config => {
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
  },
})
