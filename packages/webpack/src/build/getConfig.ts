import { Configuration } from 'webpack'
import { setBasic } from './setBasic'
import { setModule } from './setModule'
import { setResolve } from './setResolve'
import { setPlugins } from './setPlugins'
import { setOptimization } from './setOptimization'
import { GetConfig, SetConfigHelp, ConfigContext } from '../interface'

type SetConfigHelpBack = (getPartConfig: SetConfigHelp) => Configuration

export const configHelp: (ctx: ConfigContext) => SetConfigHelpBack =
  ctx => (help: SetConfigHelp) => {
    if (ctx.isProductionEnv) {
      return help.production(ctx)
    }
    return help.development(ctx)
  }

export const getConfig: GetConfig = ctx => {
  const config = configHelp(ctx)

  return {
    ...config(setBasic()),
    ...config(setModule()),
    ...config(setResolve()),
    ...config(setPlugins()),
    ...config(setOptimization()),
  }
}
