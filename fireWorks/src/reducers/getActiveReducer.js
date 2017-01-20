export default function reducer(state = {
  appId: '',
  clickAble: true,
  rewardsId: '',
  popMark: false,
  display: 'display',
  ruleText: '',
  ruleMark: false,
  spinning: true,
  spinErr: false,
  spinOk: true,
  historyMark: false,
  historyText: '',
}, action) {
  switch (action.type) {
    case 'GET_USERINFO_FULFILLED':
      {
        return {
          ...state,
          appId: action.data,
        };
      }
    case 'GET_DATA_FULFILLED':
      {
        return {
          ...state,
          ruleText: action.payload.remark,
          spinning: false,
        };
      }
    case 'GET_REWARD_INFO_PENDING':
      {
        return {
          ...state,
          clickAble: false,
          display: 'none',
          fetching: true,
        };
      }
    case 'GET_REWARD_INFO_FULFILLED':
      {
        const { rewardsId } = action.payload;
        return {
          ...state,
          popMark: true,
          clickAble: true,
          rewardsId,
          fetching: false,
        };
      }
    case 'GET_REWARD_INFO_REJECTED':
      {
        return {
          ...state,
          display: 'block',
          clickAble: true,
          fetching: false,
        };
      }
    case 'GET_COUNT_PENDING':
      {
        return {
          ...state,
          clickAble: false,
        };
      }
    case 'GET_COUNT_REJECTED':
      {
        return {
          ...state,
          clickAble: true,
        };
      }
    case 'MODULE_HIDE':
      {
        return {
          ...state,
          popMark: false,
          clickAble: true,
          display: 'block',
        };
      }
    case 'RULE_MODAL':
      {
        return {
          ...state,
          ruleMark: action.payload,
        };
      }
    case 'SPIN_ERR':
      {
        return {
          ...state,
          spinErr: true,
          spinOk: false,
        };
      }
    case 'GET_RECORD_FULFILLED':
      {
        return {
          ...state,
          historyMark: true,
          historyText: action.payload.data.data,
        };
      }
    case 'GET_RECORD_REJECTED':
      {
        return {
          ...state,
          historyMark: true,
          historyText: 'error',
        };
      }
    case 'HISTORY_MODAL_HIDE':
      {
        return {
          ...state,
          historyMark: false,
        };
      }
    default:
      return {
        ...state,
      };
  }
}
