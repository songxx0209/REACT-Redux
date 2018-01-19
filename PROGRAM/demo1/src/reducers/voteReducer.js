export default function reducer(state = {
  fetching: false,
  fetched: false,
  filter: '',
  content: null,
  error: null,
  delLoading: false,
}, action) {
  //console.log('woca', action);
  switch (action.type) {

    case 'FETCH_VOTE_DATA_PENDING':
      {
        //state.name =action.payload;
        return {
          ...state,
          fetching: true,
        }
      }
    case 'FETCH_VOTE_DATA_REJECTED':

      {
        //state.name =action.payload;
        return {
          ...state,
          fetching: false,
          error: action.payload,
        }
      }
    case 'FETCH_VOTE_DATA_FULFILLED':
      {
        //console.log('redux==',action.payload);
        const data = action.payload.data.content;
        //console.log('action.payload.data', action.payload.data)
        return {
          ...state,
          fetching: false,
          fetched: true,
          content: data
        }
      }
    case 'FILTER_TABLE_ITEM':
      {
        return {
          ...state,
          filter: action.payload,
        }
      }
    case 'FILTER_ACTIVE_ITEM':
      {
        const activeId = action.payload;
        let content = state.content;
        var newContent = content.filter(function (ele, index) {
          if (ele.activeId == activeId) {
            return null;
          }
          return ele;
        });
        return {
        ...state,
          content: newContent
        }
      }



    case 'FETCH_ZUOPING_DELETE_PADDING':
      {
        return {
          ...state,
          delLoading: true,
        }
      }
    case 'FETCH_ZUOPING_DELETE_FULFILLED':
      {
        console.log(window.location);
        return {
          ...state,
          delLoading: false,
        }
      }
    case 'FETCH_ZUOPING_DELETE_REJECTED':
      {
        return {
          ...state,
          delLoading: false,
        }
      }
    case 'FILTER_KEY_WORD':
      {
        const keyWords = action.payload;
        return {
          ...state,
          filter: keyWords,
        }
      }
    default: return {
      ...state,
    }
  }
}
