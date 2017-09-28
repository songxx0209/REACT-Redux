import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import test from './test';
import back from './back';

export default combineReducers({
  routing,
  test,
  back,
});
