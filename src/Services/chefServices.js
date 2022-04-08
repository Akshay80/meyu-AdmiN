import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";

//  confirm chef account
export function confirmChefAccount(id, payload) {
  return ApiInstance?.put(`${Api.confirmChef}/${id}`, payload);
}

// chef card details
export function getchefDetails(id) {
  return ApiInstance?.get(`${Api.getchefDetails}/${id}/1`);
}

export function getchefDetail(id) {
  return ApiInstance?.get(`${Api.getchefDetail}/${id}`);
}


// All Chef Details Data
export function chefDetailsService() {
  return ApiInstance?.get(`${Api.chefDetails}`);
}

// Delete Chef
export function deleteChef(id) {
  return ApiInstance?.delete(`${Api.deleteChef}/${id}`);
}
