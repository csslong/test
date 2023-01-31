import requests from '@/util/request'

// 分页查询
export function getPlanList(data) {
  return requests({
    url: '/xj-legislation/LegPlanOut/findPage',
    method: 'post',
    data,
  });
}

// 导入项目接口
export function importItem(params) {
  return requests({
    url: "/xj-legislation/LegPlanOut/importData",
    method: "post",
    params,
  });
}

// 详情
export function getItemDefault(id) {
  return requests({
    url: `/xj-legislation/LegPlanOut/details/${id}`,
  });
}

//新增
export function addOutSidePlan(data) {
  return requests({
    url: '/xj-legislation/LegPlanOut/save',
    method: "post",
    data
  })
}

// 项目分类字典
export function getItemDict() {
  return requests({
    url: "/xj-legislation/LegPlanOut/getClassification",
  });
}

// 制定形式字典
export function DevelopFormDict() {
  return requests({
    url: "/xj-legislation/LegPlanOut/getFrom",
  });
}

// 详情
export function Detail(id) {
  return requests({
    url: `/xj-legislation/LegPlanOut/details/${id}`,
    method: "GET",
  });
}

// 删除
export function Delete(id) {
  return requests({
    url: `/xj-legislation/LegPlanOut/delete`,
    method: "DELETE",
    data: [id]
  });
}

// 修改
export function Modify(data) {
  return requests({
    url: `/xj-legislation/LegPlanOut/modify`,
    method: "PUT",
    data
  });
}