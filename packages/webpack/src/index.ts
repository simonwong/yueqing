#!/usr/bin/env node
import { Command } from 'commander'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { getPkg } from './utils'

import devConfig from './build/development'
import prodConfig from './build/production'

const pkg = getPkg()

function init() {
  const program = new Command()
  program.version(pkg.version)

  program
    .command('start')
    .description('Run your app on development environment')
    .action(() => {
      const compiler = webpack(devConfig)
      const devServerOptions = { ...devConfig.devServer }
      const server = new WebpackDevServer(compiler, devServerOptions)
      server.listen(8080, '127.0.0.1', () => {
        console.log('Starting server on http://localhost:8080')
      })
    })

  program
    .command('build')
    .description('Build your app')
    .action(() => {
      webpack(prodConfig, (err, stats) => {
        if (err || stats?.hasErrors()) {
          console.error(err)
          process.exit(1)
        }
        if (stats?.hasWarnings && stats?.toJson().warnings) {
          stats?.toJson().warnings?.forEach(warn => {
            console.warn(warn.message)
          })
        }
        console.log('🌈 Build Success !')
      })
    })

  program.parse(process.argv)

  return program
}

init()
