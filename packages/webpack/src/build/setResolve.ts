import path from 'path'
import { SetConfigHelpParams, PATHS } from './base'

export const setResolve: () => SetConfigHelpParams = () => ({
  common: config => {
    config.resolve.extensions.add('.js').add('.ts').add('.jsx').add('.tsx')
    config.resolve.alias
      .set('@', path.join(PATHS.src))
      .set('react-dom', '@hot-loader/react-dom')
  },
})
