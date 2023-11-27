import { API_BASE_URL } from "constants";
import request from "./RequestBody";

export function createAccount(signRequest) {
  return request({
    url: `${API_BASE_URL}/auth/create-account`,
    method: "POST",
    isEndPointClosed: false,
    body: JSON.stringify(signRequest),
  });
}

export function createCountry(signRequest) {

  return request({
    url: `${API_BASE_URL}/configs/create-country`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function getCountries(signRequest) {
  return request({
    url: `${API_BASE_URL}/configs/get-countries`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function createDistrict(signRequest) {
  return request({
    url: `${API_BASE_URL}/configs/create-district`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function getDistricts(signRequest) {
  return request({
    url: `${API_BASE_URL}/configs/get-districts`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}


export function createCenter(signRequest) {
  return request({
    url: `${API_BASE_URL}/general/create-center`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function getCenters(signRequest) {
  return request({
    url: `${API_BASE_URL}/general/get-centers`,
    method: "GET",
    // body: JSON.stringify(signRequest),
  });
}

