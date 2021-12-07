import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";
// import { resHandle } from "../helper";

// Profile
export function profileService(payload) {
  console.log("hello",`${Api.userProfile}`)
  return ApiInstance?.post(`${Api.userProfile}`, payload);
}

//Get Profile Data
export function viewprofileService() {
  return ApiInstance?.get(`${Api.viewuserProfile}`);
}
// Change Profile Image 
export function changeProfileImage(payload) {
  return ApiInstance?.post(`${Api.changeProfileImage}`, payload);
}

// Get Customer Data
export function viewCustomerService() {
  return ApiInstance?.get(`${Api.customers}`);
}

// Get Categories Data
export function viewCategoryService() {
  return ApiInstance?.get(`${Api.categories}`);
}

//Delete Categories Data
export function deleteCategoryService(payload) {
  return ApiInstance?.post(`${Api.deletecategories}`, payload);
}

//Chef Details Data
export function chefDetailsService() {
  return ApiInstance?.get(`${Api.chefDetails}`);
}