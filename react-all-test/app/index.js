import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { Router, Route, IndexRoute, hashHistory, createMemoryHistory } from 'react-router';

import aa from '_aa';

import store from './store';
import Login from './page/login';
import styles from './index.less';


const app = document.getElementById('app');
// const history = createMemoryHistory(location);
// console.log(Provider);
aa();

ReactDOM.render(
  <Provider store={store}>
    <Login />
  </Provider>,
app);