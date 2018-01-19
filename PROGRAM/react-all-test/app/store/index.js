import {
  applyMiddleware,
  createStore,
} from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import promiseMiddleware from 'redux-promise';

import reducer from '../reducers';


const myLogger = store => next => action => {
  console.log('sss=',store);
  console.log('dispatching', action);
  next(action);
};


const middleware = applyMiddleware(promise(), thunk);
// const middleware = applyMiddleware(promise(), thunk, logger);
// const middleware = applyMiddleware(promiseMiddleware, thunk, myLogger);

export default createStore(reducer, middleware);
