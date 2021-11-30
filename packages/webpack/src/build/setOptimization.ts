import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
// eslint-disable-next-line import/no-extraneous-dependencies
import TerserPlugin from 'terser-webpack-plugin'
import { SetConfigHelp } from './interface'

export const setOptimization: () => SetConfigHelp = () => ({
  development: () => ({}),
  production: () => ({
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
  }),
})
