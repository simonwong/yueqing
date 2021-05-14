import path from 'path'
import { SetConfigHelpParams, PATHS } from './base'

export const setResolve: () => SetConfigHelpParams = () => ({
  common: (config, envConf) => {
    // === set extensions ===
    config.resolve.extensions.add('.js').add('.ts').add('.jsx').add('.tsx')

    // === set alias ===
    const alias = {
      '@': path.join(PATHS.src),
      'react-dom': '@hot-loader/react-dom',
      ...envConf.alias,
    }

    Object.entries(alias).forEach(([key, value]) => {
      config.resolve.alias.set(key, value)
    })
  },
})
