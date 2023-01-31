import requests from '@/util/request'

// 分页查询
export function getTaskAdminList(data) {
  return requests({
    url: '/xj-legislation/LegAssessTask/findPage',
    method: 'post',
    data,
  });
}