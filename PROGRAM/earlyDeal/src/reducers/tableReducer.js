export default function reducer(state = {
  fetching: false,
  fetched: false,
  isStar: false,
  filter: '',
  items: [],
  starItems: [],
  error: null,
}, action) {
  switch (action.type) {
    case 'FETCH_TABLE_PENDING':
      {
        return {
          ...state,
          fetching: true,
        };
      }
    case 'FETCH_TABLE_REJECTED':
      {
        return {
          ...state,
          fetching: false,
          isStar: false,
          error: action.payload,
        };
      }
    case 'FETCH_TABLE_FULFILLED':
      {
        return {
          ...state,
          fetching: false,
          isStar: false,
          fetched: true,
          items: action.payload.data.data,
        };
      }
    case 'FETCH_STAR_TABLE_PENDING':
      {
        return {
          ...state,
          fetching: true,
        };
      }
    case 'FETCH_STAR_TABLE_REJECTED':
      {
        return {
          ...state,
          fetching: false,
          isStar: true,
          error: action.payload,
        };
      }
    case 'FETCH_STAR_TABLE_FULFILLED':
      {
        return {
          ...state,
          isStar: true,
          fetching: false,
          fetched: true,
          starItems: action.payload.data.data,
        };
      }
    case 'CLEAR_STAR_TABLE_FULFILED':
      {
        return {
          ...state,
          isStar: false,
          fetching: false,
          fetched: true,
        };
      }
    case 'FILTER_TABLE':
      {
        return {
          ...state,
          filter: action.payload,
        };
      }
    default: return {
      ...state,
    };
  }
}

