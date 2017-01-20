import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import { Router, Route, IndexRoute, hashHistory, createMemoryHistory, browserHistory } from 'react-router';
import store from '../store';
import Layout from '../layouts/Layout';
import IndexPage from '../pages/IndexPage';
import DetailLayout from '../layouts/DetailLayout';
import DetailPage from '../pages/DetailPage';
import ThemePage from '../pages/ThemePage';
import StarPage from '../pages/StarPage';
import '../../node_modules/antd/dist/antd.less';

const app = document.getElementById('app');
// const history = createMemoryHistory(location);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} >
      <Route path="/" component={Layout}>
          <IndexRoute component= {IndexPage} />
          <Route path="videopage/:videoTypeId/:videoId/:videoSetId" component={DetailLayout}>
            <IndexRoute component= {DetailPage} />
            <Route path=":themeId" name="themePage" component={ThemePage} />
          </Route>
          <Route path="starpage/:starId" name="starPage" component={StarPage} />
      </Route>
    </Router>
  </Provider>,
app);

 // <Route path="searchStarPage/:starName" name="searchStarPage" component={searchStarPage} />
