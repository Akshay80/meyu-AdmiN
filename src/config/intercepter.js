import setting from "./settings";

import axios from "axios";
const ApiInstance = axios.create({
  baseURL: setting?.api?.url,
});
// request interceptor
ApiInstance?.interceptors?.request?.use(
  (request) => {
    if (request.method === "get") {
      request.data = true;
    }
    let token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    request.headers["Content-Type"] = "application/json";
    if (token) {
      request.headers.common["Authorization"] = token;
    }
    request.headers = headers;
    return request;
  },
  (error) => Promise.reject(error)
);
//on successful response
ApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      //   redirectUnAuth(error.response);
      return Promise.reject(error.response.data);
    }
    if (error.message === "Network Error") {
      // network error
      const networkError = {
        errorCodeList: ["NETWORK"],
      };
      return Promise.reject(networkError);
    } else if (error.message === `timeout of 3 ms exceeded`) {
      // timeout error
      const timeoutError = {
        errorCodeList: ["TIMEOUT"],
      };
      return Promise.reject(timeoutError);
    }
    return Promise.reject(error);
  }
);
export default ApiInstance;
