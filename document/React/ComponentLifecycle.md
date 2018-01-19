# React组件生命周期小结

[React组件生命周期官方说明](https://facebook.github.io/react/docs/react-component.html)

`constructor(props)`

构造函数，在创建组件的时候调用一次。

`void componentWillMount()`

在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次。

`void componentDidMount()`

在组件第一次绘制之后调用,通知组件已经加载完成。这个时候，子主键也都挂载好了，其虚拟 DOM 已经构建完成，你可以在这个函数开始获取其中的元素或者子组件了,就可以和 JS 其他框架交互了，例如设置计时 setTimeout 或者 setInterval，或者发起网络请求。

`void componentWillReceiveProps(nextProps)`

props是父组件传递给子组件的。父组件发生render的时候子组件就会调用componentWillReceiveProps（不管props有没有更新，也不管父子组件之间有没有数据交换）。参数nextProps是即将被设置的属性，旧的属性还是可以通过 this.props 来获取。在这个回调函数里面，你可以根据属性的变化，通过调用 this.setState() 来更新你的组件状态，这里调用更新状态是安全的，并不会触发额外的 render() 调用。

`boolean shouldComponentUpdate(nextProps, nextState)`

当组件接收到新的属性和状态改变时调用。默认情况下，这个函数永远返回 true 用来保证数据变化的时候 UI 能够同步更新，返回false，componentWillUpdate(), render(), componentDidUpdate() 不会执行。 在大型项目中，你可以自己[重载这个函数](https://segmentfault.com/a/1190000004290333)，通过检查变化前后属性和状态，来决定 UI 是否需要更新，能有效提高应用性能。


`void componentWillUpdate(nextProps, nextState)`

如果组件状态或者属性改变，并且上面的 shouldComponentUpdate() 返回为 true 时调用。在这个函数里面，不能使用 this.setState 来修改状态。这个函数调用之后，就会把 nextProps 和 nextState 分别设置到 this.props 和 this.state 中。紧接着调用 render() 更新界面。

`void componentDidUpdate(prevProps, prevState)`

除了首次render之后调用componentDidMount()，其它render结束之后都是调用componentDidUpdate()来得到通知。因为到这里已经完成了属性和状态的更新了，此函数参数变成了 prevProps 和 prevState。这个地方也可以操作Dom，发网络请求。

`void componentWillUnmount()`

当组件要被从界面上卸载的时候调用，在这个函数中，可以做一些组件相关的清理工作，例如取消计时器、网络请求、componentDidMount()里面注册的事件需要在这里删除等。

![生命周期如下图](http://7rf9ir.com1.z0.glb.clouddn.com/3-3-component-lifecycle.jpg)

| 生命周期                   | 调用次数        | 能否使用 setSate()   |
| ------------------------- |:--------------:|:-------------------:|
| getDefaultProps           | 1              |否                   |
| getInitialState           | 1              |否                   |
| componentWillMount        | 1              |是                   |
| render                    | >=1            |否                   |
| componentDidMount         | 1              |是                   |
| componentWillReceiveProps | >=0            |是                   |
| shouldComponentUpdate     | >=0            |否                   |
| componentWillUpdate       | >=0            |否                   |
| componentDidUpdate        | >=0            |是                   |
| componentWillUnmount      | 1              |否                   |


# 在react中，触发render的场景

* 首次渲染Initial Render。

* 调用this.setState （并不是一次setState会触发一次render，React可能会合并操作，再一次性进行render）。

* 父组件发生更新（一般就是props发生改变，shouldComponentUpdate()返回true,即使props没有改变或者父子组件之间没有数据交换也会触发render）

* 调用this.forceUpdate （跳过shouldComponentUpdate函数）
