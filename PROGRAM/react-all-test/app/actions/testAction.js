// import axios from 'axios';
// import request from 'superagent';
import request from '../lib/request';

export const changeOne = (data) => {
  return {
    type: 'CHANGE_ONE',
    payload: data,
  };
};

export const changeTow = (data) => {
  return {
    type: 'CHANGE_TOW',
    payload: data,
  };
};

export const changeThree = (data) => {
  return {
    type: 'CHANGE_THREE',
    payload: data,
  };
};

export const changeFour = (data) => {
  return {
    type: 'CHANGE_FOUR',
    payload: data,
  };
};

// export const getData = () => {
//   return function (dispatch) {
//     dispatch({
//       type: 'GET_DATA',
//       payload: axios.get('http://120.77.33.107:8000/web/get_datas/'),
//     });
//   };
// }

// 使用 async await 将请求改为 同步，就不会触发请求的三个状态；
export const getData = () => {
  return async (dispatch) => {
    const datas = await request.get('/web/get_datas/');
    const { data } = datas;
    dispatch({
      type: 'GET_DATA',
      payload: data,
    });
  };
};

// export let getData = () => {
//   return  (dispatch) => {
//     let ss = request.get('http://120.77.33.107:8000/web/get_datas/');
//     dispatch({
//       type: 'GET_DATA',
//       payload: ss,
//     });
//   };
// }
