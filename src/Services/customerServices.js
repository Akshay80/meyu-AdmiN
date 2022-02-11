import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";
// import { resHandle } from "../helper";

// Get Customer Data
export function viewCustomerService() {
  return ApiInstance?.get(`${Api.customers}`);
}

// Get Customer By Id
export function getCustomerDetails(id) {
  return ApiInstance?.get(`${Api.getcustomerDetails}/${id}`);
}

// Delete Customer
export function deleteCustomer(id) {
  return ApiInstance?.delete(`${Api.deletecustomers}/${id}`);
}

// Discontinue Customer
export function discontinueCustomer(id, payload) {
  return ApiInstance?.put(`${Api.discontinueCustomer}/${id}`, payload);
}