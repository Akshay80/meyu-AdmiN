import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";

// ============= category =============

export function viewCategoryFun() {
  return ApiInstance.get(`${Api.categoryFun}`);
}

export function deleteCategoryFun(payload) {
  return ApiInstance.post(`${Api.deletecategories}`, payload);
}

export function category(payload) {
  return ApiInstance.post(`${Api.category}`, payload);
}

export function editCategoryFun(payload) {
  return ApiInstance.put(`${Api.editCategory}`, payload);
}

export function viewCategorybyId(id) {
  return ApiInstance.get(`${Api.catergoryById}/${id}`);
}
