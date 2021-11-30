import ApiInstance from "./../config/intercepter";
import Api from "../config/api";
// import { resHandle } from "../helper";

// Profile
export function profileService(payload) {
  return ApiInstance?.post(`${Api.userProfile}`, payload);
}
