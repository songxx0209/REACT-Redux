import { combineReducers } from 'redux';

import voteData from './voteReducer';
import modalData from './modalReducer';
/*post,*/
export default combineReducers({
  voteData,
  modalData,
})
