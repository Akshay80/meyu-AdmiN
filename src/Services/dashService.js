import ApiInstance from "../config/Intercepter";
import Api from "../config/Api";

// All Dashboard Data
export function dashboardService() {
  return ApiInstance?.get(`${Api.dashboardService}`);
}