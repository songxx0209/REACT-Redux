function toDecimal(x) {
  let f = parseFloat(x);
  if (isNaN(f)) {return false;}
  f = Math.round(x * 100) / 100;
  const a0 = f.toFixed(2); // 保留小数点后两位
  let a1 = Math.round(a0 * 10) / 10;// 保留小数点后1位,去掉小数点后第2位(四舍五入)
  if (a1 > a0) {  // a1是-五入
    a1 = a1.toFixed(2);
  } else if (a1 < a0) {  // a1是-4舍,
    a1 += 0.05;  // 把最后一位小数（百分位）设置为5
  }
  return a1;
}

export default function reducer(state = {
  goodsList: '',
  salesList: '',
}, action) {
  switch (action.type) {
    case 'ADD_COUNT':// 增加购买数量
      {
        const list = state.goodsList.map((ele) => {
          ele.quantity = ele.key === action.payload ? ele.quantity - (-1) : ele.quantity;
          return ele;
        });
        return {
          ...state,
          goodsList: list,
        };
      }
    case 'SUBTRACT_COUNT':// 减少购买数量
      {
        const list = state.goodsList.map((ele) => {
          if (ele.key === action.payload && ele.quantity > 0) {
            ele.quantity -= 1;
          }
          return ele;
        });
        return {
          ...state,
          goodsList: list,
        };
      }
    case 'CHANGE_COUNT':// 修改input输入框中的值
      {
        const list = state.goodsList.map((ele) => {
          if (ele.key === action.payload.key) {
            ele = action.payload;
          }
          return ele;
        });
        return {
          ...state,
          goodsList: list,
        };
      }
    case 'CHECK_OUT':// 计算购物车中商品的税收，和税后价格
      {
        const aa = state.goodsList.filter((ele) => {
          return ele.check === true;
        });
        const newList = aa.map((ele) => {
          ele.tax = toDecimal(ele.price * ele.rate) * ele.quantity;
          ele.sellingPrice = (ele.price * ele.quantity + (ele.tax - 0));
          return ele;
        });
        return {
          ...state,
          salesList: newList,
        };
      }
    case 'GET_GOODS':// 获取商品列表
      {
        return {
          ...state,
          goodsList: action.payload,
        };
      }
    default:
      return {
        ...state,
      };
  }
}

