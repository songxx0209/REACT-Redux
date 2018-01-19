import { combineReducers } from 'redux';
import listData from './activeReducer'
import zuoPinStore from './zuoPinReducer';

export default combineReducers({
  zuoPinStore,
  listData,
})
