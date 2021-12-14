import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";

// Adding a Unit
  export function postUnits(payload) {
    return ApiInstance?.post(`${Api.postUnit}`, payload);
  }

// Editing a Unit
export function putUnits(payload) {
    return ApiInstance?.put(`${Api.putUnit}`, payload);
  }

//  Delete a Unit
export function deleteUnits(payload) {
    return ApiInstance?.post(`${Api.deleteUnit}`, payload);
  }

  