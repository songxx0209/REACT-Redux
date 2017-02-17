## react+redux

### createStore

```
import { createStore } from 'redux';
const store = createStore(fn);
```

> `Store`  保存数据的地方 -- 可以把它看成一个容器 --整个应用只能有一个 Store
>
> `createStore`函数接受另一个函数作为参数，返回新生成的 Store 对象。
>
> ```
> import {
>   applyMiddleware,
>   createStore,
> } from 'redux';
>
> import logger from 'redux-logger';
> import thunk from 'redux-thunk';
> import promise from 'redux-promise-middleware';
> import reducer from './reducers';
>
> // const middleware = applyMiddleware(promise(), thunk);   //完成编码去掉logger
> const middleware = applyMiddleware(promise(), thunk, logger()); //开发时加上logger
> export default createStore(reducer, middleware);
> // reducer为一个函数
> ```

##### Action --一个对象, 由 `名称`,` 附带信息` 等部分组成

```
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```

react设计思路个人理解, 视图View 与数据是一一对应的, 数据一改变view也会改变;  

那么数据怎么改变呢? 

用户在view层触发事件，view层向存放数据的Store发送一条消息,我要改变数据了； 

​	1：发送的这条消息就是action，

​	2：如何发送的呢？Store提供了一个`dispatch`的方法；

 ##### dispatch

`store.dispatch()`是 View 发出 Action 的唯一方法。

​	dispatch默认只接受对象作为参数,如{type: 'ADD_TODO',payload: 'Learn Redux'}  

​	如果想要接受函数function作为参数, 就需要通过中间件 

##### Reducer

​	1 : Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

​	2 : Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

​	3 : Reducer 函数不用像上面这样手动调用，`store.dispatch`方法会触发 Reducer 的自动执行 ,  为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入`createStore`方法。

​	4 : combineReducers方法合并多个reducer

```
import { combineReducers } from 'redux';

import table from './tableReducer';
import detail from './detailReducer';
import theme from './themeReducer';
import add from './formReducer';
import star from './starReducer';

export default combineReducers({
  table,
  detail,
  theme,
  add,
  star,
});

```

​	5 : 纯函数---不能改变state

```
// State 是一个对象
function reducer(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer(state, action) {
  return [...state, newItem];
}
```

> 这里有个问题, 当计算中涉及到引用类型的数据时需要小心, 别把state改了
>
> `最好把 State 对象设成只读。你没法改变它，要得到新的 State，唯一办法就是生成一个新对象。这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变的对象。`




