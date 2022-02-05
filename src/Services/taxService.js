import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";

// Adding a Tax
export function postTax(payload) {
  return ApiInstance?.post(`${Api.addTax}`, payload);
}

// Editing a Tax
export function putTax(payload) {
  return ApiInstance?.put(`${Api.editTax}`, payload);
}

// All Taxes
export function allTax() {
  return ApiInstance?.get(`${Api.getTax}`);
}

//  Delete Taxes
export function deleteTax(payload) {
  return ApiInstance?.post(`${Api.deleteTax}`, payload);
}
