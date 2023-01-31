import requests from '@/util/request';

// 文件校验
export function checkFileMd5Api(data) {
  return requests({
    url: '/gx-attachment/attachment/manage/checkFileMd5',
    method: 'post',
    data,
  });
}
// 查询文件
export function checkFileApi(data) {
  return requests({
    url: '/gx-attachment/attachment/obtain/detail',
    method: 'post',
    data,
  });
}
// 多文件上传
export function multipartUploadApi(data) {
  return requests({
    url: '/gx-attachment/attachment/manage/multipart-upload',
    method: 'post',
    data,
  });
}
// 附件合并
export function mergeFileApi(data) {
  return requests({
    url: '/gx-attachment/attachment/manage/merge-file',
    method: 'post',
    data,
  });
}

// 下载文件
export function downloadFileApi(data) {
  const params = {
    module: 'gx-law',
  };
  Object.assign(params, data);
  return requests({
    url: '/gx-attachment/attachment/obtain/download',
    method: 'get',
    responseType: 'blob',
    params,
  });
}

// 预览文件-pdf预览
export function previewFileApi(id) {
  return requests({
    url: `/gx-attachment/attachment/obtain/preview-word2pdf/${id}`,
    method: 'get',
    responseType: 'blob',
    params: {
      module: 'gx-law',
    },
  });
}

// 导出--纯净版
export function exportPureApi(params) {
  return requests({
    url: `/gx-legislative/legislative/preview/pure`,
    method: 'post',
    responseType: 'blob',
    params,
  });
}
// 导出--注释版
export function exportAnnotationApi(params) {
  return requests({
    url: `/gx-legislative/legislative/preview/annotation`,
    method: 'post',
    params,
  });
}
// 导出--参阅资料版
export function exportReferenceApi(params) {
  return requests({
    url: `/gx-legislative/legislative/preview/reference`,
    method: 'post',
    params,
  });
}
