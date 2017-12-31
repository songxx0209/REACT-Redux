const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin'); // 用于生成html文件
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: './app/index.tsx',
  output: {
    // path: 'dist',  // 这个是错误的写法，感觉只有下面写法才能运行，有时间研究一下为什么？
    // 这里path 必须是一个 相对于电脑的绝对路径
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  // webpack-dev-server 的配置
  devServer: {
    historyApiFallback: true,
    inline: true,
  },

  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'app'),
    ],
    extensions: ['.js', '.json', '.jsx', '.css', '.ts', '.tsx'],
    alias: {
      actions: path.join(__dirname, '/app/actions'),
    },
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.js[x]?$/, // Match both .js and .jsx files
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:
          {
            presets: ['es2015', 'stage-0', 'react'],
            plugins: [
              ['transform-runtime'],
              ['import', { libraryName: 'antd', style: 'css' }], // `style: true` 会加载 less 文件
              ['transform-decorators-legacy'],
            ],
          },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
        include: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true, // 启动 css module
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              noIeCompat: true,
              paths: [
                path.resolve(__dirname, 'node_modules'),
              ],
            },
          },
        ],
      },
    ],
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },

  plugins: [
    new HtmlwebpackPlugin({
      template: 'template/index.html', // 模版地址
      title: "songxx's blog",
      inject: 'body', // js插入到body中
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8000',
    }),
  ],
};
