#!/usr/bin/env node
import { Command } from 'commander'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import chalk from 'chalk'
import { getPkg } from './utils'

import devConfig from './build/development'
import prodConfig from './build/production'

const pkg = getPkg()

function init() {
  const program = new Command()
  program.version(pkg.version)

  const PORT = 8080

  program
    .command('start')
    .description('Run your app on development environment')
    .action(() => {
      console.log(`\nStarting development server...\n`)
      const compiler = webpack(devConfig)
      const devServerOptions = { ...devConfig.devServer }
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
      webpack(prodConfig, (err, stats) => {
        if (err || stats?.hasErrors()) {
          console.log(chalk.red(err))
          stats?.toJson().errors?.forEach(error => {
            console.log(chalk.red(error.message))
          })
          process.exit(1)
        }
        if (stats?.hasWarnings && stats?.toJson().warnings) {
          stats?.toJson().warnings?.forEach(warn => {
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
