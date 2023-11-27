import { API_BASE_URL } from "constants";
import request from "./RequestBody";

export function registerUser(signRequest) {
  return request({
    url: `${API_BASE_URL}/website/register-user`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function getGender() {
  return request({
    url: `${API_BASE_URL}/user-mgt/get-gender`,
    method: "GET",
    isEndPointClosed: false,
  });
}
export function getUsers(signRequest) {
  return request({
    url: `${API_BASE_URL}/general/get-users`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function getUsersByUserType(signRequest) {
  return request({
    url: `${API_BASE_URL}/general/get-user-usertype`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function approveTrainee(signRequest) {
  return request({
    url: `${API_BASE_URL}/general/approve-trainee`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}
