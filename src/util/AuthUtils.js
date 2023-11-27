import { API_BASE_URL, ACCESS_TOKEN } from "constants";
import request from "./RequestBody";

export const hasTokenSet = localStorage.getItem(ACCESS_TOKEN) !== null;


export function getCurrentUser() {
  return request({
    url: `${API_BASE_URL}/user/me`,
    method: "GET",
  });
}

export function createAccount(signRequest) {
  return request({
    url: `${API_BASE_URL}/auth/create-account`,
    method: "POST",
    isEndPointClosed: false,
    body: JSON.stringify(signRequest),
  });
}

export function checkUserName(loginRequest) {
  return request({
    url: `${API_BASE_URL}/auth/check-username`,
    method: "POST",
    isEndPointClosed: false,
    body: JSON.stringify(loginRequest),
  });
}

export function addToken(dataToSend1) {
  return request({
    url: `${API_BASE_URL}/auth/add-token`,
    method: "POST",
    isEndPointClosed: false,
    body: JSON.stringify(dataToSend1),
  });
}

export function checkToken(signRequest) {
  return request({
    url: `${API_BASE_URL}/auth/check-token`,
    method: "POST",
    isEndPointClosed: false,
    body: JSON.stringify(signRequest),
  });
}

export function login(signRequest) {
  return request({
    url: `${API_BASE_URL}/auth/login`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}


export function getCountriesOpen() {
  return request({
    url: `${API_BASE_URL}/auth/get-countries-open`,
    method: "GET",
    isEndPointClosed: false,
  });
}

export function getDistrictsOpen() {
  return request({
    url: `${API_BASE_URL}/auth/get-districts-open`,
    method: "GET",
  });
}

export function getGender() {
  return request({
    url: `${API_BASE_URL}/auth/get-gender`,
    isEndPointClosed: false,
    method: "GET",
  });
}


export function submitApplication(signRequest) {
  return request({
    url: `${API_BASE_URL}/auth/web-application-new`,
    isEndPointClosed: false,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function checkEmailAvailability(signRequest) {
  return request({
    url: `${API_BASE_URL}/auth/check-email-availability`,
    isEndPointClosed: false,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}



export function getCenters() {
  return request({
    url: `${API_BASE_URL}/auth/get-centers`,
    isEndPointClosed: false,
    method: "GET"
  });
}

export function signup(signRequest) {
  return request({
    url: `${API_BASE_URL}/auth/signup`,
    isEndPointClosed: false,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}