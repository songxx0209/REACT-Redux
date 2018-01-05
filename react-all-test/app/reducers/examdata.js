
// import { notification } from 'antd';
import { ID } from '../lib/const';

const { PROVINCE, UNIVERSITY, COLLEGE, MAJOR, EXAMINEE } = ID;

const initialize = {
  fetching: false, // loading状态
  province: [],
  [PROVINCE]: 0, // 省份信息
  university: [],
  [UNIVERSITY]: 0, // 学校信息
  college: [],
  [COLLEGE]: 0, // 学院信息
  major: [],
  [MAJOR]: 0, // 专业信息
  examinee: [],
  [EXAMINEE]: 0 // 考生信息
};

export default function reducer(state = initialize, { type, payload }) {
  switch (type) {
    case 'MODIFY_ID':
      return {
        ...state,
        [payload.name]: payload.id,
      };

    // 添加省份
    case 'ADD_PROVINCE_PENDING':
      return { ...state, fetching: true }
    case 'ADD_PROVINCE_FULFILLED':
      return { ...state, fetching: false }
    case 'ADD_PROVINCE_REJECTED':
      return { ...state, fetching: false }

    // 获取所有省份信息
    case 'FETCH_PROVINCE_PENDING':
      return { ...state, fetching: true }
    case 'FETCH_PROVINCE_FULFILLED':
      return {
        ...state,
        fetching: false,
        province: payload.data.data,
      }
    case 'FETCH_PROVINCE_REJECTED':
      return { ...state, fetching: false }

    // 编辑省份信息
    case 'MODIFY_PROVINCE_PENDING':
      return { ...state, fetching: true }
    case 'MODIFY_PROVINCE_FULFILLED':
      return { ...state, fetching: false }
    case 'MODIFY_PROVINCE_REJECTED':
      return { ...state, fetching: false }

    // 删除省份
    case 'DELETE_PROVINCE_PENDING':
      return { ...state, fetching: true }
    case 'DELETE_PROVINCE_FULFILLED':
      return { ...state, fetching: false }
    case 'DELETE_PROVINCE_REJECTED':
    {
      return { ...state, fetching: false }
    }  
      
    // 获取省份 下的所有学校
    case 'FETCH_UNIVERSITY_PENDING':
      return { ...state, fetching: true }
    case 'FETCH_UNIVERSITY_FULFILLED':
      return {
        ...state,
        fetching: false,
        university: payload.data.data,
      }
    case 'FETCH_UNIVERSITY_REJECTED':
      return { ...state, fetching: false }
    
    default:
    {
      return state;
    }
  }
}
