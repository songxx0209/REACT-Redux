import axios from 'axios';
import { notification } from 'antd';

function openNotification(type, description) {
  notification[type]({
    message: '通知提醒框',
    description,
    duration: 3,
  });
}

export function getStar(starId) {
  return function (dispatch) {
    dispatch({
      type: 'GET_STAR_PENDING',
    });

    axios({
      method: 'get',
      url: `${ENV.api}/star/getStar.do?starId=${starId}`,
    }).then((res) => {
      dispatch({
        type: 'GET_STAR_FULFILLED',
        payload: res.data,
      });
      if (res.data.success === true) {
        openNotification('success', res.data.msg);
      } else {
        openNotification('success', res.data.msg);
      }
    }).catch((error) => {
      dispatch({
        type: 'GET_STAR_REJECTED',
      });
      openNotification('error', '获取演员信息失败！');
    });
  };
}

export function modalOpen(flag) {
  return {
    type: 'MODEL_SHOW_HIDE',
    payload: flag,
  };
}
