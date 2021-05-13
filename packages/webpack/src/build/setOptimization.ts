import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
// eslint-disable-next-line import/no-extraneous-dependencies
import TerserPlugin from 'terser-webpack-plugin'
import { SetConfigHelpParams } from './base'

export const setOptimization: () => SetConfigHelpParams = () => ({
  production: config => {
    config.optimization.minimize(true)
    config.optimization.minimizer('css').use(CssMinimizerPlugin)
    config.optimization.minimizer('js').use(TerserPlugin)
  },
})
