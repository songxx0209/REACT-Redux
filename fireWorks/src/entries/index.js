import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, createMemoryHistory } from 'react-router';
import store from '../store';
import Layout from '../layouts/Layout';
import IndexPage from '../pages/IndexPage';

const app = document.getElementById('canvas');
const history = createMemoryHistory(location);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
      <Route path="/" component={Layout}>
        <IndexRoute component={IndexPage} />
      </Route>
    </Router>
  </Provider>,
app);
