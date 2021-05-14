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
      // eslint-disable-next-line no-empty
    } catch (e) {
      console.log(chalk.red(e.stack))
    }
  }
  return {}
}

function init() {
  const program = new Command()
  program.version(pkg.version)

  const PORT = 8080

  const localConfig = getLocalConfig()

  program
    .command('start')
    .description('Run your app on development environment')
    .action(() => {
      console.log(`\nStarting development server...\n`)
      const config = getConfig({ env: 'development', ...localConfig })

      let compiler
      try {
        compiler = webpack(config)
      } catch (e) {
        console.log(chalk.red(e.stack))
      }
      if (!compiler) {
        return
      }

      const devServerOptions = { ...config.devServer }
      const server = new WebpackDevServer(compiler, devServerOptions)
      const httpServer = server.listen(PORT, '127.0.0.1', () => {
        console.log(
          `\nStarting server on ${chalk.cyan(`http://localhost:${PORT}`)}\n`,
        )
      })

      httpServer.on('error', () => {
        server.close()
        console.log(`\n${chalk.red('Development server error')}`)
      })
    })

  program
    .command('build')
    .description('Build your app')
    .action(() => {
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

        console.log(`\n${chalk.cyan('🌈 Build successfully!')}\n`)
      })
    })

  program.parse(process.argv)

  return program
}

init()
