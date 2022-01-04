import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";
// import { resHandle } from "../helper";

export function getAllItemsList() {
  return ApiInstance?.get(`${Api.allItemsList}`);
}

export function getItemsbyId(id) {
  return ApiInstance?.get(`${Api.allItembyId}/${id}`);
}
export function confirmItemsbyId(payload) {
  return ApiInstance?.put(`${Api.allItembyId}/${payload}`);
}
