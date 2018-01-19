import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

// import articleList from './articleList';
import examdata from './examdata';

export default combineReducers({
  routing,
  examdata,
});
