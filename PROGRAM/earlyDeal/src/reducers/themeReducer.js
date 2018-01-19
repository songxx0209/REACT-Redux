export default function reducer(state = {
  loading: false,
  fetched: false,
  filter: '',
  filterArr: [],
  themeTypeList: [],
  themeAttrList: [],
  themes: null,
  error: null,
}, action) {
  switch (action.type) {
    case 'FETCH_THEME_TYPE_PENDING':
      {
        return {
          ...state,
          loading: true,
        };
      }
    case 'FETCH_THEME_TYPE_REJECTED':
      {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    case 'FETCH_THEME_TYPE_FULFILLED':
      { let checkedList = [];
        action.payload.forEach((item) => {
          if (item.attrArr) {
            item.attrArr.forEach((ele) => {
              checkedList = checkedList.concat(`0-${ele.themeTypeId}-${ele.attrTypeId}`);
            });
          }
        });
        return {
          ...state,
          loading: false,
          fetched: true,
          themeTypeList: action.payload,
          filterArr: checkedList,
        };
      }
    case 'FETCH_THEME_ATTR_PENDING':
      {
        return {
          ...state,
          loading: true,
        };
      }
    case 'FETCH_THEME_ATTR_REJECTED':
      {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    case 'FETCH_THEME_ATTR_FULFILLED':
      {
        return {
          ...state,
          loading: false,
          fetched: true,
          //filterArr: checkList,
        };
      }
    case 'FETCH_THEME_PENDING':
      {
        return {
          ...state,
          loading: true,
        };
      }
    case 'FETCH_THEME_REJECTED':
      {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    case 'FETCH_THEME_FULFILLED':
      {
        return {
          ...state,
          loading: false,
          fetched: true,
          themes: action.payload,
        };
      }
    case 'CLEAR_THEME':
      {
        return {
          ...state,
          themes: null,
          filter: '',
        };
      }
    case 'FILTER_THEME':
      {
        return {
          ...state,
          filter: action.payload,
        };
      }
    case 'CHECK_THEME':
      {
        return {
          ...state,
          filterArr: action.payload,
        };
      }
    default: return {
      ...state,
    };
  }
}
