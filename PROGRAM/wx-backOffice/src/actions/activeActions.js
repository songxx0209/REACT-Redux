import axios from 'axios';
import { notification } from 'antd';

function openNotification(type, description) {
  notification[type]({
    message: '通知提醒框',
    description,
    duration: 3,
  })
}

//获取活动列表
export function getActiveList() {
  return function (dispatch) {
    dispatch({
      type: 'GET_ACTIVE_LIST',
      payload: axios.get(`${ENV.api}/wx/voteActive/get.do?mark=0`),
    });
  }
}

//添加投票活动
export function addActivity(title, content, rule, startTime, endTime) {
  return function (dispatch) {
    dispatch({
      type: 'ADD_ACTIVITY_PADDING',
    });
    const param = {
      title,
      content,
      rule,
      startTime,
      endTime,
    }
    const params = JSON.stringify(param);
    axios.get(`${ENV.api}/wx/voteActive/add.do?json=${params}`).then((res) => {
      console.log('res==', res);
      if (res.data.success === true) {
        console.log('res==', res.data.data.id);
        dispatch({
          type: 'ADD_ACTIVITY_FULFILLED',
          payload: res.data,
          
        });
        openNotification('success', '添加成功！');
      }
    }).catch((error) => {
      dispatch({
        type: 'ADD_ACTIVITY_REJECTED',
      });
      openNotification('error', '添加失败！');
    });
  }
}

//编辑投票活动
export function updateActivity(title, id, content, rule, startTime, endTime, mark) {
  return function (dispatch) {
    dispatch({
      type: 'UPDATE_ACTIVITY_PADDING',
    });
    const param = {
      title,
      id: id,
      content,
      rule,
      startTime,
      endTime,
      mark,
    }
    const params = JSON.stringify(param);
    axios.get(`${ENV.api}/wx/voteActive/update.do?json=${params}`).then((res) => {
      if (res.data.success === true) {
        dispatch({
          type: 'UPDATE_ACTIVITY_FULFILLED',
          payload: {
            id,
            title,
            content,
            rule,
            mark,
            createTime: '',
            startTime,
            endTime,
            updateTime: '',
          },
        });
        openNotification('success', '修改成功！');
      }
    }).catch((error) => {
      dispatch({
        type: 'UPDATE_ACTIVITY_REJECTED',
      });
      openNotification('error', '修改失败！');
    });
  }
}
//删除投票活动
export function deleteActivity(id) {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_ACTIVITY_PADDING',
    });
    axios.get(`${ENV.api}/wx/voteActive/del.do?activeId=${id}`).then((res) => {
      if (res.data.success === true) {
        dispatch({
          type: 'DELETE_ACTIVITY_FULFILLED',
          payload: {
            id,
          },
        });
        openNotification('success', '修改成功！');
      }
    }).catch((error) => {
      dispatch({
        type: 'DELETE_ACTIVITY_REJECTED',
      });
      openNotification('error', '修改失败！');
    });
  }
}

// 通过关键字搜索
export function searchFilter(filter) {
  return {
    type: 'FILTER_KEY_WORD',
    payload: filter,
  }
}

// 活动表单显示，隐藏
export function activeModalShow(flag) {
  return {
    type: 'ACTIVE_MODAL_SHOW',
    payload: flag,
  }
}

//点击编辑-将数据添加到store的keepfrom中
export function keepData(id) {
  return {
    type: 'KEEP_DATA',
    payload: id,
  }
}

//清除keepfrom中的数据
export function clearFrom() {
  return {
    type: 'CLEAR_FROM',
    payload: {
      id: '',
      title: '',
      content: '',
      rule: '',
      mark: '',
      createTime: '',
      startTime: '',
      endTime: '',
      updateTime: '',
    },
  }
}

//from一变就修改富文本的值
export function changeEditor( title, startTime, endTime, mark, rule, content ){
  return {
    type: 'CHANGE_EDITOR',
    payload: {
      title,
      startTime,
      endTime,
      mark,
      rule,
      content,
    }
  }
}
// 保存表单值
export function setCacheFormValue(value) {
  return {
    type: 'SET_CACHE_FORM_VALUE',
    payload: value,
  }
}