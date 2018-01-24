import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
// import test from './test';
import articleList from './articleList';

export default combineReducers({
  routing,
  articleList,
});
