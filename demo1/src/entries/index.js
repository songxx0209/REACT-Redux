import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, createMemoryHistory } from 'react-router';
import store from '../store';
import Layout from '../layouts/Layout';
import LoginPage from '../pages/LoginPage ';
import '../../node_modules/antd/dist/antd.less';
import DetailPage from '../components/DetailPage';
import TestPage from '../components/TestPage';

const app = document.getElementById('app');
const history = createMemoryHistory(location);


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} >
      <Route path="/" component={Layout}>
        <IndexRoute component= {LoginPage} />
        <Route path="detailPage" name="detailPage" component={DetailPage} />
        <Route path="testPage(/:key)" name="testPage" component={TestPage} />
      </Route>

    </Router>
  </Provider>,
app);
