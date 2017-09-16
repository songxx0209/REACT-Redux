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
// 这种就叫绝对路径

／dist
这个为什么不是绝对路径？？？
这个的意思是在 根目录 ／  中创建一个 dist目录；   这个问题可以想想linux的目录结构， 操作／目录是需要权限的，可以设置 chmod 来打开权限，但是这不是我们想要的。
```



[浅谈node路径](https://github.com/imsobear/blog/issues/48)

**WHY???**

### react+webpack项目搭建

- ```

  ```

- ```

  ```

- 完成基本的配置，下一步配置 路由 router，配置redux

- Html-webpack-plugin 插件的使用

  - [插件使用方法讲解一博客园](http://www.cnblogs.com/haogj/p/5160821.html)
  - [讲解二](https://segmentfault.com/a/1190000007294861)

- 引入外部less文件， 用classname加载css样式， 结果不显示：

  - 结果是没有启动 css modules

  - ```
    {
      loader: 'css-loader',
      options: {
        modules: true,  // 这句启动css modules
        importLoaders: 1
      }
    },
    ```

  - 什么是 css modules？

    - CSS的规则都是全局的，任何一个组件的样式规则，都对整个页面有效。

    - 而css modules可以设置 局部变量（通过将css名编译成一个唯一的值：如、_3zyde4l1yATCOkgn-DBWEL）；

    - CSS Modules 允许使用`:global(.className)`的语法，声明一个全局规则。凡是这样声明的`class`，都不会被编译成哈希字符串。

      ```
      .title {
        color: red;
      }

      :global(.title) {
        color: green;
      }

      // 调用时 不需要加{}
      <h1 className="title">hello world<h1>
      ```

    - [阮哥css modules教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)



- 项目中添加redux的配置

  - ```
    "babel": "^6.23.0",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-es2015": "^6.24.1", // 转换es6 为 es5
    "babel-preset-react": "^6.24.1", // 允许使用react语法 和 jsx
    "babel-preset-stage-0": "^6.24.1", // babel-preset 系列打包了一组插件，类似于餐厅的套餐
    --------------------------------
    "react-redux": "^5.0.6",
    "redux": "^3.7.2",
    "redux-logger": "^3.0.6",
    "redux-promise-middleware": "^4.4.1",
    "redux-thunk": "^2.2.0",
    ```

  - ## preset

    想要理解preset中的`stage`，那么你就需要阅读[TC39](https://tc39.github.io/process-document/)。TC39是专门负责演进ECMAScript编程语言以及认证其规格的委员会。他们将ECMAScript中的每一个新特性的最终定稿分为了5个阶段，也就是大家看到的：

    - stage-0 - Strawman: just an idea, possible Babel plugin.
    - stage-1 - Proposal: this is worth working on.
    - stage-2 - Draft: initial spec.
    - stage-3 - Candidate: complete spec and initial browser implementations.
    - stage-4 - Finished: will be added to the next yearly release.

    那么我们如何判断我们需要使用的stage是哪一个呢？

    在TC39的提案中，有对应的一个详细的列表表明哪种特性处于哪个阶段：[https://github.com/tc39/proposals](https://github.com/tc39/proposals)  。 如果你想要用到对应的特性，查找其处于的阶段即可。

    Babel是会根据每一次TC39的会议更改的特性实时地改变自己的代码实现，这一点做的相当给力。一般我们不建议使用stage-0，因为该阶段的特性是最不稳定的，极有可能在未来中不会集成到任何的JS版本中去。

    **注意：stage预置条件是会后向兼容的，也就是说stage-0的预置条件是会包含stage-1、stage-2、stage-3等预置条件的**

  - React-redux.    connect方法

    - mapStateToProps 没有什么问题

    - mapDispatchToProps 不使用插件怎么将 dispatch 传递到props中去

      - ```
        方法一：
        import { dispatch } from 'redux';

        this.props.dispatch(getdata()); // getdata为action方法

        方法二：
        import { test } from '../actions/testAction';

        const mapDispatchToProps =  ({
          test,
        });

        方法三：  这个方法没有成功，有点问题，研究一下
        function mapDispatchToProps(dispatch) {
          return {};
        }
        ```

      - ​

  - 关于渲染的问题，render方法的执行？

    >1：使用redux
    >
    >当通过dispatch改变 store时， 数据改变，页面也会进行相应的渲染。那么渲染的方式是怎样的呢？
    >
    >从上往下，找到第一个使用connect方法获取数据的页面，它和它的所有字页面 - 都会渲染（render）
    >
    >2：使用state
    >
    >原来的理解是，当前页面使用了setState方法， 其后的所有子页面都会跟着刷新
    >
    >但是好像并不是这样，只有传递了state到子页面，子页面才会刷新；
    >
    >使用state，如果不传递到子组件，子组件是不会render的。

    ​

- react redux 异步相关实践

  - 首先选定 一款异步请求框架

    ```
    import promise from 'redux-promise-middleware';
    此插件，使action中 发出的请求， 会有三种状态
    PENDING
    FULFILLED
    REJECTED
    ```

  - 尝试使用 async await，报错

    ##### regeneratorRuntime is not defined.

    ```
    I'm trying to use async, await from scratch on Babel 6, but I'm getting regeneratorRuntime is not defined.
    ```

    `babel-polyfill` is required. You must also install it in order to get async/await working.

    `babel-polyfill`是可以的，但是这玩意儿太大了
    现在6.0版本的babel改成了插件的形式，现在推荐的是`transform-runtime`

    `babel-polyfill`是一股脑把全部都给你添加到js文件中，而现在的`transform-runtime`将会判断你哪些需要加载的，有选择性的进行加载，并且后者也不会污染全局变量。

    **babel-polyfill**    **transform-runtime**  

  - Babel-polyfill

    Babel 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill.

  - babel-plugin-transform-runtime，babel-runtime [链接地址](https://github.com/lmk123/blog/issues/45)

    ```
    {
      "plugins": [
        ["transform-runtime", {
          "helpers": false,
          "polyfill": false,
          "regenerator": true,
          "moduleName": "babel-runtime"
        }]
      ]
    }
    ```

  - #### redux-promise-middleware ， redux-promise 不是同一个东西

    > 此中间件的功能， 应该是把一个promise对象转换为 json对象，同时为请求

  - 个人感觉的action 最佳实践

    ```
    export let getData = () => {
      return  async (dispatch) => {
        let ss = await request.get('http://120.77.33.107:8000/web/get_datas/');
        dispatch({
          type: 'GET_DATA',
          payload: ss,
        });
      };
    }
    ```

    ​





2：运行一个js文件

```
node index.js
```



3：学习一个新东西， 首先要找到好的学习资料，这是至关重要的。当然能很好的学习官网资料更好，这也是后期的目标（成神之路，必经）

- 这个东西到底是啥子？
- 它是干什么用的？
- 它的一系列生态圈是啥子？
- 多写总结（认真编写，让初学者也能懂的，给不通档次的人看的），温故而知新。
- ​


- 首先，要学习API，怎么使用； 
- 其次，学习整个框架流程、怎么运行（过程），例如redux运行的整个流程； 
- 最后，学习的是一种思想，开发者开发过程的思想，可以看看源码；



4：常见js错误

- **Module build failed: SyntaxError: Unexpected token (12:10)**

5：记录-杂

**组件在初始化时会触发5个钩子函数：**

**1、getDefaultProps()**

> 设置默认的props，也可以用dufaultProps设置组件的默认属性。

**2、getInitialState()**

> 在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以访问this.props。

**3、componentWillMount()**

> 组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。

**4、 render()**

> react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。

**5、componentDidMount()**

> 组件渲染之后调用，可以通过this.getDOMNode()获取和操作dom节点，只调用一次。

**在更新时也会触发5个钩子函数：**

**6、componentWillReceivePorps(nextProps)**

> 组件初始化时不调用，组件接受新的props时调用。

**7、shouldComponentUpdate(nextProps, nextState)**

> react性能优化非常重要的一环。组件接受新的state或者props时调用，我们可以设置在此对比前后两个props和state是否相同，如果相同则返回false阻止更新，因为相同的属性状态一定会生成相同的dom树，这样就不需要创造新的dom树和旧的dom树进行diff算法对比，节省大量性能，尤其是在dom结构复杂的时候。不过调用this.forceUpdate会跳过此步骤。

**8、componentWillUpdata(nextProps, nextState)**

> 组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state

**9、render()**

> 不多说

**10、componentDidUpdate()**

> 组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。

还有一个卸载钩子函数

**11、componentWillUnmount()**

> 组件将要卸载时调用，一些事件监听和定时器需要在此时清除。
>
> **这个问题我就实实在在的遇到了**

以上可以看出来react总共有10个周期函数（render重复一次），这个10个函数可以满足我们所有对组件操作的需求，利用的好可以提高开发效率和组件性能。



7：分享，是思考。