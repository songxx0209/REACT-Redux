import axios from 'axios';

// function request() {

// }

const request = axios.create({
  baseURL: 'http://120.77.33.107:8000/',
  // timeout: 2000,
  // headers: { 'X-Custom-Header': 'foobar' },
  // headers: { 'X-Requested-With': 'XMLHttpRequest' },
  // withCredentials: true,
  xsrfCookieName: 'song',
  Accept: 'text/plain',
});

export default request;
