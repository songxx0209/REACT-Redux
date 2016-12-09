export default function reducer(state = {
  fetching: false,
  fetched: false,
  filter: '',
  activeData: null,
  zuoPinList: null,
  error: null,
}, action) {

  //获取作品列表
  switch (action.type) {

    case 'GET_ACTIVE_DATA_PENDING':
      {
        return {
          ...state,
          fetching: true,
        }
      }
    case 'GET_ACTIVE_DATA_REJECTED':

      {
        return {
          ...state,
          fetching: false,
          error: action.payload,
        }
      }
    case 'GET_ACTIVE_DATA_FULFILLED':
      { 
        //console.log('xiaoweiss===',action.payload);
        const data = action.payload.data.data;
        return {
          ...state,
          fetching: false,
          fetched: true,
          activeData: data,
        }
      }

    case 'GET_VOTE_DATA_PENDING':
      {
        return {
          ...state,
          fetching: true,
        }
      }
    case 'GET_VOTE_DATA_REJECTED':

      {
        return {
          ...state,
          fetching: false,
          error: action.payload,
        }
      }
    case 'GET_VOTE_DATA_FULFILLED':
      { 
        //console.log(action.payload);
        const data = action.payload.data;
        return {
          ...state,
          fetching: false,
          fetched: true,
          zuoPinList: data,
        }
      }

    //通过关键字搜索作品
    case 'SEARCH_FILTER':
      {
        return {
          ...state,
          filter: action.payload,
        }
      }

    //点击投票
    case 'CAST_VOTE_PENDING':
      {
        return {
          ...state,
          fetching: true,
        }
      }
    case 'CAST_VOTE_REJECTED':

      {
        return {
          ...state,
          fetching: false,
          error: action.payload,
        }
      }
    case 'CAST_VOTE_FULFILLED':
      { 
        const data = action.payload.data;    //后台返回的状态 1：投票次数已经用完2：您已经对当前投票选项投过票了3：投票成功
        const Id = action.payload.Id;        //optionId
        const list = state.zuoPinList.data;
        console.log('data---', data);
        if(data == 2){
          let newList = list.map(function (item, index){
            if(item.optionId == Id){
              let count = parseInt(item.voteCount)+1;
              item.voteCount = count;
            }
            return item;
          });
          const newZuoPin = {...state.zuoPinList, data:newList};
          return {
            ...state,
            fetching: false,
            fetched: true,
            zuoPinList:newZuoPin
          }
        }else if( data == false ){
          return {
            ...state,
            fetching: false,
            fetched: true,
          }
        }
      }
    default: return {
      ...state,
    }
  }
}
/*== 1||data == 3||data == 4||data == 5*/