import { Configuration } from 'webpack'
import { GetConfig, SetConfigHelp, UserConfig } from './interface'
import { setBasic } from './setBasic'
import { setModule } from './setModule'
import { setResolve } from './setResolve'
import { setPlugins } from './setPlugins'
import { setOptimization } from './setOptimization'

type SetConfigHelpBack = (getPartConfig: SetConfigHelp) => Configuration

export const configHelp: (userConfig: UserConfig) => SetConfigHelpBack =
  userConfig => (help: SetConfigHelp) => {
    if (userConfig.env === 'development') {
      return help.development(userConfig)
    }
    return help.production(userConfig)
  }

export const getConfig: GetConfig = params => {
  const config = configHelp(params)

  return {
    ...config(setBasic()),
    ...config(setModule()),
    ...config(setResolve()),
    ...config(setPlugins()),
    ...config(setOptimization()),
  }
}
