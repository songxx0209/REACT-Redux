export default function reducer(state = {
  fetching: false,
  fetched: false,
  filter: '',
  modalShow: false,
  keepfrom: {
    title: { value: '' },
    Time: {value: ''},
    modifier: {value: ''},
    rule: {value: ''},
    content: '<p></p>'
  },
  list: null,
}, action) {
  switch (action.type) {

    //清除keepfrom中的数据
    case 'CLEAR_FROM':
      {
        return {
          ...state,
          keepfrom: action.payload,
        }
      }
    //保存当前点击的活动的-数据
    case 'KEEP_DATA':
      {
        const id = action.payload;
        const list = state.list;
        let getData = list.filter(function (item, index){
          if(item.id === id){
            return item;
          }
        });
        //console.log('getData', getData);
        return {
          ...state,
          keepfrom: getData[0],
        }
      }

    //是否显示from弹出框
    case 'ACTIVE_MODAL_SHOW':
      {
        return {
          ...state,
          modalShow: action.payload,
        }
      }
    //获取活动列表
    case 'GET_ACTIVE_LIST_PENDING':
      {
        return {
          ...state,
          fetching: true,
        }
      }
    case 'GET_ACTIVE_LIST_REJECTED':

      {
        return {
          ...state,
          fetching: false,
          error: action.payload,
        }
      }
    case 'GET_ACTIVE_LIST_FULFILLED':
      {
        const data = action.payload.data.data;
        return {
          ...state,
          fetching: false,
          fetched: true,
          list: data
        }
      }
    //通过标题筛选活动
    case 'FILTER_KEY_WORD':
      {
        const keyWords = action.payload;
        return {
          ...state,
          filter: keyWords,
        }
      }
    //添加投票活动
    case 'ADD_ACTIVITY_PENDING':
      {
        return {
          ...state,
          fetching: true,
        }
      }
    case 'ADD_ACTIVITY_REJECTED':

      {
        return {
          ...state,
          fetching: false,
          error: action.payload,
        }
      }
    case 'ADD_ACTIVITY_FULFILLED':
      {
        const data = action.payload.data;
        return {
          ...state,
          fetching: false,
          fetched: true,
          list: data
        }
      }

    //修改投票活动
    case 'UPDATE_ACTIVITY_PENDING':
      {
        return {
          ...state,
          fetching: true,
        }
      }
    case 'UPDATE_ACTIVITY_REJECTED':

      {
        return {
          ...state,
          fetching: false,
          error: action.payload,
        }
      }
    case 'UPDATE_ACTIVITY_FULFILLED':
      {
        let data = action.payload;
        //console.log('data---', data);
        let list = state.list;
        const newList = list.map(function (item, index){
          if(item.id == data.id){
            item = data;
          }
          return item;
        });
        //console.log('修改list', newList);
        return {
          ...state,
          fetching: false,
          fetched: true,
          list: newList,
        }
      }

      //删除投票活动
    case 'DELETE_ACTIVITY_PENDING':
      {
        return {
          ...state,
          fetching: true,
        }
      }
    case 'DELETE_ACTIVITY_REJECTED':

      {
        return {
          ...state,
          fetching: false,
          error: action.payload,
        }
      }
    case 'DELETE_ACTIVITY_FULFILLED':
      {
        let id = action.payload.Id;
        let list = state.list;
        const newList = list.filter(function (item, index){
          if(item.id == id){
            return false;
          }
          return true;
        });
        return {
          ...state,
          list: newList,
        }
      }
    ////from一变就修改富文本的值
    case 'CHANGE_EDITOR':
      {
        return {
          ...state,
          keepfrom: { ...state.keepfrom, ...action.payload },
        }
      }
    case 'SET_CACHE_FORM_VALUE':
    {
      return {
        ...state,
        keepfrom: { ...state.keepfrom, ...action.payload },
      }
    }
    default:
      return {
        ...state,
      }
  }
}
