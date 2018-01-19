import I from 'immutable';


const initialize = I.Map({
  list: [],
});

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

    case 'GET_DATA':
    {
      return state.set('list', action.payload);
    }
    default:
    {
      return state;
    }
  }
}
