import requests from '@/util/request'

// 分页查询
export function legislationCollectList(data) {
  return requests({
    url: '/xj-legislation/LegYearPlan/findPage',
    method: 'post',
    data,
  });
}

//征集类型字典
export function collectTypeDict() {
  return requests({
    url: '/xj-legislation/LegYearPlan/getSolicitationType',
    method: 'get',
  });
}

// 详情
export function Detail(id) {
  return requests({
    url: `/xj-legislation/LegYearPlan/details`,
    method: "GET",
    params: { id },
  });
}

//新增
export function addLegislationCollect(data) {
  return requests({
    url: '/xj-legislation/LegYearPlan/save',
    method: "post",
    data
  })
}

//修改
export function editLegislationCollect(data) {
  return requests({
    url: '/xj-legislation/LegYearPlan/modify',
    method: "put",
    data
  })
}

//删除
export function Delete(id) {
  return requests({
    url: '/xj-legislation/LegYearPlan/delete',
    method: "delete",
    data: [id]
  })
}

// 查询部门下拉树结构
export function treeselect () {
  return requests({
    url: '/system/dept/treeselect',
    method: 'get'
  })
}

// 查询用户列表
export function listUser (query) {
  return requests({
    url: '/system/user/list',
    method: 'get',
    params: query
  })
}