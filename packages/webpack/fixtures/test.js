const webpack = require('webpack')
const path = require('path')
const { getConfig } = require('../lib/build/getConfig')

const entry = path.join(__dirname, './src/index.js')

const config = getConfig({
  entry,
  env: 'development',
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
