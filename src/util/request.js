//对于axios进行二次封装
import axios from 'axios'
//import { config } from 'vue/types/umd';
//在模块当中引入store


//1、利用axios对象的方法create，去创建一个axios实例
//2、request就是axios，只不过稍微配置一下
const requests = axios.create({
  //配置对象
  //基础路径，发请求的时候，路径当中会出现/api
  baseURL: "/api",
  headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiJhZG1pbiIsInVzZXJfa2V5IjoiZTNmMzJjYTQtNjdlOS00NTcyLWJkMzUtZWYzOWM3NGZjODE5In0.jn4WqHBl4bUBHHBdePLKeaZxunhTKVezNCvaWlRbmr8O8euFtG-qXfJW17JZefscbqs35esck076LoGu4K1wpw' },
  //代表请求超时的时间为5s
  timeout: 5000,
});

// 添加请求拦截器
requests.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
requests.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return Promise.resolve(response);
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

//对外暴露
export default requests;