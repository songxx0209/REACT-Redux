import {
  applyMiddleware,
  createStore,
  compose,
} from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import promiseMiddleware from 'redux-promise';

import reducer from '../reducers';

// const middleware = applyMiddleware(promise(), thunk);
// const middleware = applyMiddleware(promise(), thunk, logger);
const middleware = applyMiddleware(promiseMiddleware, thunk, logger);

export default createStore(reducer, middleware);