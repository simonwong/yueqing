import webpack, { WebpackPluginInstance } from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

import { SetConfigHelp, ConfigContext } from '../interface'

const getPluginsBase = (ctx: ConfigContext) => {
  const defaultHtmlMeta = {
    charset: 'UTF-8',
    viewport: 'width=device-width, initial-scale=1.0',
  }
  const plugins: webpack.WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
      title: 'YueQing',
      inject: 'body',
      // TODO: if not has favicon favicon: path.join(PATHS.public, 'favicon.ico'),
      template: path.join(__dirname, './template.ejs'),
      ...ctx.userConfig.htmlWebpack,
      meta: {
        ...defaultHtmlMeta,
        ...ctx.userConfig.htmlWebpack?.meta,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ctx.nodeEnv),
    }),
  ]
  if (ctx.useTypescript) {
    plugins.push(new ForkTsCheckerWebpackPlugin({}))
  }

  return plugins
}

export const setPlugins: () => SetConfigHelp = () => ({
  development: ctx => ({
    plugins: [
      ...getPluginsBase(ctx),
      // [webpack-dev-server] "hot: true" automatically applies HMR plugin, you don't have to add it manually to your webpack configuration.
      // new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }) as unknown as WebpackPluginInstance,
    ],
  }),
  production: ctx => ({
    plugins: [
      ...getPluginsBase(ctx),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
        chunkFilename: 'chunk.[contenthash:8].css',
      }),
    ],
  }),
})
