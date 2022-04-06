import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";
// import { resHandle } from "../helper";

// get coupans
export function getAllCoupans() {
  return ApiInstance?.get(`${Api.getAllCoupans}`);
}

//   add coupans
export function addCoupans(payload) {
  return ApiInstance?.post(`${Api.addCoupans}`, payload);
}

// edit coupans
export function editCoupans(payload) {
  return ApiInstance?.put(`${Api.editCoupans}`, payload);
}

//   delete coupans
export function deleteCoupans(payload) {
  return ApiInstance?.post(`${Api.deleteCoupans}`, payload);
}

//   get coupans by ID
export function getCoupansByID(id) {
  return ApiInstance?.get(`${Api.getCoupansByID}/${id}`);
}

// Edit Offer Image
export function editOfferImage(payload) {
  return ApiInstance?.put(`${Api.editOfferImage}`, payload);
}
