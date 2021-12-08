import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";
// import { resHandle } from "../helper";

export function confirmChefAccount(payload) {
    return ApiInstance?.put(`${Api.confirmChef}`, payload);
  }
  
export function getchefDetails() {
  return ApiInstance?.get(`${Api.getchefDetails}`);
}