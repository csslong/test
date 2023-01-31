import axios from '@/util/request'

// 创建小组
export function createTeam(data) {
  return axios({
    url: '/gx-legislative/legislative/cooperation/addTaskPerson',
    method: 'post',
    data,
  });
}

// 创建小组--起草小组使用
export function createTeam1(data) {
  return axios({
    url: '/gx-legislative/legislative/team/add',
    method: 'post',
    data,
  });
}