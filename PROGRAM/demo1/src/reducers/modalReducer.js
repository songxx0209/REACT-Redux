export default function reducer(state = {
  modalIsShow: false,
  firstShow: false,
  firstTableForm:  null,
  posterImg: '',
  mediaSrc: '',
  isVideoShow: false,
  initData: {
    videoImage: '',
  },
  sourceData: null,
  confirmLoading: false,
  tabkey: '1',
}, action) {
  switch (action.type) {
    case 'FETCH_SOURCE_SELECT_FULFILLED':
      {
        return {
          ...state,
          sourceData: action.payload.data.data,
        }
      }
    case 'MODAL_SHOW':
      {
        return {
          ...state,
          modalIsShow: action.payload,
        }
      }
    case 'CLEAR_ALL':
      {
        return {
          ...state,
          firstTableForm: null,
        }
      }
    case 'FIRST_MODAL_SHOW':
      {
        return {
          ...state,
          firstShow: action.payload,
        }
      }
    case 'FIRST_TABLE_FROM':
      {
        return {
          ...state,
          firstTableForm: {
            title: action.payload.title,
            startTime: action.payload.startTime,
            endTime: action.payload.endTime,
            state: action.payload.state
          },
        }
      }
    case 'MODAL_INIT':
      {
        return {
          ...state,
          posterImg: action.payload.videoImage,
          mediaSrc: action.payload.mediaSrc,
          isVideoShow: action.payload.mediaSrc ? true : false,
          initData: action.payload,
        }
      }
    case 'CHANGE_IMG_SRC':
      {
        return {
          ...state,
          posterImg: action.payload,
        }
      }
    case 'CHANGE_VIDEO_SRC':
      {
        return {
          ...state,
          isVideoShow: action.payload ? true : false,
          mediaSrc: action.payload,
        }
      }
    case 'FETCH_ZUOPING_TABLE_PADDING':
      {
        return {
          ...state,
          confirmLoading: true,
        }
      }
    case 'FETCH_ZUOPING_TABLE_FULFILLED':
      {
        return {
          ...state,
          confirmLoading: false,
          modalIsShow: false,
        }
      }
    case 'FETCH_ZUOPING_TABLE_REJECTED':
      {
        return {
          ...state,
          confirmLoading: false,
          modalIsShow: false,
        }
      }
    case 'SET_TABKEY':
      {
        return {
          ...state,
          tabkey: action.payload,
        }
      }
    default:
      return {
        ...state,
      }
  }
}
