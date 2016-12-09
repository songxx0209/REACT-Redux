import axios from 'axios';
import { notification } from 'antd';

function openNotification(type, description) {
  notification[type]({
    message: '通知提醒框',
    description,
    duration: 3,
  })
}

// 获取作品
export function getZuoPinItem(activeId) {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_THEME_TYPE_PENDING',
    });
    dispatch({
      type: 'FETCH_ZUOPIN_TABLE_PENDING',
    });
    function getZuoPinList() {
      return axios.get(`${ENV.api}/wx/voteActive/option/get.do?orderType=0&activeId=` + activeId);
    }
    function getSourceList() {
      return axios.get(`${ENV.api}/wx/voteActive/source.do?activeId=` + activeId);
    }
    axios.all([getZuoPinList(), getSourceList()])
    .then(axios.spread((zuoPinList, sourceList) => {
      dispatch({
        type: 'FETCH_SOURCE_LIST_FULFILLED',
        payload: sourceList,
      });
      const data = zuoPinList.data.data.map(ele => {
        sourceList.data.data.forEach(item => {
          if (ele.source === item.source) {
            ele.sourceName = item.sourceName;
            ele.editable = false;
          }
        })
        return ele
      })
      return data
    }))
    .then(res => {
      dispatch({
        type: 'FETCH_ZUOPIN_TABLE_FULFILLED',
        payload: res,
      });
    })
    .catch(error => {
      dispatch({
        type: 'FETCH_ZUOPIN_TABLE_REJECTED',
      });
      openNotification('error', '获取数据失败');
    })
  }
}

// 获取作品来源
// export function getSourceList(activeId) {
//   return {
//     type: 'FETCH_SOURCE_LIST',
//     payload: axios.get(`${ENV.api}/wx/voteActive/source?activeId=` + activeId),
//   }
// }


// 清空作品
export function clearZuoPinItem() {
  return {
    type: 'CLEAR_ZUOPIN_TABLE',
  }
}
// 保存活动ID
export function setActiveId(activeId) {
  return {
    type: 'SET_ACTIVE_ID',
    payload: activeId,
  }
}

// 保存作品ID
export function setOptionId(optionId) {
  return {
    type: 'SET_OPTION_ID',
    payload: optionId,
  }
}

// 设置添加或编辑状态变量
export function addOrEdit(flag) {
  return {
    type: 'ADD_OR_EDIT',
    payload: flag,
  }
}

// 显示并初始化作品表单
export function zuoPinModalShow(data) {
  return {
    type: 'ZUOPIN_MODAL_SHOW',
    payload: data,
  }
}

// 隐藏表单
export function zuoPinModalHide() {
  return {
    type: 'ZUOPIN_MODAL_HIDE',
  }
}

// 设置当前作品类型
export function setTabKey(tabkey) {
  return {
    type: 'SET_TABKEY',
    payload: tabkey,
  }
}
// 修改文本编辑器缓存
export function setCacheEditorValue(value) {
  return {
    type: 'SET_CACHE_EDITOR_VALUE',
    payload: value,
  }
}
// 保存表单值
export function setCacheFormValue(value) {
  return {
    type: 'SET_CACHE_FORM_VALUE',
    payload: value,
  }
}
// 保存媒体地址
export function setCacheMediaSrc(src, flag) {
  return {
    type: 'SET_CACHE_MEDIA_SRC',
    payload: {
      src,
      flag,
    },
  }
}
// 修改编号
export function editIndex(data) {
  return {
    type: 'EDIT_INDEX',
    payload: data,
  }
}
// 修改缓存编号
export function setCacheValue(value) {
  return {
    type: 'SET_CACHE_VALUE',
    payload: value,
  }
}
// 查找需要更新的数据
function getSortArr(data, optionId, cacheValue, orderId, contentType, type) {
  let arr = [];
  if (orderId > cacheValue) {
    arr = data
      .filter(ele => {
        if (ele.orderId >= cacheValue && ele.orderId <= orderId && ele.contentType === contentType) {
          return true
        } else {
          return false
        }
      })
      .map((ele, i) => {
        const item = {
          preOrderId: ele.orderId,
          optionId: ele.optionId,
          activeId: ele.activeId,
        }
        if (ele.optionId === optionId) {
          item.orderId = cacheValue;
          return item;
        } else {
          item.orderId = ele.orderId + 1;
          return item;
        }
      })
  } else if (orderId < cacheValue) {
    arr = data
      .filter(ele => {
        if (ele.orderId <= cacheValue && ele.orderId >= orderId && ele.contentType === contentType) {
          return true
        } else {
          return false
        }
      })
      .map((ele, i) => {
        const item = {
          preOrderId: ele.orderId,
          optionId: ele.optionId,
          activeId: ele.activeId,
        }
        if (ele.optionId === optionId) {
          item.orderId = cacheValue;
          return item;
        } else {
          item.orderId = ele.orderId - 1;//cacheValue - i;
          return item;
        }
      })
  }
    // 过滤掉 已删除的元素
  if (type === 1) {
    arr = arr.filter(ele => {
      if (ele.optionId === optionId) {
        return false
      } else {
        return true
      }
    })
  }
  return arr
}
// 修改编号保存
export function editIndexSave(data, optionId, orderId, cacheValue, contentType, type = 0) {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_ZUOPIN_TABLE_PENDING',
    })
    cacheValue = parseInt(cacheValue, 10);
    const activeId = data[0].activeId;
    const jsonArr = getSortArr(data, optionId, cacheValue, orderId, contentType, type);
    axios({
      method: 'post',
      url: `${ENV.api}/wx/voteActive/option/update.do`,
      params: {
        json: JSON.stringify(jsonArr),
        type: 2,
      },
      paramsSerializer(params) {
        let paramStr = '';
        for (const p in params) {
          if (Array.isArray(params[p])) {
            paramStr += `${p}=[${params[p]}]&`;
          } else if (params[p]) {
            const _params = encodeURIComponent(params[p]);
            paramStr += `${p}=${_params}&`;
          }
        }
        return paramStr
      },
    })
    .then((res) => {
      dispatch({
        type: 'FETCH_ZUOPIN_UPLOAD_FULFILLED',
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: 'FETCH_ZUOPIN_TABLE_REJECTED',
      });
    })
  }
}
// 修改编号取消
export function editIndexCancel() {
  return {
    type: 'EDIT_INDEX_CANCEL',
  }
}
// 添加作品
export function addZuoPinItem(values) {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_ZUOPIN_ADD_PADDING',
    });
    const initDate = {
      source: {
        value: values.source,
      },
      title: {
        value: values.title,
      },
      author: {
        value: values.author,
      },
      description: {
        value: values.description,
      },
      img: {
        value: values.img,
      },
      link: {
        value: values.link,
      },
      content: values.content,
    };
    dispatch({
      type: 'ZUOPIN_MODAL_COMFIRM_EDIT',
      payload: initDate,
    });
    axios({
      method: 'post',
      url: `${ENV.api}/wx/voteActive/option/add.do`,
      params: {
        json: values,
      },
    }).then((res) => {
      if (res.data.success === true) {
        dispatch({
          type: 'FETCH_ZUOPIN_ADD_FULFILLED',
          payload: res.data.data,
        });
        openNotification('success', res.data.msg);
      } else {
        dispatch({
          type: 'ZUOPIN_MODAL_HIDE',
        })
        openNotification('error', res.data.msg);
      }
    }).catch((error) => {
      dispatch({
        type: 'FETCH_ZUOPIN_ADD_REJECTED',
      });
      dispatch({
        type: 'ZUOPIN_MODAL_HIDE',
      });
      openNotification('error', '添加失败！');
    });
  }
}

// 编辑作品
export function uploadZuoPinItem(values) {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_ZUOPIN_UPLOAD_PADDING',
    });
    const initDate = {
      source: {
        value: values.source,
      },
      title: {
        value: values.title,
      },
      author: {
        value: values.author,
      },
      description: {
        value: values.description,
      },
      img: {
        value: values.img,
      },
      link: {
        value: values.link,
      },
      content: values.content,
    };
    dispatch({
      type: 'ZUOPIN_MODAL_COMFIRM_EDIT',
      payload: initDate,
    });
    axios({
      method: 'post',
      url: `${ENV.api}/wx/voteActive/option/update.do`,
      params: {
        json: values,
        type: 1,
      },
    }).then((res) => {
      if (res.data.success === true) {
        dispatch({
          type: 'FETCH_ZUOPIN_UPLOAD_FULFILLED',
          payload: res.data.data,
        });
        dispatch({
          type: 'ZUOPIN_MODAL_HIDE',
        })
        openNotification('success', '修改成功');
      } else {
        dispatch({
          type: 'ZUOPIN_MODAL_HIDE',
        })
        openNotification('error', '修改失败!');
      }
    }).catch((error) => {
      dispatch({
        type: 'FETCH_ZUOPIN_UPLOAD_REJECTED',
      });
      dispatch({
        type: 'ZUOPIN_MODAL_HIDE',
      });
      openNotification('error', '修改失败！');
    });
  }
}

// 删除作品
export function delZuoPinItem(record, recordArr) {
  return function (dispatch) {
    const { activeId, optionId } = record;
    dispatch({
      type: 'FETCH_ZUOPIN_DELETE_PADDING',
    });
    axios({
      method: 'post',
      url: `${ENV.api}/wx/voteActive/option/delete.do`,
      params: {
        activeId,
        optionId,
      },
    }).then((res) => {
      if (res.data.success === true) {
        openNotification('success', res.data.msg);
        dispatch(editIndexSave(recordArr, optionId, record.orderId, recordArr.length, record.contentType, 1));
      } else {
        dispatch({
          type: 'FETCH_ZUOPIN_DELETE_REJECTED',
        });
        openNotification('success', res.data.msg);
      }
    }).catch((error) => {
      dispatch({
        type: 'FETCH_ZUOPIN_DELETE_REJECTED',
      });
      openNotification('error', '删除失败！');
    });
  }
}

//投票排序
export function voteSort(activeId, flag) {
  let orderType = '';
  if (flag) {
    orderType = 2;
  } else {
    orderType = 1;
  }
  return function (dispatch) {
    dispatch({
      type: 'FETCH_VOTE_SORT_PADDING',
    });
    axios({
      method: 'get',
      url: `${ENV.api}/wx/voteActive/option/get.do`,
      params: {
        activeId,
        orderType,
      },
    }).then((res) => {
      if (res.data.success === true) {
        dispatch({
          type: 'FETCH_VOTE_SORT_FULFILLED',
          payload: res.data.data,
        })
      } else {
        dispatch({
          type: 'FETCH_VOTE_SORT_REJECTED',
        });
        openNotification('error', '更新票数失败！');
      }
    }).catch((error) => {
      dispatch({
        type: 'FETCH_VOTE_SORT_REJECTED',
      });
      openNotification('error', '更新票数失败！');
    });
  }
}

// export function voteSort(sorter, activeId) {
//   if (sorter.columnKey === 'voteCount') {
//     let orderType = '';
//     if (sorter.order === 'ascend') {
//       orderType = 1;
//     } else if (sorter.order === 'descend') {
//       orderType = 2;
//     }
//     return function (dispatch) {
//       dispatch({
//         type: 'FETCH_VOTE_SORT_PADDING',
//       });
//       axios({
//         method: 'get',
//         url: `${ENV.api}/wx/voteActive/option/get.do`,
//         params: {
//           activeId,
//           orderType,
//         },
//       }).then((res) => {
//         if (res.data.success === true) {
//           dispatch({
//             type: 'FETCH_VOTE_SORT_FULFILLED',
//             payload: {
//               sorter,
//               data: res.data.data,
//             },
//           })
//         } else {
//           dispatch({
//             type: 'FETCH_VOTE_SORT_REJECTED',
//           });
//         }
//       }).catch((error) => {
//         dispatch({
//           type: 'FETCH_VOTE_SORT_REJECTED',
//         });
//       });
//     }
//   } else {
//     return {
//       type: 'VOTE_SORT',
//       payload: sorter,
//     }
//   }
// }

