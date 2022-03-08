import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import { UserConfig, NodeEnv, ConfigContext } from './interface'

const pkgPath = path.join(__dirname, '../package.json')

export const getPkg = () => {
  const res = fs.readFileSync(pkgPath, { encoding: 'utf-8' })
  return JSON.parse(res)
}

export const workPath = process.cwd()

export const resolveApp = (relativePath: string) =>
  path.resolve(relativePath, relativePath)

export const PATHS = {
  build: workPath,
  public: resolveApp('public'),
  src: resolveApp('src'),
  dist: resolveApp('dist'),
  configFile: resolveApp('yueqing.config.js'),
  appTsConfig: resolveApp('tsconfig.json'),
} as const

// 用户配置文件
export const getLocalConfig: () => UserConfig = () => {
  if (fs.existsSync(PATHS.configFile)) {
    try {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const localConfig = require(PATHS.configFile)
      return localConfig
    } catch (e) {
      if (e instanceof Error) {
        console.log(chalk.red(e.stack))
      }
    }
  }
  return {}
}

export const getContext: () => ConfigContext = () => {
  const nodeEnv = process.env.NODE_ENV as NodeEnv

  if (!nodeEnv) {
    throw new Error(
      'The NODE_ENV environment variable is required but was not specified.',
    )
  }

  const useTypescript = fs.existsSync(PATHS.appTsConfig)

  return {
    nodeEnv,
    useTypescript,
    isDevelopmentEnv: nodeEnv === 'development',
    isProductionEnv: nodeEnv === 'production',
    userConfig: getLocalConfig(),
  }
}
