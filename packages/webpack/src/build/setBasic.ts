import path from 'path'
import { PATHS } from '../helper'
import { SetConfigHelp, GetConfig } from '../interface'

const getBasicBase: GetConfig = ({ userConfig, nodeEnv }) => ({
  entry: {
    app: [userConfig.entry || path.join(PATHS.src, 'index')],
  },
  output: {
    path: PATHS.dist,
  },
  mode: nodeEnv,
  cache: true,
})

export const setBasic: () => SetConfigHelp = () => ({
  development: ctx => ({
    ...getBasicBase(ctx),
    // https://www.webpackjs.com/guides/build-performance/#devtool
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      ...ctx.userConfig.devServer,
    },
  }),
  production: ctx => {
    const { output, ...common } = getBasicBase(ctx)

    return {
      ...common,
      devtool: 'source-map',
      output: {
        ...output,
        // 向输出的 require() 添加注释 /* filaname */
        pathinfo: true,
        filename: '[name].[contenthash:8].js',
        chunkFilename: 'chunk.[contenthash:8].js',
        // assetModuleFilename: 'static/[name].[hash][ext]',
      },
    }
  },
})
