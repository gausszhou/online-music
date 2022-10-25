// 引入axios
import axios from "axios";
import forage from "@/storage/forage";

const instance = axios.create({
  timeout: 10 * 1000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  async function (response) {
    await forage.setItem(response.config.url, response.data);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// Get请求参数拼接
export function serialize(params) {
  if (!params || Object.prototype.toString.call(params) != "[object Object]") {
    return "";
  }
  let str = "?",
    keys = Object.keys(params);
  keys.forEach((k) => {
    if (
      Object.prototype.toString.call(params[k]) === "[object Object]" ||
      Object.prototype.toString.call(params[k]) === "[object Array]"
    ) {
      str += k + "=" + JSON.stringify(params[k]) + "&";
    } else {
      str += k + "=" + params[k] + "&";
    }
  });
  return str.substr(0, str.length - 1);
}

export async function get(url) {
  let result = await forage.getItem(url);
  if (result) {
    return  new Promise((resolve,reject)=>{
      resolve({data:result})
    });
  } else {
    return instance.get(url)
  }
}

export default instance;
