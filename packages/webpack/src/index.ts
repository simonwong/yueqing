#!/usr/bin/env node
import { Command } from 'commander'
import webpack from 'webpack'
import path from 'path'
import fs from 'fs'
import WebpackDevServer from 'webpack-dev-server'
import chalk from 'chalk'
import { getPkg } from './utils'

import { getConfig } from './build/getConfig'
import { workPath } from './build/base'

const pkg = getPkg()

function getLocalConfig() {
  const yueqingConfigPath = path.join(workPath, 'yueqing.config.js')
  if (fs.existsSync(yueqingConfigPath)) {
    try {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const localConfig = require(yueqingConfigPath)
      return localConfig
    } catch (e) {
      console.log(chalk.red((e as Error).stack))
    }
  }
  return {}
}

const cliVersion = `yq-webpack@${pkg.version}:`

export const developmentBuildWithDevServer = async () => {
  const PORT = 8080
  const localConfig = getLocalConfig()

  console.log(`\nStarting development server...\n`)

  process.env.NODE_ENV = 'development'
  const config = getConfig({ env: 'development', ...localConfig })

  let compiler
  try {
    compiler = webpack(config)
  } catch (e) {
    console.log(chalk.red((e as Error).stack))
  }
  if (!compiler) {
    return
  }

  const devServerOptions: WebpackDevServer.Configuration = {
    ...config.devServer,
    port: PORT,
  }
  const server = new WebpackDevServer(devServerOptions, compiler)
  await server.start()
  console.log(
    `\n${cliVersion} Starting server on ${chalk.cyan(
      `http://localhost:${PORT}`,
    )}\n`,
  )
}

export const productionBuild = () => {
  const localConfig = getLocalConfig()
  process.env.NODE_ENV = 'production'
  const config = getConfig({ env: 'production', ...localConfig })
  webpack(config, (err: any, stats) => {
    if (err) {
      console.log(chalk.red(err.stack || err))
      if (err.details) {
        console.log(chalk.red(err.details))
      }
      process.exit(1)
    }
    const info = stats?.toJson()
    if (stats?.hasErrors()) {
      info?.errors?.forEach(error => {
        console.log(chalk.red(error.message))
      })
      process.exit(1)
    }
    if (stats?.hasWarnings()) {
      info?.warnings?.forEach(warn => {
        console.log(chalk.yellow(warn.message))
      })
    }

    console.log(`\n${cliVersion} ${chalk.cyan('🌈 Build successfully!')}\n`)
  })
}

function init() {
  const program = new Command()
  program.version(pkg.version)

  program
    .command('start')
    .description('Run your app on development environment')
    .action(() => {
      developmentBuildWithDevServer()
    })

  program
    .command('build')
    .description('Build your app')
    .action(() => {
      productionBuild()
    })

  program.parse(process.argv)

  return program
}

init()
