var webpack = require('webpack');
const path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin'); // 用于生成html文件

module.exports = {
  entry: './app/index.js',
  output: {
    // path: 'dist',  // 这个是错误的写法，感觉只有下面写法才能运行，有时间研究一下为什么？
    // 这里path 必须是一个 相对于电脑的绝对路径
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },

  // webpack-dev-server 的配置
  devServer: {
    historyApiFallback: true,
    inline: true,
  },

  module: {
    rules: [
      {
        test: /\.js[x]?$/,         // Match both .js and .jsx files
        exclude: /node_modules/, 
        loader: "babel-loader", 
        query:
          {
            presets: ["es2015", "stage-0", "react"],
            plugins: [
              ["transform-runtime", {  // babel 只能转换js语法，对一些自带的API不具备转换功能，需要此插件或polyfill进行转换
                "helpers": false,
                "polyfill": true,
                "regenerator": true,
                "moduleName": "babel-runtime"
              }],
              ["import", { libraryName: "antd", style: "css" }] // `style: true` 会加载 less 文件
            ]
          }
      },
      {
        test: /\.css$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
        ],
        include: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,  // 启动 css module
              importLoaders: 1,
            }
          },
          {
            loader: 'less-loader',
            options: {
              noIeCompat: true,
              paths: [
                path.resolve(__dirname, "node_modules")
              ]
            }
          }
        ]
      },
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'app')
    ],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: 'template/index.html', // 模版地址
      title: 'Hello World app',
      inject: 'body', // js插入到body中
    }),
  ],
};
