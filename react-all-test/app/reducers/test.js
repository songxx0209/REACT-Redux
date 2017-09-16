
let initialize = {
  one: 'one',
  tow: 'tow',
  // three: 'three',
  // four: 'four'
}

export default function reducer(state = initialize, action) {
  
  switch (action.type) {

    case 'CHANGE_ONE':
      {
        return {
          ...state,
          one: action.payload,
        }
      }
    case 'CHANGE_TOW':
      {
        return {
          ...state,
          tow: action.payload,
        }
      }
    // case 'CHANGE_THREE':
    //   {
    //     return {
    //       ...state,
    //       three: action.payload,
    //     }
    //   }
    // case 'CHANGE_FOUR':
    //   {
    //     return {
    //       ...state,
    //       four: action.payload,
    //     }
    //   }
    default:
      {
        return {
          ...state,
        }
      }
      
  }
}
