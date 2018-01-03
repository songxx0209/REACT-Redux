// import React from 'react';
// import ReactDOM from 'react-dom';

// import { Provider } from 'react-redux';
// import { Router, browserHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';

// import routes from './router';
// import store from './store';

// const history = syncHistoryWithStore(browserHistory, store);
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Friend from './components/friend';

ReactDOM.render(
  <Friend compiler="TypeScript" framework="ss" />,
  document.getElementById('app'),
);


