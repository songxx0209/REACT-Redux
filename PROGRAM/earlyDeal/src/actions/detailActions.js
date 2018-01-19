import axios from 'axios';

export function fetchDetail(videoId, videoTypeId, videoSetId) {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_DETAIL',
      payload: axios.get(`${ENV.api}/video/getVideo.do?videoId=${videoId}&videoTypeId=${videoTypeId}&videoSetId=${videoSetId}`),
    });
  };
}

export function clearDetail() {
  return {
    type: 'CLEAR_DETAIL',
  };
}

