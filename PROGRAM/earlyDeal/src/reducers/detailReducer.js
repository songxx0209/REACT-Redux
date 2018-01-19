export default function reducer(state = {
  fetching: false,
  fetched: false,
  data: null,
  error: null,
}, action) {
  switch (action.type) {
    case 'FETCH_DETAIL_PENDING':
      {
        return {
          ...state,
          fetching: true,
        };
      }
    case 'FETCH_DETAIL_REJECTED':
      {
        return {
          ...state,
          fetching: false,
          error: action.payload,
        };
      }
    case 'FETCH_DETAIL_FULFILLED':
      {
        return {
          ...state,
          fetching: false,
          fetched: true,
          data: action.payload.data.data,
        };
      }
    case 'CLEAR_DETAIL':
      {
        return {
          ...state,
          data: null,
        };
      }
    default: return {
      ...state,
    };
  }
}
