import axios from 'axios';
import { message } from 'antd';

function getActive(appId) {
  return axios.get(`${ENV.api}/active/get_active?appId=${appId}&activeId=${ENV.activeId}`);
}

function getCount(appId) {
  return axios.get(`${ENV.api}/activity/drawCount/get?appId=${appId}&activeId=${ENV.activeId}`);
}

function printErr(err) {
  let str = '';
  if (typeof err === 'string') {
    str = err;
  } else if (typeof err === 'object') {
    str = err.msg || err.message;
  }
  message.error(str, 4);
}

export function getData(appId) {
  return function (dispatch) {
    axios.all([getActive(appId), getCount(appId)])
    .then(axios.spread((activeRes, countRes) => {
      if (activeRes.data.success === true && countRes.data.success === true && countRes.data.data !== null && countRes.data.code === 20001) {
        const activeData = activeRes.data.data;
        document.getElementById('canvas').style.backgroundImage = 'url(http://resource.handsight.cn/voteActive/upload/img/1483688684960_6480.jpg)';
        setTimeout(() => {
          dispatch({
            type: 'GET_DATA_FULFILLED',
            payload: activeData,
          });
        }, 2000);
      } else if (activeRes.data.success === false) {
        return Promise.reject(new Error(activeRes.data.msg));
        // message.error(activeRes.data.msg, 4);
        // dispatch({
        //   type: 'SPIN_ERR',
        // });
      } else if (countRes.data.success === false) {
        return Promise.reject(new Error(countRes.data.msg));
        // message.error(countRes.data.msg, 4);
        // dispatch({
        //   type: 'SPIN_ERR',
        // });
      } else if (countRes.data.code === 50001) {
        // return Promise.reject(new Error('不在活动时间！'));
        message.error('不在活动时间！', 10);
        dispatch({
          type: 'SPIN_ERR',
        });
      } else {
        return Promise.reject(new Error('服务数据异常！'));
        // message.error('活动加载出错！', 4);
        // dispatch({
        //   type: 'SPIN_ERR',
        // });
      }
    }))
    .catch((err) => {
      printErr(err);
      dispatch({
        type: 'SPIN_ERR',
      });
      // message.error('活动加载出错！', 3);
    });
  };
}

export function getUserInfo(tempAppId) {
  return function (dispatch) {
    axios.get(`${ENV.api}/thirdparty/user/getUserInfo?appId=${tempAppId}&code=${ENV.code}&typeName=wx`)
    .then((res) => {
      if (res.data.success === true) {
        const appId = JSON.parse(res.data.data).appId;
        localStorage.setItem('YH_appid', appId);
        ENV.appId = appId;
        dispatch(getData(appId));
        dispatch({
          type: 'GET_USERINFO_FULFILLED',
          data: appId,
        });
      } else {
        return Promise.reject(new Error(res.data.msg));
      }
    })
    .catch((err) => {
      printErr(err);
      dispatch({
        type: 'SPIN_ERR',
      });
      // message.error('appId请求出错！', 2);
    });
  };
}

export function getAppId() {
  return function (dispatch) {
    const appId = localStorage.getItem('YH_appid');
    ENV.appId = appId;
    if (appId) {
      dispatch(getData(appId));
    } else {
      axios.get(`${ENV.api}/user/appid?mac=${ENV.mac}`)
      .then((res) => {
        if (res.data.success === true) {
          const tempAppId = res.data.data;
          if (tempAppId) {
            dispatch(getUserInfo(tempAppId));
          }
        } else {
          return Promise.reject(new Error(res.data.msg));
        }
      })
      .catch((err) => {
        printErr(err);
        dispatch({
          type: 'SPIN_ERR',
        });
      });
    }
  };
}

export function getRewardInfo(appId) {
  return function (dispatch) {
    dispatch({
      type: 'GET_REWARD_INFO_PENDING',
    });
    const startTime = new Date();
    axios.get(`${ENV.api}/activity/drawResultYH?appId=${appId}&activeId=${ENV.activeId}`)
      .then((res) => {
        const costTime = new Date() - startTime;
        if (res.data.success === true) {
          const data = res.data.data;
          if (costTime < 4500) {
            const t = 4500 - costTime;
            setTimeout(() => {
              dispatch({
                type: 'GET_REWARD_INFO_FULFILLED',
                payload: data,
              });
              clearInterval(window.timer);
              window.music.pause();
            }, t);
          } else {
            dispatch({
              type: 'GET_REWARD_INFO_FULFILLED',
              payload: data,
            });
            clearInterval(window.timer);
            window.music.pause();
          }
        } else if (costTime < 4500) {
          const t = 4500 - costTime;
          setTimeout(() => {
            dispatch({
              type: 'GET_REWARD_INFO_REJECTED',
            });
            clearInterval(window.timer);
            window.music.pause();
            message.error(res.data.msg, 2);
          }, t);
        } else {
          dispatch({
            type: 'GET_REWARD_INFO_REJECTED',
          });
          clearInterval(window.timer);
          window.music.pause();
          message.error(res.data.msg, 2);
        }
      })
      .catch((err) => {
        printErr(err);
        dispatch({
          type: 'GET_REWARD_INFO_REJECTED',
        });
        clearInterval(window.timer);
        window.music.pause();
        // message.error('请求出错！', 2);
      });
  };
}

export function getReward(appId) {
  return function (dispatch) {
    dispatch({
      type: 'GET_COUNT_PENDING',
    });
    getCount(appId).then((res) => {
      if (res.data.success === true) {
        const count = res.data.data;
        if (count === null && res.data.code === 50001) {
          dispatch({
            type: 'GET_COUNT_REJECTED',
          });
          message.info('活动还没有开展！！！', 3);
        } else if (count > 0) {
          window.music.play();
          window.timer = setInterval(window.fireworks.start, 300);
          dispatch(getRewardInfo(appId));
        } else {
          dispatch({
            type: 'GET_COUNT_REJECTED',
          });
          message.info('今天的抽奖次数已经用完！！！', 3);
        }
      } else {
        return Promise.reject(new Error(res.data.msg));
      }
    })
    .catch((err) => {
      printErr(err);
      dispatch({
        type: 'GET_COUNT_REJECTED',
      });
      // message.error('获取抽奖次数出错！', 2);
    });
  };
}

export function cancelModule() {
  return {
    type: 'MODULE_HIDE',
  };
}

export function ruleModal(flag) {
  return {
    type: 'RULE_MODAL',
    payload: flag,
  };
}


export function historyModalShow() {
  return function(dispatch) {
    dispatch({
      type: 'GET_RECORD',
      payload: axios.get(`${ENV.api}/activity/drawResultList?type=1&appId=${ENV.appId}&activeId=${ENV.activeId}`),
    });
  };
}

export function historyModalHide() {
  return {
    type: 'HISTORY_MODAL_HIDE',
  };
}
