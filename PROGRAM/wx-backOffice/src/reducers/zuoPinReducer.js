export default function reducer(state = {
  zuoPinLoading: false,
  confirmLoading: false,
  data: [],
  sourceList: null,

  zuoPinModalIsShow: false,
  zuoPinModalInit: {
    source: {
      value: '',
    },
    title: {
      value: '',
    },
    author: {
      value: '',
    },
    description: {
      value: '',
    },
    img: {
      value: '',
    },
    link: {
      value: '',
    },
    content: '<p></p>',
  },
  tabkey: '1',
  activeId: '',
  optionId: '',
  addOrEdit: true,

  cacheValue: '',

  cacheMediaSrc: '',
  isMediaShow: false,

}, action) {
  switch (action.type) {
    case 'FETCH_ZUOPIN_TABLE_PENDING':
      {
        return {
          ...state,
          zuoPinLoading: true,
        }
      }
    case 'FETCH_ZUOPIN_TABLE_FULFILLED':
      {
        return {
          ...state,
          zuoPinLoading: false,
          data: action.payload,
        }
      }
    case 'FETCH_ZUOPIN_TABLE_REJECTED':
      {
        return {
          ...state,
          zuoPinLoading: false,
        }
      }
    case 'FETCH_ZUOPIN_ADD_PADDING':
      {
        return {
          ...state,
          confirmLoading: true,
        }
      }
    case 'FETCH_ZUOPIN_ADD_FULFILLED':
      {
        const data = action.payload.map(ele => {
          state.sourceList.forEach(item => {
            if (ele.source == item.source) {
              ele.sourceName = item.sourceName;
              ele.editable = false;
            }
          })
          return ele
        })
        return {
          ...state,
          zuoPinModalIsShow: false,
          confirmLoading: false,
          data,
          cacheMediaSrc: '',
        }
      }
    case 'FETCH_ZUOPIN_ADD_REJECTED':
      {
        return {
          ...state,
          zuoPinModalIsShow: false,
          confirmLoading: false,
          cacheMediaSrc: '',
        }
      }
    case 'FETCH_ZUOPIN_UPLOAD_PADDING':
      {
        return {
          ...state,
          confirmLoading: true,
        }
      }
    case 'FETCH_ZUOPIN_UPLOAD_FULFILLED':
      {
        const data = action.payload.map(ele => {
          state.sourceList.forEach(item => {
            if (ele.source === item.source) {
              ele.sourceName = item.sourceName;
              ele.editable = false;
            }
          })
          return ele;
        })
        return {
          ...state,
          zuoPinModalIsShow: false,
          confirmLoading: false,
          zuoPinLoading: false,
          data,
          cacheMediaSrc: '',
        }
      }
    case 'FETCH_ZUOPIN_UPLOAD_REJECTED':
      {
        return {
          ...state,
          zuoPinModalIsShow: false,
          confirmLoading: false,
          cacheMediaSrc: '',
        }
      }
    case 'FETCH_ZUOPIN_DELETE_PADDING':
      {
        return {
          ...state,
          zuoPinLoading: true,
        }
      }
    case 'FETCH_ZUOPIN_DELETE_FULFILLED':
      {
        const { activeId, optionId } = action.payload;
        const changeData = state.data.filter(item => {
          if (item.activeId == activeId && item.optionId == optionId) {
            return false
          } else {
            return true
          }
        })
        return {
          ...state,
          zuoPinLoading: false,
          data: changeData,
        }
      }
    case 'FETCH_ZUOPIN_DELETE_REJECTED':
      {
        return {
          ...state,
          zuoPinLoading: false,
        }
      }
    case 'FETCH_SOURCE_LIST_FULFILLED':
      {
        return {
          ...state,
          sourceList: action.payload.data.data,
        }
      }
    case 'CLEAR_ZUOPIN_TABLE':
      {
        return {
          ...state,
          data: [],
        }
      }
    case 'ZUOPIN_MODAL_SHOW':
      {
        const link = action.payload.link.value;
        let cacheMediaSrc = '';
        let isMediaShow = false;
        if (link) {
          cacheMediaSrc = new DOMParser().parseFromString(link, 'text/html').querySelector('iframe').getAttribute('src');
          isMediaShow = true;
        }
        return {
          ...state,
          zuoPinModalIsShow: true,
          zuoPinModalInit: action.payload,
          cacheMediaSrc,
          isMediaShow,
        }
      }
    case 'ZUOPIN_MODAL_COMFIRM_EDIT':
      {
        return {
          ...state,
          zuoPinModalInit: action.payload,
        }
      }
    case 'ZUOPIN_MODAL_HIDE':
      {
        return {
          ...state,
          zuoPinModalInit: {
            source: {
              value: '',
            },
            title: {
              value: '',
            },
            author: {
              value: '',
            },
            description: {
              value: '',
            },
            img: {
              value: '',
            },
            link: {
              value: '',
            },
            content: '<p></p>',
          },
          zuoPinModalIsShow: false,
          confirmLoading: false,
          cacheMediaSrc: '',
        }
      }
    case 'SET_ACTIVE_ID':
      {
        return {
          ...state,
          activeId: action.payload,
        }
      }
    case 'SET_OPTION_ID':
      {
        return {
          ...state,
          optionId: action.payload,
        }
      }
    case 'ADD_OR_EDIT':
      {
        return {
          ...state,
          addOrEdit: action.payload === 'add' ? true : false,
        }
      }
    case 'SET_TABKEY':
      {
        return {
          ...state,
          tabkey: action.payload,
        }
      }
    case 'EDIT_INDEX':
      {
        const { contentType, optionId, isEdit, cacheValue } = action.payload;
        const changeData = state.data.map(item => {
          const ele = item;
          if (item.contentType == contentType && item.optionId == optionId) {
            ele.editable = isEdit;
          } else {
            ele.editable = false;
          }
          return ele;
        });
        return {
          ...state,
          data: changeData,
          cacheValue,
        }
      }
    case 'EDIT_INDEX_CANCEL':
      {
        const changeData = state.data.map(item => {
          const ele = item;
          ele.editable = false;
          return ele;
        });
        return {
          ...state,
          data: changeData,
          cacheValue: '',
        }
      }
    case 'EDIT_INDEX_SAVE':
      {
        return {
          ...state,
        }
      }
    case 'SET_CACHE_VALUE':
      {
        return {
          ...state,
          cacheValue: action.payload,
        }
      }
    case 'SET_CACHE_EDITOR_VALUE': {
      return {
        ...state,
        zuoPinModalInit: { ...state.zuoPinModalInit, content: action.payload },
      }
    }
    case 'SET_CACHE_FORM_VALUE': {
      return {
        ...state,
        zuoPinModalInit: { ...state.zuoPinModalInit, ...action.payload },
      }
    }
    case 'FETCH_VOTE_SORT_PADDING': {
      return {
        ...state,
        zuoPinLoading: true,
      }
    }
    case 'FETCH_VOTE_SORT_FULFILLED': {
      const data = action.payload.map(ele => {
        state.sourceList.forEach(item => {
          if (ele.source === item.source) {
            ele.sourceName = item.sourceName;
            ele.editable = false;
          }
        })
        return ele;
      })
      return {
        ...state,
        zuoPinLoading: false,
        data,
      }
    }
    case 'FETCH_VOTE_SORT_REJECTED': {
      return {
        ...state,
        zuoPinLoading: false,
      }
    }
    case 'SET_CACHE_MEDIA_SRC': {
      return {
        ...state,
        cacheMediaSrc: action.payload.src,
        isMediaShow: action.payload.flag,
      }
    }
    default:
      return {
        ...state,
      }
  }
}
