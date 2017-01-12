import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import store from '../store';
import Layout from '../layouts/Layout';
import IndexPage from '../pages/IndexPage';
// import '../../node_modules/antd/dist/antd.less';
import BillingPage from '../pages/BillingPage';

const app = document.getElementById('app');
// const history = createMemoryHistory(location);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} >
      <Route path="/" component={Layout}>
        <IndexRoute component= {IndexPage} />
        <Route path="billingPage" component={BillingPage} />
      </Route>
    </Router>
  </Provider>,
app);

