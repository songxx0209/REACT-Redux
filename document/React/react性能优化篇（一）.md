## react性能优化篇（一）：pureComponent、pureRender

`React15.3` 中新加了一个类[PureComponent](https://facebook.github.io/react/docs/react-api.html#react.purecomponent)，前身是 `PureRenderMixin`

pureComponent会在render之前帮组件自动执行一次shallowEqual（浅比较）;

如果数据是一个深层次的数据；浅比较是无法满足需要的，所以需要使用到Immutable.js



### pureComponent

React.PureComponent 与 React.Component 几乎完全相同，但 React.PureComponent 通过prop和state的浅对比来实现 shouldComponentUpate()。

如果React组件的 render() 函数在给定相同的props和state下渲染为相同的结果，**在某些场景下（不是所有通用）**你可以使用 React.PureComponent 来提升性能。

React.PureComponent 的 shouldComponentUpdate() 只会对**对象进行浅对比**。如果对象包含复杂的数据结构，它可能会因深层的数据不一致而产生错误的否定判断(表现为对象深层的数据已改变视图却没有更新, 原文：false-negatives)。当你期望只拥有简单的props和state时，才去继承 PureComponent ，或者在你知道深层的数据结构已经发生改变时使用 forceUpate() 。或者，考虑使用 不可变对象 来促进嵌套数据的快速比较。

```
class Login extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      count: 0,
    }
  }
  render() {
      return (
      	<div>hello world!</div>
      )
  }
}
```





**immutable.js**

Immutable.js 的基本原则是对于不变的对象返回相同的引用，而对于变化的对象，返回新的引用；

- 优点：

  > 降低了mutable带来的复杂度
  >
  > 简化了变化的追踪
  >
  > 节省内存
  >
  > 提升性能

- 缺点：

  > 学习新的api
  >
  > 增加了资源文件的大小





#### 参考资源

[高性能React组件](http://taobaofed.org/blog/2016/08/12/optimized-react-components/)

[segmentfault-React性能优化(一)](https://segmentfault.com/a/1190000011408775)

[gitbub-immutable详解](https://github.com/camsong/blog/issues/3)







