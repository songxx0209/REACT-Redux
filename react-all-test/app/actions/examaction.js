import request from '../lib/request';

// 修改 保存新的id
export const modifyId = (name, id) => {
  return {
    type: 'MODIFY_ID',
    payload: {
      name,
      id,
    },
  };
};

// 添加省份
export const addProvince = (province_name, enable) => {
  return {
    type: 'ADD_PROVINCE',
    payload: request.post('/examapi/api/v1/province', {
      province_name,
      enable,
    }),
  };
}
// 获取所有省份信息
export const fetchProvince = () => {
  return {
    type: 'FETCH_PROVINCE',
    payload: request.get('/examapi/api/v1/0/province'),
  };
}
// 编辑 省份信息
export const modifyProvince = (id, province_name, enable) => {
  return {
    type: 'MODIFY_PROVINCE',
    payload: request.put(`/examapi/api/v1/${id}/province`, {
      province_name,
      enable,
    }),
  };
}
// 删除 省份
export const deleteProvince = (id) => {
  return {
    type: 'DELETE_PROVINCE',
    payload: request.delete(`/examapi/api/v1/${id}/province`),
  };
}

// 获取省份下所有学校信息
export const fetchUniversity = (provId) => {
  return {
    type: 'FETCH_UNIVERSITY',
    payload: request.get(`/examapi/api/v1/${provId}/university`),
  };
}
// 添加学校
export const addUniversity = (province_id, university_name, enable) => {
  return {
    type: 'ADD_UNIVERSITY',
    payload: request.post('/examapi/api/v1/university', {
      province_id,
      university_name,
      enable,
    }),
  };
}
// 编辑学校
export const modifyUniversity = (province_id, university_name, enable, university_id) => {
  return {
    type: 'MODIFY_UNIVERSITY',
    payload: request.put(`/examapi/api/v1/${province_id}/university/${university_id}`, {
      university_name,
      enable,
      university_id
    }),
  };
}
// 删除学校
export const deleteUniversity = (province_id, university_id) => {
  return {
    type: 'DELETE_UNIVERSITY',
    payload: request.delete(`/examapi/api/v1/${province_id}/university/${university_id}`),
  };
}


// 获取学校下所有 学院
export const fetchCollege = (university_id) => {
  return {
    type: 'FETCH_COLLEGE',
    payload: request.get(`/examapi/api/v1/${university_id}/college`),
  };
}
// 添加学院
export const addCollege = (university_id, college_name) => {
  return {
    type: 'ADD_COLLEGE',
    payload: request.post('/examapi/api/v1/college', {
      university_id,
      college_name,
    }),
  };
}
// 编辑学院
export const modifyCollege = (university_id, college_id, college_name, enable) => {
  return {
    type: 'MODIFY_COLLEGE',
    payload: request.put(`/examapi/api/v1/${university_id}/college/${college_id}`, {
      college_name,
      enable,
    }),
  };
}
// 删除学院
export const deleteCollege = (university_id, college_id) => {
  return {
    type: 'DELETE_COLLEGE',
    payload: request.delete(`/examapi/api/v1/${university_id}/college/${college_id}`),
  };
}


// 获取学院下所有专业
export const fetchMajor = (college_id) => {
  return {
    type: 'FETCH_MAJOR',
    payload: request.get(`/examapi/api/v1/${college_id}/major`),
  };
}
// 添加专业
export const addMajor = (college_id, major_id) => {
  return {
    type: 'ADD_MAJOR',
    payload: request.post(`/examapi/api/v1/${college_id}/major/${major_id}`, {
      province_name,
      enable,
    }),
  };
}
// 编辑专业
export const modifyMajor = (id, province_name, enable) => {
  return {
    type: 'MODIFY_MAJOR',
    payload: request.put(`/examapi/api/v1/${id}/province`, {
      province_name,
      enable,
    }),
  };
}
// 删除专业
export const deleteMajor = (college_id, major_id) => {
  return {
    type: 'DELETE_MAJOR',
    payload: request.delete(`/examapi/api/v1/${college_id}/major/${major_id}`),
  };
}