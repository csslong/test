import requests from '@/util/request'

// 分页查询
export function getManageList(data) {
  return requests({
    url: '/xj-legislation/LegYearManage/findPage',
    method: 'post',
    data,
  });
}