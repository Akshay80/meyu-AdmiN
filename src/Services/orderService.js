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
