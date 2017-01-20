import axios from 'axios';
import { notification } from 'antd';

function openNotification(type, description) {
  notification[type]({
    message: '通知提醒框',
    description,
    duration: 3,
  });
}

export function addVideo(values) {
  return function (dispatch) {
    dispatch({
      type: 'ADD_VIDEO_PENDING',
    });
    axios({
      method: 'get',
      url: `${ENV.api}/video/addVideo.do`,
      params: values,
    }).then((res) => {
      dispatch({
        type: 'ADD_VIDEO_FULFILLED',
      });
      if (res.data.success === true) {
        openNotification('success', res.data.msg);
      } else {
        openNotification('success', res.data.msg);
      }
    }).catch((error) => {
      dispatch({
        type: 'ADD_VIDEO_REJECTED',
      });
      openNotification('error', '添加影片失败！');
    });
  };
}

export function addStar(values) {
  return function (dispatch) {
    dispatch({
      type: 'ADD_STAR_PENDING',
    });
    axios({
      method: 'get',
      url: `${ENV.api}/star/addStar.do`,
      params: values,
    }).then((res) => {
      dispatch({
        type: 'ADD_STAR_FULFILLED',
      });
      if (res.data.success === true) {
        openNotification('success', res.data.msg);
      } else {
        openNotification('success', res.data.msg);
      }
    }).catch((error) => {
      dispatch({
        type: 'ADD_STAR_REJECTED',
      });
      openNotification('error', '添加明星失败！');
    });
  };
}

export function videoModalOpen() {
  return {
    type: 'VIDEO_MODEL_OPEN',
  };
}
export function starModalOpen() {
  return {
    type: 'STAR_MODEL_OPEN',
  };
}
export function videoModalClose() {
  return {
    type: 'VIDEO_MODEL_CLOSE',
  };
}
export function starModalClose() {
  return {
    type: 'STAR_MODEL_CLOSE',
  };
}

