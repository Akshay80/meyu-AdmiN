import ApiInstance from "./../config/intercepter";
import Api from "../config/api";
// import { resHandle } from "../helper";

// Profile
export function profileService(payload) {
  return ApiInstance?.post(`${Api.userProfile}`, payload);
}

//Get Profile Data
export function viewprofileService(payload) {
  return ApiInstance?.get(`${Api.viewuserProfile}`, payload);
}

// Get Customer Data
export function viewCustomerService(payload) {
  return ApiInstance?.get(`${Api.customers}`, payload);
}