import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";

//  confirm chef account
export function confirmChefAccount(payload) {
  return ApiInstance?.put(`${Api.confirmChef}`, payload);
}

// chef card details
export function getchefDetails(id) {
  return ApiInstance?.get(`${Api.getchefDetails}/${id}`);
}

// All Chef Details Data
export function chefDetailsService() {
  return ApiInstance?.get(`${Api.chefDetails}`);
}

// Delete Chef
export function deleteChef(id) {
  return ApiInstance?.delete(`${Api.deleteChef}/${id}`);
}
