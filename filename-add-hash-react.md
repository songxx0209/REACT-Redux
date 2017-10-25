# 优化方案之缓存 - react

#### 今天对react项目使用了缓存方式的优化

> 说到缓存方式的优化， 主要是使用覆盖式 部署的方式，使用强制缓存的机制，通过修改文件名来更新资源；
>
> 下面就来看看具体在react中的实现



#### 通过webpack打包，每当修改了react内容打包出来的文件就会取一个不同的名字，以达到覆盖式发布的目的；

1:修改了项目内容，生成名字不同的文件

例如：

```
lib-2ad4d34dss9sdc9d.js、lib-4m339csc9c9s9f0s8f7.js
类似于这样的名字；中间是一个hash值
```

但是这样取名会有一个问题，就是当我们长时间使用这种方式时，你会发现：最终会有很多lib.js 文件，我们发布一次版本就会多出一个lib.js文件出来；

后面发现有一种更好的方式，例如：

```
lib.js?2ad4d34dss9sdc9d、lib.js?4m339csc9c9s9f0s8f7
```

在打包时我们生成文件的名字还是 lib.js； 但是我们在程序中同样 会生成一个 hash值； 并且将lib.js引入到html文件中时会自动给 它加上  *lib.js?{hash}*;

#### 来看一下具体代码：

webpack配置：

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// add-asset-html-webpack-plugin 将非打包出来的文件， 引入到 最终生成的 html文件中，并添加hash值

module.exports = {
  ...
  ...
   plugins: [
    new AddAssetHtmlPlugin({
      filepath: require.resolve('./dist/lib'),
      includeSourcemap: false,
      hash: true
    }),
    new HtmlWebpackPlugin({
      title: '云平台',
      filename: path.join(__dirname, 'dist/index.html'),
      template: path.join(__dirname, 'client/index.html'),
      hash: true,
    }),
  ],
}
```

