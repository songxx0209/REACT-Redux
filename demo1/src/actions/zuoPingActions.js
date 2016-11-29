import axios from 'axios';
import { notification } from 'antd';

function openNotification(type, description) {
  notification[type]({
    message: '通知提醒框',
    description,
    duration: 3,
  })
}

export function deleteZuopingItem(tabKey, zuopingKey) {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_ZUOPING_DELETE_PADDING',
    });
    axios({
      method: 'get',
      url: '/api/delzuoping',
    }).then((res) => {
      dispatch({
        type: 'FETCH_ZUOPING_DELETE_FULFILLED',
        payload: {
          tabKey,
          zuopingKey,
        },
      });
      if (res.data.success === true) {
        openNotification('success', '删除成功');
      }
    }).catch((error) => {
      dispatch({
        type: 'FETCH_ZUOPING_DELETE_REJECTED',
      });
      openNotification('error', '删除失败！');
    });
  }
}
