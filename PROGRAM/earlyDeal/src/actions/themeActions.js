import axios from 'axios';

export function fetchTheme(themeId, videoTypeId = 1) {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_THEME_PENDING',
    });
    // function getThemes() {
    //   return axios.get(`${ENV.api}/video/getThemeList.do?videoId=${themeId}&pageNum=1&pageSize=3000`)
    // }
    // function getThemeType() {
    //   return axios.get(`${ENV.api}/type/themeList.do?videoTypeId=${videoTypeId}`);
    // }
    //, getThemeType()
    // axios.all([getThemes()])
    axios.get(`${ENV.api}/theme/getThemeList.do?videoId=${themeId}&pageNum=1&pageSize=3000`)
    .then((themes) => {
      const data = themes.data.data.map((ele) => {
        const item = ele;
        item.tag = `0-${ele.themeTypeId}-${ele.videoAttrId}`;
        return item;
      });
      return data;
    })
    .then((res) => {
      dispatch({
        type: 'FETCH_THEME_FULFILLED',
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: 'FETCH_THEME_REJECTED',
        payload: err,
      });
    });
  };
}
//,typeList
//  typeList.data.data.forEach(item => {
//           if (ele.themeTypeId === item.themeTypeId) {
//             ele.themeTypeName = item.themeTypeName;
//           }
//         })

export function clearTheme() {
  return {
    type: 'CLEAR_THEME',
  };
}

export function filterTheme(filterword) {
  return {
    type: 'FILTER_THEME',
    payload: filterword,
  };
}

export function checkTheme(filterword) {
  return {
    type: 'CHECK_THEME',
    payload: filterword,
  };
}

// export function fetchThemeType(id) {
//   return function (dispatch) {
//     dispatch({
//       type: 'FETCH_THEME_TYPE',
//       payload: axios.get(`${ENV.api}/type/themeList.do?videoTypeId=${id}`),
//     });
//   }
// }

export function fetchThemeType(id, tid = 0) {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_THEME_TYPE_PENDING',
    });
    function getAttr() {
      return axios.get(`${ENV.api}/theme/getVideoAttrList.do?videoTypeId=${id}&themeTypeId=${tid}`);
    }

    function getThemeType() {
      return axios.get(`${ENV.api}/theme/getThemeTypeList.do?videoTypeId=${id}`);
    }

    axios.all([getAttr(), getThemeType()])
    .then(axios.spread((attrList, typeList) => {
      const data = typeList.data.data.map((ele) => {
        attrList.data.data.forEach((item) => {
          if (ele.themeTypeId === item.themeTypeId) {
            ele.attrArr = (ele.attrArr || []).concat(item);
          }
        });
        return ele;
      });
      return data;
    }))
    .then((res) => {
      dispatch({
        type: 'FETCH_THEME_TYPE_FULFILLED',
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: 'FETCH_THEME_TYPE_REJECTED',
        payload: err,
      });
    });
  };
}

export function fetchThemeAttr(id) {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_THEME_ATTR',
      payload: axios.get(`${ENV.api}/theme/getVideoAttrList.do?themeTypeId=${id}`),
    });
  };
}

// export function fetchThemeType(id) {
//   return function (dispatch) {
//     dispatch({
//       type: 'FETCH_THEME_TYPE_PENIDING',
//     });

//     axios({
//       method: 'get',
//       url: `${ENV.api}/type/themeList.do?videoTypeId=${id}`,
//     }).then((res) => {
//       dispatch({
//         type: 'ADD_VIDEO_FULFILLED',
//       });
//       if (res.data.success === true) {
//         openNotification('success', res.data.msg);
//       } else {
//         openNotification('success', res.data.msg);
//       }
//     }).catch((error) => {
//       dispatch({
//         type: 'ADD_VIDEO_REJECTED',
//       });
//       openNotification('error', '添加失败！');
//     });
//   }
// }

