import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";

// get foods
export function getAllFoodFun() {
  return ApiInstance?.get(`${Api.getAllFood}`);
}

//   add food
export function addFood(payload) {
  return ApiInstance?.post(`${Api.addFood}`, payload);
}

// edit food
export function editFoodFun(payload) {
  return ApiInstance?.put(`${Api.editFood}`, payload);
}

//   delete food
export function deleteFood(payload) {
  return ApiInstance?.post(`${Api.deleteFood}`, payload);
}

//   get food by ID
export function getFoodbyId(id) {
  return ApiInstance?.get(`${Api.getFoodbyId}/${id}`);
}
