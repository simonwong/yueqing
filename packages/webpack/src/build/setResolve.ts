import path from 'path'
import { PATHS } from '../helper'
import { SetConfigHelp, ConfigContext } from '../interface'

const getResolveBase = (ctx: ConfigContext) => ({
  extensions: ['.js', '.ts', '.jsx', '.tsx'],
  alias: {
    '@': path.join(PATHS.src),
    ...ctx.userConfig.alias,
  },
})

export const setResolve: () => SetConfigHelp = () => ({
  development: ctx => ({
    resolve: getResolveBase(ctx),
  }),
  production: ctx => ({
    resolve: getResolveBase(ctx),
  }),
})
