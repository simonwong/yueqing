const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const { getConfig } = require('../lib/build/getConfig')

const entry = path.join(__dirname, './src/index.jsx')

const testDev = async () => {
  console.log('Start test in development')
  process.env.NODE_ENV = 'development'
  const config = getConfig({
    userConfig: {
      entry,
    },
    nodeEnv: 'development',
    isDevelopmentEnv: true,
    isProductionEnv: false,
  })

  const compiler = webpack(config)

  const server = new WebpackDevServer(
    {
      ...config.devServer,
      port: 3009,
    },
    compiler,
  )
  await server.start()
  await server.stop()
  console.log('Development test success!')
}

const testProd = () => {
  console.log('Start test in production')
  process.env.NODE_ENV = 'production'
  const config = getConfig({
    userConfig: {
      entry,
    },
    nodeEnv: 'production',
    isDevelopmentEnv: false,
    isProductionEnv: true,
  })

  const compiler = webpack(config)

  compiler.run((err, stats) => {
    if (err) {
      console.error('compiler.run', err.stack || err)
      if (err.details) {
        console.error('compiler.run', err.details)
      }
      process.exit(1)
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error('compiler#stats Errors', info.errors)
      process.exit(1)
    }

    if (stats.hasWarnings()) {
      console.warn('compiler#stats Warnings', info.warnings)
      process.exit(1)
    }

    compiler.close(closeErr => {
      if (closeErr) {
        console.log(`compiler.close`, closeErr)
      } else {
        console.log('Production test success!')
      }
    })
  })
}

const main = async () => {
  await testDev()
  testProd()
}

main()
