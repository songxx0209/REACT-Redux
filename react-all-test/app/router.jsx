import React from 'react';
import {
  Route,
} from 'react-router';

import Login from './page/Login';
import IndexPage from './page/IndexPage';
import Test from './page/Test';

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
    <Route path="/test" component={Test} className={'wrap'} />
  </Route>
);

export default routes;

// export default routes;
// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
// } from 'react-router-dom';

// import Login from './page/Login';
// import IndexPage from './page/IndexPage';
// import Test from './page/Test';

// const App = () => (
//   <Router>
//     <div>
//       <Route exact path="/" component={IndexPage} />
//       <Route path="/login" component={Login} />
//       <Route path="/test" component={Test} className={'wrap'} />
//     </div>
//   </Router>
// );
// export default App;
