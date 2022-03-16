/* eslint-disable global-require */
import path from 'path'

const main = (/* api: any  , opts = {} */) => ({
  presets: [
    [
      require('@babel/preset-env').default,
      {
        // 允许在入口点中导入 core.js ，并使用 browserlist 选择 polyfills
        useBuiltIns: 'entry',
        corejs: 3,
        exclude: ['transform-typeof-symbol'],
      },
    ],
    require('@babel/preset-typescript').default,
    [
      require('@babel/preset-react').default,
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    [
      require('@babel/plugin-transform-runtime').default,
      {
        helpers: true,
        corejs: false,
        version: require('@babel/runtime/package.json').version,
        regenerator: true,
        // 预先解析 @babel/runtime 的位置，避免 @babel/runtime 未安装在根依赖目录时找不到
        absoluteRuntime: path.dirname(
          require.resolve('@babel/runtime/package.json'),
        ),
      },
    ],
    [
      // TC39 Proposals: 使用装饰器 @xxx，注意：默认是旧版本的提案
      require('@babel/plugin-proposal-decorators').default,
      false,
    ],
    [
      // ES2022: 类属性 class Foo { name = 'foo'; static getName = ... }
      require('@babel/plugin-proposal-class-properties').default,
      { loose: true },
    ],
    [
      // ES2022: 私有属性 class Foo { #name = 'foo'; getName = () => this.#name }
      require('@babel/plugin-proposal-private-property-in-object').default,
      { loose: true },
    ],
    [
      // TC39 Proposals: 私有方法
      require('@babel/plugin-proposal-private-methods').default,
      { loose: true },
    ],
  ].filter(Boolean),
})

export default main
