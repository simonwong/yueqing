import Config from 'webpack-chain'
import { GetConfig, setConfigHelp } from './base'
import { setBasic } from './setBasic'
import { setModule } from './setModule'
import { setResolve } from './setResolve'
import { setPlugins } from './setPlugins'
import { setOptimization } from './setOptimization'

export const getConfig: GetConfig = params => {
  const config = new Config()

  const setConfig = setConfigHelp(config, params)

  setConfig(setBasic())
  setConfig(setModule())
  setConfig(setResolve())
  setConfig(setPlugins())
  setConfig(setOptimization())

  return config.toConfig()
}
