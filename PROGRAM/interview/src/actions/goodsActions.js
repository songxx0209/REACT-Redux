export function getGoods() {
  return function (dispatch) {
    dispatch({
      type: 'GET_GOODS',
      payload: ENV.data,
    });
  };
}
export function changeCount(raw) {
  return {
    type: 'CHANGE_COUNT',
    payload: raw,
  };
}
// 将选中的商品加入购物车
export function checkOut() {
  return {
    type: 'CHECK_OUT',
  };
}
export function addCount(item) {
  return {
    type: 'ADD_COUNT',
    payload: item,
  };
}
export function subtractCount(item) {
  return {
    type: 'SUBTRACT_COUNT',
    payload: item,
  };
}
