import path from 'path'

export const workPath = process.cwd()

export const PATHS = {
  build: workPath,
  public: path.join(workPath, './public'),
  src: path.join(workPath, './src'),
  dist: path.join(workPath, './dist'),
} as const
