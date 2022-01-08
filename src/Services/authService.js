import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";
// import { resHandle } from "../helper";

// login
export function loginApiFun(payload) {
  return ApiInstance.post(`${Api.login}`, payload);
}
// logout
export function logoutFun() {
  return ApiInstance.get(`${Api.logout}`);
}

// signup
export function signupFun(payload) {
  return ApiInstance.post(`${Api.signup}`, payload);
}
// forgot password
export function forgotPasswordService(payload) {
  return ApiInstance.post(`${Api.forgotPassword}`, payload);
}

// change password
export function changePasswordService(payload) {
  return ApiInstance.put(`${Api.changePassword}`, payload);
}
