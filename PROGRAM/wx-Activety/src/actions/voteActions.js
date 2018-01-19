import axios from 'axios';
import { notification } from 'antd';

function openNotification(type, description) {
  notification[type]({
    description,
    duration: 3,
  })
}

//获取作品列表
export function fetchVoteData() {
  return function (dispatch) {
    dispatch({
      type: 'GET_VOTE_DATA',
      payload: axios.get( `${ENV.api}/wx/voteActive/option/get.do?activeId=1&orderType=0` ),
    });
  }
}

//获取此活动的基本信息
export function getActiveData(){
  return function (dispatch) {
    dispatch({
      type: 'GET_ACTIVE_DATA',
      payload: axios.get( `${ENV.api}/wx/voteActive/getOne.do?activeId=1` ),
    });
  }   
}

//通过关键词搜索作品
export function searchFilter(word) {
  return {
    type: 'SEARCH_FILTER',
    payload: word,
  }
}
//点击 ‘投票他一票’ 按钮
export function castVote( activeId, optionId, optionType){
  return function (dispatch){
    dispatch({
      type: 'CAST_VOTE_PENDING',
    });
    const pramas = {
      activeId,
      optionId,
      optionType,
    }
    const prama = JSON.stringify(pramas);
    axios.get( `${ENV.api}/wx/voteActive/voting.do?activeId=${activeId}&optionId=${optionId}` )
      .then((res) => {
        if(res.data.success == true){
          dispatch({
            type: 'CAST_VOTE_FULFILLED',
            payload:{
              Id: optionId,
              data: res.data.data,
            },
          });
          openNotification('success', res.data.msg);
        } else{
          dispatch({
            type: 'CAST_VOTE_FULFILLED',
            payload:{
              data: res.data.success
            },
          });
          if( res.data.data == 1||res.data.data == null ){
            openNotification('error', res.data.msg);
          }else if( res.data.data == 3 ){
            openNotification('success', res.data.msg);
          }else if( res.data.data == 4 ){
            openNotification('error', res.data.msg);
          }else if( res.data.data == 5 ){
            openNotification('error', res.data.msg);
          }
        }
       
      })
      .catch((err) => {
        dispatch({
          type: 'CAST_VOTE_REJECTED',
        });
        openNotification('error', '投票失败！');
      })
  }
}

export function initApp( code ){
  return function (dispatch){
    axios.get( `${ENV.api}/wx/voteActive/login.do?code=${code}` )
      .then((res) => {
        if(res.data.code && res.data.code == '702'){
          localStorage.removeItem('sessionId');
          localStorage.removeItem('code');
          window.location.href = "http://weixin.handsight.cn/vote/index.html";
        }else if(res.data.success === true){
          localStorage.setItem('sessionId', res.data.data.sessionid);
          dispatch(fetchVoteData());
          dispatch(getActiveData());
        } else{
          openNotification('error', '登录失败');
        }
      })
      .catch((err) => {
        openNotification('error', '授权失败');
      })
  }
}
