export default function reducer(state = {
  fetching: false,
  fetched: false,
  data: null,
  error: null,
}, action) {
  switch (action.type) {
    case 'GET_STAR_PENDING':
      {
        return {
          ...state,
          fetching: true,
        };
      }
    case 'GET_STAR_REJECTED':
      {
        return {
          ...state,
          fetching: false,
          error: action.payload,
        };
      }
    case 'GET_STAR_FULFILLED':
      {
        return {
          ...state,
          fetching: false,
          fetched: true,
          data: action.payload.data,
        };
      }

    default: return {
      ...state,
    };
  }
}
