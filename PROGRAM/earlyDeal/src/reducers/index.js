import { combineReducers } from 'redux';

import table from './tableReducer';
import detail from './detailReducer';
import theme from './themeReducer';
import add from './formReducer';
import star from './starReducer';

export default combineReducers({
  table,
  detail,
  theme,
  add,
  star,
});
