import React from 'react';
import {
  Route,
  IndexRoute,
} from 'react-router';

import Login from './page/Login';
import IndexPage from './page/IndexPage';

/* 进入路由的判断 */
// function isLogin(nextState, replaceState) {
// const token = sessionStorage.getItem('token')
// if (!token) {
//   replaceState('/login')
//   // hashHistory.push('/login')
// }
// }
function isLogin() {
  console.log('good');
}

const routes = (
  <Route>
    <Route path="/" component={IndexPage} onEnter={isLogin} />
    <Route path="/login" component={Login} />
  </Route>
);

export default routes;
