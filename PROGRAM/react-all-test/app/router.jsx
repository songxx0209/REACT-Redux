import React from 'react';
import {
  Route,
  browserHistory
} from 'react-router';

import Login from './page/Login';
import IndexPage from './page/IndexPage';

/* 进入路由的判断  nextState, replaceState */
function isLogin() {
  const token = localStorage.getItem('token')
  if (!token) {
    browserHistory.push('/login');
  }
}

const routes = (
  <Route>
    <Route path="/" component={IndexPage} onEnter={isLogin} />
    <Route path="/login" component={Login} />
  </Route>
);

export default routes;

