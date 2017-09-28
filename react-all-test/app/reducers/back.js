
const initialize = {
  three: 'three',
  four: 'four',
  article: null,
};

export default function reducer(state = initialize, action) {
  switch (action.type) {
    case 'CHANGE_THREE':
    {
      return {
        ...state,
        three: action.payload,
      };
    }
    case 'CHANGE_FOUR':
    {
      return {
        ...state,
        four: action.payload,
      };
    }
    // case 'GET_DATA_FULFILLED':
    //   {
    //     console.log('axios==', action.payload);
    //     return {
    //       ...state,
    //       article: action.payload,
    //     }
    //   }

    case 'GET_DATA':
    {
      console.log('axios==', action.payload);
      return {
        ...state,
        article: action.payload,
      };
    }
    default:
    {
      return {
        ...state,
      };
    }
  }
}
