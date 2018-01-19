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





    // 获取 - 学校
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
    // 添加学校
    case 'ADD_UNIVERSITY_PENDING':
      return { ...state, fetching: true }
    case 'ADD_UNIVERSITY_FULFILLED':
      return { ...state, fetching: false }
    case 'ADD_UNIVERSITY_REJECTED':
      return { ...state, fetching: false }
    // 编辑省份信息
    case 'MODIFY_UNIVERSITY_PENDING':
      return { ...state, fetching: true }
    case 'MODIFY_UNIVERSITY_FULFILLED':
      return { ...state, fetching: false }
    case 'MODIFY_UNIVERSITY_REJECTED':
      return { ...state, fetching: false }
    // 删除省份
    case 'DELETE_UNIVERSITY_PENDING':
      return { ...state, fetching: true }
    case 'DELETE_UNIVERSITY_FULFILLED':
      return { ...state, fetching: false }
    case 'DELETE_UNIVERSITY_REJECTED':
    {
      return { ...state, fetching: false }
    }



    // 获取 - 学院
    case 'FETCH_COLLEGE_PENDING':
      return { ...state, fetching: true }
    case 'FETCH_COLLEGE_FULFILLED':
      return {
        ...state,
        fetching: false,
        college: payload.data.data,
      }
    case 'FETCH_COLLEGE_REJECTED':
      return { ...state, fetching: false }
    // 添加学院
    case 'ADD_COLLEGE_PENDING':
      return { ...state, fetching: true }
    case 'ADD_COLLEGE_FULFILLED':
      return { ...state, fetching: false }
    case 'ADD_COLLEGE_REJECTED':
      return { ...state, fetching: false }
    // 编辑学院
    case 'MODIFY_COLLEGE_PENDING':
      return { ...state, fetching: true }
    case 'MODIFY_COLLEGE_FULFILLED':
      return { ...state, fetching: false }
    case 'MODIFY_COLLEGE_REJECTED':
      return { ...state, fetching: false }
    // 删除学院
    case 'DELETE_COLLEGE_PENDING':
      return { ...state, fetching: true }
    case 'DELETE_COLLEGE_FULFILLED':
      return { ...state, fetching: false }
    case 'DELETE_COLLEGE_REJECTED':
      return { ...state, fetching: false }





    // 获取 - 专业
    case 'FETCH_MAJOR_PENDING':
      return { ...state, fetching: true }
    case 'FETCH_MAJOR_FULFILLED':
      return {
        ...state,
        fetching: false,
        major: payload.data.data,
      }
    case 'FETCH_MAJOR_REJECTED':
      return { ...state, fetching: false }
    // 添加专业
    case 'ADD_MAJOR_PENDING':
      return { ...state, fetching: true }
    case 'ADD_MAJOR_FULFILLED':
      return { ...state, fetching: false }
    case 'ADD_MAJOR_REJECTED':
      return { ...state, fetching: false }
    // 编辑专业
    case 'MODIFY_MAJOR_PENDING':
      return { ...state, fetching: true }
    case 'MODIFY_MAJOR_FULFILLED':
      return { ...state, fetching: false }
    case 'MODIFY_MAJOR_REJECTED':
      return { ...state, fetching: false }
    // 删除专业
    case 'DELETE_MAJOR_PENDING':
      return { ...state, fetching: true }
    case 'DELETE_MAJOR_FULFILLED':
      return { ...state, fetching: false }
    case 'DELETE_MAJOR_REJECTED':
      return { ...state, fetching: false }
    
    // 获取学生
    case 'FETCH_EXAMINEE_PENDING':
      return { ...state, fetching: true }
    case 'FETCH_EXAMINEE_FULFILLED':
      return {
        ...state,
        fetching: false,
        examinee: payload.data.data,
      }
    case 'FETCH_EXAMINEE_REJECTED':
      return { ...state, fetching: false }


    default:
    {
      return state;
    }
  }
}
