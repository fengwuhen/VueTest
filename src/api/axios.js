import axios from "axios";
import { getToken } from "../lib/cookie";
import { Loading, Message } from "element-ui";
import server from "../config/server";

/**
 * 加载loading
 */
let loading;

/**
 * 开始加载动画
 */
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "正在加载中……",
    background: "rgba(0,0,0,0,7)"
  });
}

/**
 * 结束加载动画
 */
function endLoading() {
  loading.close();
}

/**
 * 创建service
 */
const service = axios.create({
  timeout: 60000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest"
  },
  baseURL: server.host
});

/**
 * 创建测试service
 */
const service_test = axios.create({
  timeout: 60000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest"
  },
  baseURL: server.test_host
});

/**
 * 创建form表单service
 */
const serviceForm = axios.create({
  timeout: 60000,
  headers: {
    "Content-Type": "multipart/form-data; charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest"
  },
  baseURL: server.host
});

//http request 拦截器
let request = function (config) {
  startLoading();
  // const token = getToken();
  // if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
  //     config.headers.token = token;
  // }
  return config;
};
let request_err = function (err) {
  return Promise.reject(err);
};

// http response 拦截器
let response = function (res) {
  endLoading();
  const json = res.data;
  const message = `${json.msg}` || "未知错误";
  if (res.status == 200) {
    return json;
  } else {
    Message({
      message: message,
      type: "error"
    });
  }
};

let response_err = function (err) {
  endLoading();
  if (err.response) {
    const json = err.response.data;
    const message = `服务异常：${json.message}` || "未知错误";
    Message({
      message: message,
      type: "error"
    });
  }
  return Promise.reject(err);
};

service.interceptors.request.use(request, request_err);
serviceForm.interceptors.request.use(request, request_err);

service.interceptors.response.use(response, response_err);
serviceForm.interceptors.response.use(response, response_err);

service_test.interceptors.request.use(request, request_err);
service_test.interceptors.response.use(response, response_err);

window.service = service;
window.serviceForm = serviceForm;
window.service_test = service_test;
