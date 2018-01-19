# Redux

1:Store

- ### State

  当前时刻的 State，可以通过`store.getState()`拿到

- ### Action

- ### store.dispatch()

  `store.dispatch()`是 View 发出 Action 的唯一方法。

- ## Reducer



- Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。

  纯函数是函数式编程的概念，必须遵守以下一些约束。

  > - 不得改写参数
  > - 不能调用系统 I/O 的API
  > - 不能调用`Date.now()`或者`Math.random()`等不纯的方法，因为每次会得到不一样的结果

  由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象，请参考下面的写法。

  > ```
  > // State 是一个对象
  > function reducer(state, action) {
  >   return Object.assign({}, state, { thingToChange });
  >   // 或者
  >   return { ...state, ...newState };
  > }
  >
  > // State 是一个数组
  > function reducer(state, action) {
  >   return [...state, newItem];
  > }
  >
  > ```

  最好把 State 对象设成只读。你没法改变它，要得到新的 State，唯一办法就是生成一个新对象。这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变的对象。



- ### store.subscribe()

  Store 允许使用`store.subscribe`方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。

- ​

## reducer

##### 1:纯函数

>接受两个 参数，preState、action
>
>相同的输入，得到相同的输出
>
>如果 state 是普通对象，永远不要修改它！ ———— 这句话怎么理解

保持reducer中 state不变的方法

- Object.assign({}, state, {});    将整个state 全部深拷贝一份出来，操作 新拷贝的state

  - ```
    const x = {
          a1: {a2: 1},
          b1: {
            b2: {b4: 2},
            b3: {b5: 3}
          },
          c1:4
        }
        const y = Object.assign({}, x)
        y.b1.b3.b5 = 8
        y.c1 = 9
        console.log(x); //=> {a1:{a2:1}, b1:{b2:{b4:2}, b3:{b5:8}}, c1:4}
        console.log(y); //=> {a1:{a2:1}, b1:{b2:{b4:2}, b3:{b5:8}}, c1:9}
        console.log(x == y); //=> false
        console.log(x.a1 == y.a1); //=> true
        console.log(x.b1 == y.b1); //=> true
        console.log(x.b1.b2 == y.b1.b2); //=> true
        console.log(x.b1.b3 == y.b1.b3); //=> true
        console.log(x.b1.b3.b5 == y.b1.b3.b5); //=> true

    ```

  - 这里需要深入理解 变量 的 基本类型 和 引用类型

    ```
    var a = 23;
    // 怎么来理解 变量 在内存中 是怎么储存的，  小孩书；
    ```

    ​

- 使用es6。对象展开运算。 {…state, xx: xxx}

- 使用loadsh的 cloneDeep  方法进行深拷贝；

- 采用官方提供的Immutability Helper工具中update()方法进行数据更新([链接](https://facebook.github.io/react/docs/update.html))

- 还有一种 是使用immutablejs，不知道和上一种有什么区别