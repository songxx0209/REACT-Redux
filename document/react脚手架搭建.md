---
Title: 搭建react脚手架
---



#搭建react脚手架

搭建一个通用的每个项目都必备的脚手架；（最原始的，可扩展的脚手架）

常用的npm包安装：

```
npm install react react-dom --save

//安装babel相关
npm install babel babel-loader babel-core babel-preset-es2015 babel-preset-react babel-preset-stage-0 --save

//安装webpack相关
npm install webpack webpack-dev-server --save-dev

//安装loader相关
npm install css-loader style-loader classnames --save

// 需要使用less
npm install less-loader less --save-dev
npm install extract-text-webpack-plugin --save-dev //提取出css文件，独立出javascript
npm install html-webpack-plugin --save-dev

// postcss自动添加兼容前缀
npm install postcss autoprefixer --save-dev
```

相关解释：

> 如果需要编译es6，我们需要设置presets包含`es2015`，也就是预先加载es6编译的模块。
>
> 如果需要编译jsx，我们需要设置presets包含`react`，也就是预先加载react编译的模块。
>
> 如果需要编译es7，我们需要设置presets包含`stage-0`，也就是预先加载es7编译的模块。

stage-0的功能范围最广大，包含stage-1, stage-2以及stage-3的所有功能，同时还另外支持如下两个功能插件：

- [transform-do-expressions](https://babeljs.io/docs/plugins/transform-do-expressions)
- [transform-function-bind](https://babeljs.io/docs/plugins/transform-function-bind/)



#### 安装Eslint相关包

```
npm install eslint eslint-loader --save-dev
```

**一般eslint检测使用babel检测**

```
npm i  babel-eslint --save
```

添加一个名为 `.eslintrc`的配置文件

```
{
  parser: "babel-eslint",
  "rules": {
  }
}
```

安装`eslint-plugin-react`来检测react代码：

```
npm install eslint-plugin-react --save-dev
```

```
// .eslintrc 配置
{
  parser: "babel-eslint",
  // 插件 eslint-plugin-react
  "plugins": [
    "react"
  ],
  // 检测规则
  "rules": {
    "max-len": [1, 120, 2, {ignoreComments: true}],
    "prop-types": [2]
  }
}
```

安装eslint-config-airbnb及它的相关依赖：

```
npm install eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y --save-dev
```

最终`.eslintrc`配置如下

```
{
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "commonjs": true
  },
  "parser": "babel-eslint",
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-no-bind": [2, {
      "allowBind": true
    }],
    "max-len": [1, 120, 2, { "ignoreComments": true }],
    "prop-types": 0
  },
  "extends": "airbnb"
}
```



#### 安装 Redux 相关的依赖：

- 首先需要安装redux

  ```
  npm install redux --save
  //
  // redux 向外提供了好几个方法
  export {
    createStore,
    combineReducers,
    bindActionCreators,
    applyMiddleware,
    compose
  }
  ```

- 安装 react-redux

  ```
  npm install react-redux --save

  // react-redux 向外提供的方法
  export {
    Provider,
    createProvider,
    connectAdvanced,
    connect
  }
  ```

- 辅助性包，redux-logger

  ```
  npm install redux-logger --save-dev
  ```

- 最后选择一个自己喜欢、适合项目的中间件

  目前常用的中间件有：

  本项目使用中间件：redux-thunk  redux-action-tools

  ```
  npm install redux-thunk --save // 中间件
  npm install redux-action-tools --save // 中间件

  npm install lodash --save // 数据处理辅助模块
  npm install axios --save // 异步请求模块
  ```

  `这里运行时遇到错误：`

  ```
  main.js Uncaught ReferenceError: regeneratorRuntime is not defined
  ```

  solve: 看来问题是应为使用了 async await，但是项目依赖不能转换；

  - `babel-polyfill` is required. You must also install it in order to get async/await working.

  - ```
    $ npm install --save-dev babel-plugin-transform-runtime
    $ npm install --save babel-runtime // 可以不下载，因为在其它地方已经引入了
    ```

  > 以上应该是两种解决方法，目前使用第二种方法 babel-plugin-transform-runtime

  ​

  #### 最后安装router4

  ```
  npm install react-router-dom --save
  ```

  ​



**理解一下这些包的作用：**

- babel-polyfill
- babel-plugin-transform-runtime