import axios from 'axios';
import { notification } from 'antd';

function openNotification(type, description) {
  notification[type]({
    message: '通知提醒框',
    description,
    duration: 3,
  })
}

// 表单显示,隐藏
export function modalShow(flag) {
  return {
    type: 'MODAL_SHOW',
    payload: flag,
  }
}
// 第一个表单显示，隐藏
export function firstModalShow(flag){
  return {
    type: 'FIRST_MODAL_SHOW',
    payload: flag,
  }
}
// 修改表单中的内容
export function firstTableFrom(title, startTime, endTime, activeState){
  return {
    type: 'FIRST_TABLE_FROM',
    payload: {
      title: title,
      startTime: startTime,
      endTime: endTime,
      state: activeState
    }
  }
}

export function clearAll(){
  return {
    type: 'CLEAR_ALL',
  }
}

// 初始化表单
export function modalInit(data) {
  return {
    type: 'MODAL_INIT',
    payload: data,
  }
}

// 修改作品图片
export function changeImgSrc(src) {
  return {
    type: 'CHANGE_IMG_SRC',
    payload: src,
  }
}

// 修改视频地址
export function changeVideoSrc(src) {
  return {
    type: 'CHANGE_VIDEO_SRC',
    payload: src,
  }
}

// 获取作品来源列表
export function getSource() {
  return {
    type: 'FETCH_SOURCE_SELECT',
    payload: axios.get('/api/getSource'),
  }
}

// 添加活动
export function addZuopingItem(item) {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_ZUOPING_TABLE_PADDING',
    });

    axios({
      method: 'get',
      url: '/api/zuoping',
    }).then((res) => {
      dispatch({
        type: 'FETCH_ZUOPING_TABLE_FULFILLED',
        // payload:
      });
      if (res.data.success === true) {
        openNotification('success', '成功');
      }
    }).catch((error) => {
      dispatch({
        type: 'FETCH_ZUOPING_TABLE_REJECTED',
      });
      openNotification('error', '添加失败！');
    });
  }
}

export function setTabKey(tabkey) {
  return {
    type: 'SET_TABKEY',
    payload: tabkey,
  }
}

