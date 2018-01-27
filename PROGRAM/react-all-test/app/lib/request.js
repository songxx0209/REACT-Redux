import axios from 'axios';

const request = axios.create({
  baseURL: 'https://wx.dashixiongky.com',
  // headers: { 'X-Custom-Header': 'foobar' },
  // headers: { 'X-Requested-With': 'XMLHttpRequest' },
  // withCredentials: true,
});

export default request;
