# CommonJS 规范

1：CommonJS 是以在浏览器环境之外构建 JavaScript 生态系统为目标而产生的项目，比如在服务器和桌面环境中。

2：2013年5月，Node.js 的包管理器 NPM 的作者 Isaac Z. Schlueter 说 [CommonJS 已经过时，Node.js 的内核开发者已经废弃了该规范](https://github.com/nodejs/node-v0.x-archive/issues/5132#issuecomment-15432598)。

3：CommonJS 规范是为了解决 JavaScript 的作用域问题而定义的模块形式，可以使每个模块它自身的命名空间中执行。

4：CommonJS 是同步加载模块，服务端nodejs使用，每个js文件就相当于是一个闭包（或块级作用域），除非是使用golbal。

# AMD 规范

1：AMD（异步模块定义）是为浏览器环境设计的

# react

1：props在组件中是不变的，改变它的唯一方法是dispatch事件

2：jsx语法，是将html语法封装到js中。

3：虚拟DOM（virtual DOM）:

---当组件状态 `state` 有更改的时候，React 会自动调用组件的 `render` 方法重新渲染整个组件的 UI。

---虚拟DOM就是真实DOM的映射;

---Virtual DOM 上实现了一个 diff 算法，当要重新渲染组件的时候，会通过 diff 寻找到要变更的 DOM 节点，再把这个修改更新到浏览器实际的 DOM 节点上，所以实际上不是真的渲染整个 DOM 树。这个 Virtual DOM 是一个纯粹的 JS 数据结构，所以性能会比原生 DOM 快很多。

4：Data flow --单向数据绑定

5：React 的核心思想是：封装组件。

-----------------------------------------------------------------------------------------------------------

--ReactDOM.render返回组件的引用也就是组件的实例, jsx返回的是一种js数据结构.

--当组件加载到页面上之后（mounted），你都可以通过 `react-dom` 提供的 `findDOMNode()` 方法拿到组件对应的 DOM 元素。



