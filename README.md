# redux

### createStore - redux中最核心的API
```
import { createStore } from 'redux';
const store = createStore(fn);
```

> `Store`  保存数据的地方 -- 可以把它看成一个容器 --整个应用只能有一个 Store
>
> ##### 1 - `createStore`函数接受另一个函数作为参数，返回新生成的 Store 对象。
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
> // reducer为一个函数，计算state的变化，返回新state
> ```
>
> ##### 2 - `createStore`方法还可以接受第二个参数，表示 State 的最初状态。这通常是服务器给出的
>
> ```
> let store = createStore(todoApp, window.STATE_FROM_SERVER)
> ```
>
> 上面代码中，`window.STATE_FROM_SERVER`就是整个应用的状态初始值。注意，如果提供了这个参数，它会覆盖 Reducer 函数的默认初始值，我们一般不这样，通常情况下还是将默认这写在对应的Reducer函数中去。`所以第二个参数我们一般省略`
>
> ##### 3 - `createStore`方法还可以接受第三个参数applyMiddleware 
>
> `applyMiddleware`是redux原生方法，将所有中间件组成一个数组并依次执行
>
> 中间件就是一个函数，对`store.dispatch`方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能
>
> ```
> const store = createStore(
>   reducer,
>   applyMiddleware(thunk, promise, logger)
> );
> ```
>
> - ##### thunk 即为 redux-thunk中间件
>
>   Action 是由store.dispatch方法发送的,而store.dispatch方法正常情况下，参数只能是对象，不能是函数.。所以需要使用中间件redux-thunk来改造store.dispatch，使其可以接受函数作为参数
>
>   为什么要让参数可以接受函数呢？？？
>
>   这就要说到异步操作的问题了，异步操作的思路：
>
>   > 开始就发送Action（PENDING状态），自动执行reducer函数-将fetching设置为true，返回新的state，View重新渲染，表明异步请求开始
>   >
>   > 接着执行异步操作，异步请求成功-（成功拿到后台返回的数据后）处理返回的数据-发送第二个Action（FULFILLED），自动执行reducer函数-将fetching设置为false，返回新的state，View重新渲染。异步请求结束
>   >
>   > 如果异步失败，可在catch（error）{}方法中发送失败状态的Action（REJECTED）,自动执行reducer函数-将fetching设置为false，返回新的state，View重新渲染
>
>   同步操作只要发出一种 Action 即可，异步操作的差别是它会有三种 Action，至少会发送两种Action，应为需要在Action中发送dispatch，所以Action需要返回一个函数，将dispatch作为参数传递进去。-----所以才会需要redux-thunk改造store.dispatch，使其可以接受函数作为参数
>
>   实例代码如下
>
>   ```
>   export function addVideo(values) {
>     return function (dispatch) {
>       dispatch({
>         type: 'ADD_VIDEO_PENDING',
>       });
>       axios({
>         method: 'get',
>         url: `${ENV.api}/video/addVideo.do`,
>         params: values,
>       }).then((res) => {
>         dispatch({
>           type: 'ADD_VIDEO_FULFILLED',
>         });
>       }).catch((error) => {
>         dispatch({
>           type: 'ADD_VIDEO_REJECTED',
>         });
>       });
>     };
>   }
>   ```
>
> - ##### promise - redux-promise 中间件
>
>   使用 redux-promise中间件，它会自动为异步请求生成3中状态的Action（PENDING, FULFILLED,REJECTED）,	不需要手动的去编写3中状态，实例代码如下
>
>   ```
>   export function fetchDetail(videoId) {
>     return function (dispatch) {
>       dispatch({
>         type: 'FETCH_DETAIL',
>         payload: axios.get(`${ENV.api}/video/getVideo.do?videoId=${videoId}`),
>       });
>     };
>   }
>   ```
>
> - ##### logger - redux-logger组件 
>
>   ##### 生成日志，便于开发中观察数据的变法，排错等 
>
>   Logger **must be** the last middleware in chain, otherwise it will log thunk and promise, not actual actions.
>
>



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

​	如果想要接受函数function作为参数, 就需要通过中间件 （middleware）

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

##### Store通过dispatch收到Action，自动执行reducer函数，并且传入两个参数：当前 State 和收到的 Action-进行相关的计算并返回一个新的state传回给Store，Store改变就会通过`<Provider store>`来更新组件 

```
import { Provider } from 'react-redux';
import store from '../store';

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
app);
```

跟新组件涉及到组件生命周期的问题，可参考另一篇分享ComponentLifecycle.md。
