import { API_BASE_URL } from "constants";
import request from "util/RequestBody";

export function updateUserProfileDetails(signRequest) {
  return request({
    url: `${API_BASE_URL}/user/update-user-profile-details`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}