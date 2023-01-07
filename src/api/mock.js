import axios from "axios";
import nprogress from 'nprogress';
import "nprogress/nprogress.css"
//利用axios对象的方法create创建一个axios实例
const requests = axios.create({
    //配置对象
    //基本路径，发送请求路径会加上/mock
    baseURL:'/mock',
    timeout:5000,
});

// 添加请求拦截器
requests.interceptors.request.use(function (config) {
    nprogress.start();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
requests.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
   nprogress.done();
    return response.data;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  export default requests
