const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const { getConfig } = require('../lib/build/getConfig')

const entry = path.join(__dirname, './src/index.js')

const testDev = async () => {
  console.log('Start test in development')
  const config = getConfig({
    entry,
    env: 'production',
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
  const config = getConfig({
    entry,
    env: 'production',
  })

  const compiler = webpack(config)

  compiler.run((err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }

    compiler.close(closeErr => {
      console.log(`closeErr`, closeErr)
    })
  })
  console.log('Production test success!')
}

const main = async () => {
  await testDev()
  testProd()
}

main()
