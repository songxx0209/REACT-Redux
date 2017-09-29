import I from 'immutable';


const initialize = I.Map({
  list: [1, 2, 3],
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
      // console.log('axios==', action.payload);
      const articleInfo = JSON.parse(action.payload);

      // console.log('ss', state.get('List'));
      // const data = state.set('List', articleInfo);
      // console.log('data.get()', data);
      return state.set('list', articleInfo);
    }
    default:
    {
      return state;
    }
  }
}
