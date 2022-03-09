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

## CLI command

### `yq-webpack`

- --version, -V  get yq-webpack version

### `yq-webpack start`

--

### `yq-webpack build`

--

## Custom Config

Add `yueqing.config.js` at your project root.

```js
module.exports = {
  //.. config
}
```

### [target](https://webpack.js.org/configuration/target/#target)

**Default**

```js
'web'
```

### [entry](https://webpack.js.org/configuration/entry-context/#entry)

**Default**

```js
path.join(__dirname, './template.ejs')
```

### [alias](https://webpack.js.org/configuration/resolve/#resolvealias)

**Default**

```js
{
  '@': path.join(process.env.PWD, './src'),
}
```

### [htmlWebpack](https://github.com/jantimon/html-webpack-plugin#options)

**Default**

```js
{
  title: 'YueQing',
  inject: 'body',
  meta: {
    charset: 'UTF-8',
    viewport: 'width=device-width, initial-scale=1.0',
  },
  template: path.join(__dirname, './template.ejs'),
}
```
