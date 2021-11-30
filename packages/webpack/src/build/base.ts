import path from 'path'

// TODO: remove process.env.PWD
export const workPath = process.env.PWD || process.cwd()

export const PATHS = {
  build: workPath,
  public: path.join(workPath, './public'),
  src: path.join(workPath, './src'),
  dist: path.join(workPath, './dist'),
} as const
