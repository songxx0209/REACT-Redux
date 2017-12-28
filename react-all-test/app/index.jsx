import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
// import { Router, browserHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';

// import routes from './router';
import store from './store';

// ---------------------------------------
import { BrowserRouter } from 'react-router-dom';
import App from './router';
// import App from './app';

// const history = syncHistoryWithStore(browserHistory, store);

// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={history}>
//       {routes}
//     </Router>
//   </Provider>,
//   document.getElementById('app'),
// );

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));

