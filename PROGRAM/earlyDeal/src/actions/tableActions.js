import axios from 'axios';
import { notification } from 'antd';

function openNotification(type, description) {
  notification[type]({
    message: '通知提醒框',
    description,
    duration: 3,
  });
}

export function fetchTable(videoTypeId, searchKey) {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_TABLE',
      payload: axios.get(`${ENV.api}/video/getVideoList.do?videoTypeId=${videoTypeId}&searchKey=${searchKey}&pageNum=1&pageSize=3000`),
    });
  };
}

export function fetchStarTable(starName) {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_STAR_TABLE_PENDING',
      payload: starName,
    });
    axios({
      method: 'GET',
      url: `${ENV.api}/star/getStarList.do?starName=${starName}&pageNum=1&pageSize=3000`,
    }).then((res) => {
      if (res.data.success === true) {
        dispatch({
          type: 'FETCH_STAR_TABLE_FULFILLED',
          payload: res,
        });
      } else {
        openNotification('success', res.data.msg);
      }
    }).catch((error) => {
      dispatch({
        type: 'FETCH_STAR_TABLE__REJECTED',
        payload: error,
      });
      openNotification('error', '添加影片失败！');
    });
  };
}
export function clearStarTable() {
  return function (dispatch) {
    dispatch({
      type: 'CLEAR_STAR_TABLE_FULFILED',
    });
  };
}

