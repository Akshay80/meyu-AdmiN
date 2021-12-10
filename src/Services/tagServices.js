import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";
// import { resHandle } from "../helper";

// get tags
export function getAllTagFun() {
  return ApiInstance?.get(`${Api.getAllTags}`);
}

//   add tags
export function addTags(payload) {
  return ApiInstance?.post(`${Api.addTag}`, payload);
}

// edit tag
export function editTags(payload) {
  return ApiInstance?.put(`${Api.editTag}`,payload);
}

//   delete tags
export function deleteTags(payload) {
  return ApiInstance?.post(`${Api.deleteTag}`,payload);
}

//   get tags by ID
export function getTagsbyId() {
    return ApiInstance?.get(`${Api.deleteTag}`);
  }