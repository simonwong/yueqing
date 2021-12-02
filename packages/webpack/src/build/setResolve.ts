import path from 'path'
import { PATHS } from './base'
import { SetConfigHelp, UserConfig } from './interface'

const getResolveBase = (userConfig: UserConfig) => ({
  extensions: ['.js', '.ts', '.jsx', '.tsx'],
  alias: {
    '@': path.join(PATHS.src),
    ...userConfig.alias,
  },
})

export const setResolve: () => SetConfigHelp = () => ({
  development: userConfig => ({
    resolve: getResolveBase(userConfig),
  }),
  production: userConfig => ({
    resolve: getResolveBase(userConfig),
  }),
})
