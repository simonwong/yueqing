# @yueqing/webpack

@yueqing/webpack is a webpack cli, out-of-box.

一个 webpack 打包工具，开箱即用

## Usage

**Install**

```shell
yarn add @yueqing/webpack -D

# or

npm install @yueqing/webpack -D
```

**Development**

```shell
yq-webpack start
```

**Build**

```shell
yq-webpack build
```

## Custom Config

Add `yueqing.config.js` at your project root.

```js
module.exports = {
  //.. config
}
```

### [alias](https://webpack.js.org/configuration/resolve/#resolvealias)

**Default**

```js
{
  '@': path.join(process.env.PWD, './src'),
  'react-dom': '@hot-loader/react-dom',
}
```
