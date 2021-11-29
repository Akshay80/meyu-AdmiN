import ApiInstance from "./../config/intercepter";
import Api from "./../config/api";
// import { resHandle } from "../helper";

// login
export function loginApiFun(payload) {
  return ApiInstance.post(`${Api.login}`, payload);
}

// forgot password
export function forgotPasswordService(payload) {
  return ApiInstance.post(`${Api.forgotPassword}`, payload);
}