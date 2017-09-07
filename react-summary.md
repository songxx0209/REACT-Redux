# react 再学习

### 1：webpack之屎 -  version ^3.5.5

#### 运行webpack的方式：

- 只在项目中安装webpack（不是全局安装）

  ```
  // package.js 文件

  "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "webpack": "./node_modules/webpack/bin/webpack.js",
      "start": "webpack"
    },
    
  // 然后在终端运行
  // 方法一
  npm run webpack index.js ss.js

  // 方法二
  npm start index.js ss.js
  ```

  ​


- 在全局安装webpack，npm i webpack -g

  ```
  // 这样可以直接在命令行执行 webpack命令；而且项目中不用安装webpack，但是一般不这样使用；

  webpack index.js ss.js
  ```



#### webpack 配置 webpack.config.js

```
ar webpack = require('webpack');

module.exports = {
  entry: './app/index.js',
  output: {
    path: './dist',
    filename: 'main.js'
  }
};
```

运行 npm start:

报错：

```
Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
 - configuration.output.path: The provided value "dist" is not an absolute path!
```

大概意思是说，output.path.  不是一个绝对路径；

修改为：

```
output: {
    path: '/dist',
    filename: 'main.js'
  }
```

**然后再运行 npm start**

报错：

```
Error: EACCES: permission denied, mkdir '/dist'
```

google查找原因：

没找到合适的答案。

最后改成这样，就好了。😯

```
output: {
  // path: '/dist',    // error wrong
  path: path.join(__dirname, 'dist'), // right 
  filename: 'main.js'
}
```

官网讲解-例子：

output 目录对应一个**绝对路径**。

```
path: path.resolve(__dirname, 'dist/assets')
```

什么是绝对路径：

```
/Users/guo/Sites/learn/app/model 
// 这种就叫绝对路径吧

／dist
这个为什么不是绝对路径
```



[浅谈node路径](https://github.com/imsobear/blog/issues/48)

**WHY???**

### react+webpack项目搭建

- ```
  {
    "name": "song-rr",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "webpack": "./node_modules/webpack/bin/webpack.js",
      // 这里不能加 -hot
      "start": "webpack-dev-server --content-base dist --inline",
      "build": "webpack"
    },
    "author": "songxx",
    "license": "ISC",
    "devDependencies": {
      "babel": "^6.23.0",
      "babel-core": "^6.26.0",
      "babel-loader": "^7.1.2",
      "babel-preset-es2015": "^6.24.1",
      "babel-preset-react": "^6.24.1",
      "css-loader": "^0.28.7",
      "less-loader": "^4.0.5",
      "style-loader": "^0.18.2",
      "webpack": "^3.5.5",
      "webpack-dev-server": "^2.7.1"
    },
    "dependencies": {
      "react": "^15.6.1",
      "react-dom": "^15.6.1"
    }
  }
  ```

- ```
  var webpack = require('webpack');
  const path = require('path');

  module.exports = {
    entry: './app/index.js',
    output: {
      // path: 'dist',  // 这个是错误的写法，感觉只有下面写法才能运行，有时间研究一下为什么？
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
    },
    
    // 为热加载 webpack-dev-server 配置的
    devServer: {
      historyApiFallback: true,
      inline: true,
    },
    
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          options: {
            presets: ["es2015", "react"]
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
          ]
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            {
              loader: 'less-loader',
              options: {
                noIeCompat: true
              }
            }
          ]
        },
      ]
      
    },
    plugins: [

    ],
  };
  ```

- 完成基本的配置，下一步配置 路由 router，配置redux

- ​

2：运行一个js文件

```
node index.js
```



