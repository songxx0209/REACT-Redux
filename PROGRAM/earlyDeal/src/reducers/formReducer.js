export default function reducer(state = {
  videoFetching: false,
  vModalShow: false,
  starFetching: false,
  sModalShow: false,
}, action) {
  switch (action.type) {
    case 'ADD_VIDEO_PENDING':
      {
        return {
          ...state,
          videoFetching: true,
        };
      }
    case 'ADD_VIDEO_REJECTED':
      {
        return {
          ...state,
          videoFetching: false,
          vModalShow: false,
        };
      }
    case 'ADD_VIDEO_FULFILLED':
      {
        return {
          ...state,
          videoFetching: false,
          vModalShow: false,
        };
      }
    case 'VIDEO_MODEL_OPEN':
      {
        return {
          ...state,
          vModalShow: true,
        };
      }
    case 'VIDEO_MODEL_CLOSE':
      {
        return {
          ...state,
          vModalShow: false,
        };
      }
    case 'ADD_STAR_PENDING':
      {
        return {
          ...state,
          starFetching: true,
        };
      }
    case 'ADD_STAR_REJECTED':
      {
        return {
          ...state,
          starFetching: false,
          sModalShow: false,
        };
      }
    case 'ADD_STAR_FULFILLED':
      {
        return {
          ...state,
          starFetching: false,
          sModalShow: false,
        };
      }
    case 'STAR_MODEL_OPEN':
      {
        return {
          ...state,
          sModalShow: true,
        };
      }
    case 'STAR_MODEL_CLOSE':
      {
        return {
          ...state,
          sModalShow: false,
        };
      }
    default: return {
      ...state,
    };
  }
}

