# webpack

Webpack 是一个模块打包器。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

### Webpack 的特点

Webpack 和其他模块化工具有什么区别呢？

### 代码拆分

Webpack 有两种组织模块依赖的方式，同步和异步。异步依赖作为分割点，形成一个新的块。在优化了依赖树后，每一个异步区块都作为一个文件被打包。

### Loader

Webpack 本身只能处理原生的 JavaScript 模块，但是 loader 转换器可以将各种类型的资源转换成 JavaScript 模块。这样，任何资源都可以成为 Webpack 可以处理的模块。

### 智能解析

Webpack 有一个智能解析器，几乎可以处理任何第三方库，无论它们的模块形式是 CommonJS、 AMD 还是普通的 JS 文件。甚至在加载依赖的时候，允许使用动态表达式 `require("./templates/" + name + ".jade")`。

### 插件系统

Webpack 还有一个功能丰富的插件系统。大多数内容功能都是基于这个插件系统运行的，还可以开发和使用开源的 Webpack 插件，来满足各式各样的需求。

### 快速运行

Webpack 使用异步 I/O 和多级缓存提高运行效率，这使得 Webpack 能够以令人难以置信的速度快速增量编译。

### 安装

```
# 进入项目目录
# 确定已经有 package.json，没有就通过 npm init 创建
# 安装 webpack 依赖
$ npm install webpack --save-dev
```

## 使用

1：简单应用

```
$ webpack A.js B.js
```

最简单的将A文件打包到B文件

2：接下来添加一个模块 `module.js` 并修改入口 `entry.js`：

```
// module.js
module.exports = 'It works from module.js.'

// entry.js
document.write('It works.')
document.write(require('./module.js')) // 添加模块

```

重新打包 `webpack entry.js bundle.js` 后刷新页面看到变化 `It works.It works from module.js.`

> 可以使用require引入其他模块，module.exports暴露模块；使用方法和CommonJs类似
>
> 在页面启动时，会先执行 entry.js 中的代码，其它模块会在运行 `require` 的时候再执行。
>

`这里是同步加载还是异步加载？？？？？`

## loader

Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

Loader 可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过 `require` 来加载任何类型的模块或文件，比如 CoffeeScript、 JSX、 LESS 或图片。

Loader 可以在 `require()` 引用模块的时候添加，也可以在 webpack 全局配置中进行绑定，还可以通过命令行的方式使用。



> 第一：`require()`引用模块时添加
>
> ```
> require("!style-loader!css-loader!./style.css")
> ```
>
> 第二：通过命令行使用
>
> 如果每次 `require` CSS 文件的时候都要写 loader 前缀，是一件很繁琐的事情。我们可以根据模块类型（扩展名）来自动绑定需要的 loader。
>
> 将 entry.js 中的 `require("!style!css!./style.css")` 修改为 `require("./style.css")` ，然后执行：
>
> ```
> $ webpack entry.js bundle.js --module-bind 'css=style-loader!css-loader'
>
> # 有些环境下可能需要使用双引号
> $ webpack entry.js bundle.js --module-bind "css=style-loader!css-loader"
> ```
>
> `本人使用win10系统需要使用双引号`
>
> 第三：在 webpack 全局配置中进行绑定
>
> ```
> var webpack = require('webpack')
>
> module.exports = {
>   entry: './entry.js',
>   output: {
>     path: __dirname,
>     filename: 'bundle.js'
>   },
>   module: {
>     loaders: [
>       {test: /\.css$/, loader: 'style-loader!css-loader'}
>     ]
>   },
>   plugins: [
>     new webpack.BannerPlugin('This file is created by stupid') // 给输出的文件头部添加注释信息
>   ]
> }
> ```

## 配置文件

Webpack 在执行的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。默认情况下，会搜索当前目录的 `webpack.config.js` 文件，这个文件是一个 node.js 模块，返回一个 json 格式的配置信息对象，或者通过 `--config` 选项来指定配置文件。

## 插件-plugins

插件可以完成更多 loader 不能完成的功能。

插件的使用一般是在 webpack 的配置信息 `plugins` 选项中指定。

Webpack 本身内置了一些常用的插件，还可以通过 npm 安装第三方插件。


