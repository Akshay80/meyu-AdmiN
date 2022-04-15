import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";

// All Orders
export function getAllOrders() {
  return ApiInstance?.get(`${Api.getAllOrders}`);
}

// Order By ID
export function getOrdersByID(id) {
    return ApiInstance?.get(`${Api.getOrdersByID}/${id}`);
  }

  // Pending Orders
  export function getAllPendingOrders()
  {
    return ApiInstance?.get(`${Api.getAllPendingOrders}`)
  }

  // Rejected Orders
  export function getAllRejectedOrders()
  {
    return ApiInstance?.get(`${Api.getAllRejectedOrders}`)
  }
// Completed Orders
export function getAllCompletedOrders()
{
  return ApiInstance?.get(`${Api.getAllCompletedOrders}`)
}

// Approved Orders
export function getAllApprovedOrders()
{
  return ApiInstance?.get(`${Api.getAllApprovedOrders}`)
}

// Cancelled Orders
export function getAllCancelledOrders()
{
  return ApiInstance?.get(`${Api.getAllCancelledOrders}`)
}