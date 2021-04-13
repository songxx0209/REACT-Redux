##  react Middleware

https://segmentfault.com/a/1190000007248878

```
import {
  applyMiddleware,
  createStore,
} from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import promiseMiddleware from 'redux-promise';

import reducer from '../reducers';

// const middleware = applyMiddleware(promise(), thunk);
// const middleware = applyMiddleware(promise(), thunk, logger);
const middleware = applyMiddleware(promiseMiddleware, thunk);

export default createStore(reducer, middleware);
```

这里主要研究一下redux的中间件：

#### 首先理解一下什么是中间件

