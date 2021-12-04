import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";
// import { resHandle } from "../helper";

// Profile
export function profileService(payload) {
  return ApiInstance?.post(`${Api.userProfile}`, payload);
}

//Get Profile Data
export function viewprofileService() {
  return ApiInstance?.get(`${Api.viewuserProfile}`);
}

// Get Customer Data
export function viewCustomerService() {
  return ApiInstance?.get(`${Api.customers}`);
}