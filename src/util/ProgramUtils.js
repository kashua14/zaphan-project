import { API_BASE_URL } from "constants";
import request from "./RequestBody";

export function createAccount(signRequest) {
  return request({
    url: `${API_BASE_URL}/auth/create-account`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}



export function availableProgrammeList(AddEventRequest) {
  return request({
    url: `${API_BASE_URL}/acd/apply/getprogrammedetails`,
    method: "POST",
    body: JSON.stringify(AddEventRequest),
  });
}
