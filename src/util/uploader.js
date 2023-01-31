import { message } from 'ant-design-vue';
import BMF from 'browser-md5-file';

import {
  checkFileMd5Api, // 校验文件完整性
  multipartUploadApi, // 文件碎片上传
  mergeFileApi, // 合并文件碎片
} from '@/api/public/attachment';

const bmf = new BMF();

/** 流程逻辑：
 * 判断该文件是否已经上传过？
 *  - 上传过
 *    - 已上传完毕：不请求地址，直接显示上传成功
 *    - 未上传完毕：前端切片，接着上传
 *        - 并且上传完剩下一部分之后
 *        - 请求合并接口（要请求「合并接口」，为了让后端将authCode一样的碎片拼接成完成的文件，然后返回文件的id给我们）
 *  - 未上传：切片上传
 */

export default {
  // 1. 获取文件的md5值
  // md5 是否与后端保存的一致，用于判断，是否上传过。
  getFileMd5(file, successFn) {
    bmf.md5(file, (checkMessage, md5) => {
      if (checkMessage) {
        message.error(checkMessage);
      } else {
        successFn(md5);
      }
    });
  },
  // 2.判断是否上传过
  // businessPath: 路由地址
  checkFileMd5(file, businessPath, module, callBack, errBack) {
    
    this.getFileMd5(file, (md5Key) => {
      
      checkFileMd5Api({
        md5: md5Key,
        fileName: file.name,
        fileSize: file.size,
        module: module,
        businessPath: businessPath,
        publicResource: true,
      })
        .then((response) => {
          // console.log(response)
          
          const data = response.data.data;
          const isChunk = data.row.isChunk || '';
          const authCode = data.row.authCode || '';
          const chunkMaxIndex = data.row.chunkMaxIndex || '';
          const chunkSize = data.row.chunkSize || '';
          
          /**
           * 上传状态：
           *   - 100 已经上传
           *   - 101 未上传
           *   - 102 上传过一部分
           */
          if (data.result == 100) {
            // console.log(data)
            // debugger;
            callBack(data.row);
          } else if (data.result == 101) {
            if (isChunk) {
              let successCount = 0;
              for (let index = 0; index < chunkMaxIndex; index++) {
                let blob = file.slice(
                  index * chunkSize,
                  index * chunkSize + chunkSize
                );
                let formData = new FormData();
                formData.append('authCode', authCode);
                formData.append('chunkIndex', index);
                formData.append('file', blob);
                multipartUploadApi(formData)
                  .then((res) => {
                    successCount++;
                    if (successCount == chunkMaxIndex) {
                      mergeFileApi({
                        fileName: file.name,
                        authCode: authCode,
                      })
                        .then((res) => {
                          const params = {
                            id: res.data,
                            module,
                          };
                          callBack(params);
                        })
                        .catch((err) => {
                          errBack(err);
                        });
                    }
                  })
                  .catch((err) => {
                    errBack(err);
                  });
              }
            } else {
              let formData = new FormData();
              formData.append('authCode', authCode);
              formData.append('chunkIndex', 0);
              formData.append('file', file);
              multipartUploadApi(formData)
                .then((res) => {
                  const params = {
                    id: res.data,
                    module,
                  };
                  callBack(params);
                })
                .catch((err) => {
                  errBack(err);
                });
            }
          } else if (data.result == 102) {
            const uploadIndex = data.row.uploadIndex;
            if (uploadIndex.length == chunkMaxIndex) {
              mergeFileApi({
                fileName: file.name,
                authCode: authCode,
              })
                .then((res) => {
                  callBack(res.data);
                })
                .catch((err) => {
                  errBack(err);
                });
            } else {
              let successCount = uploadIndex.length;
              for (let index = 0; index < chunkMaxIndex; index++) {
                let i = uploadIndex.findIndex((item) => item == index);
                if (i == -1) {
                  let blob = file.slice(
                    index * chunkSize,
                    index * chunkSize + chunkSize
                  );
                  let formData = new FormData();
                  formData.append('authCode', authCode);
                  formData.append('chunkIndex', index);
                  formData.append('file', blob);

                  multipartUploadApi(formData)
                    .then((res) => {
                      successCount++;
                      if (successCount == chunkMaxIndex && isChunk) {
                        mergeFileApi({
                          fileName: file.name,
                          authCode: authCode,
                        })
                          .then((res) => {
                            callBack(res.data);
                          })
                          .catch((err) => {
                            errBack(err);
                          });
                      }
                    })
                    .catch((err) => {
                      errBack(err);
                    });
                }
              }
            }
          }
        })
        .catch((err) => {
          errBack(err);
        });
    });
  },
};
