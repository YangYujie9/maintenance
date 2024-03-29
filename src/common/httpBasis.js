/*
* 创建Axios 实例
 */

import axios from 'axios'
import urlConfig from '@/common/config/url-config'
//import * as userConfig from './userHtppt'




let erpAxios = axios.create()
erpAxios.defaults.baseURL = urlConfig.domain



/**
 * 发送请求之前
 */

erpAxios.interceptors.request.use(function (config) {
  
  return config;
}, function (error) {
  return Promise.reject(error);
});


/**
 * 响应拦截器
 */
erpAxios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error);
})

export default erpAxios
