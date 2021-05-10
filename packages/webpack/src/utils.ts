import fs from 'fs'
import path from 'path'

const pkgPath = path.join(__dirname, '../package.json')

// eslint-disable-next-line consistent-return
export const getPkg = () => {
  try {
    const res = fs.readFileSync(pkgPath, { encoding: 'utf-8' })
    return JSON.parse(res)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  }
}
