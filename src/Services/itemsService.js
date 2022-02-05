import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";
// import { resHandle } from "../helper";

export function getAllItemsList() {
  return ApiInstance?.get(`${Api.allItemsList}`);
}

export function getItemsbyId(id) {
  return ApiInstance?.get(`${Api.allItembyId}/${id}`);
}
export function confirmItemsbyId(id, payload) {
  return ApiInstance?.put(`${Api.confirmItem}/${id}`, payload);
}

export function deleteItemsbyId(id) {
  return ApiInstance?.delete(`${Api.deleteItem}/${id}`);
}

// Update Recipe by Id
export function updateRecipebyId(id, payload) {
  return ApiInstance?.put(`${Api.updateRecipe}/${id}`, payload);
}

// Update Recipe Image by Id
export function updateRecipeImagebyId(id, payload) {
  return ApiInstance?.put(`${Api.updateRecipeImage}/${id}`, payload);
}