import axios from 'axios';
import { notification } from 'antd';

function openNotification(type, description) {
  notification[type]({
    message: '通知提醒框',
    description,
    duration: 3,
  })
}

export function fetchVoteData() {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_VOTE_DATA',
      payload: axios.get('/voteOptions/get'),
    });
  }
}

export function searchTable(searchWord) {
  let type = 0;
  for (const item of ENV.typeData) {
    if (searchWord == item.adType) {
      type = item.typeId;
      break;
    }
  }
  return function (dispatch) {
    dispatch({
      type: 'FETCH_TABLE',
      payload: axios.get(`${ENV.api}/frame/search.do?pageNum=1&pageSize=3000&typeId=${type}`),
      // payload: axios.get('/api/tables'),
    });
  }
}

export function shanChu( key ) {
  return {
    type: 'FILTER_ACTIVE_ITEM',
    payload: key,
  }
}
// 通过关键字搜索
export function searchFilter( filter ) {
  return {
    type: 'FILTER_KEY_WORD',
    payload: filter,
  }
}
