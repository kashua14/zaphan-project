import { API_BASE_URL } from "constants";
import request from "./RequestBody";

export function getApplicants(signRequest) {
  return request({
    url: `${API_BASE_URL}/website/get-applicants`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function getApplicationDetails(signRequest) {
  return request({
    url: `${API_BASE_URL}/website/application-details`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function addReviewer(signRequest) {
  return request({
    url: `${API_BASE_URL}/website/add-reviewer`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}


export function getReviewers(signRequest) {
  return request({
    url: `${API_BASE_URL}/website/get-reviewers`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function deleteReviewer(signRequest) {
  return request({
    url: `${API_BASE_URL}/website/delete-reviewer`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function createReviewerAccount(signRequest) {
  return request({
    url: `${API_BASE_URL}/website/create-reviewer-account`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}


export function getReviewerAccounts(signRequest) {
  return request({
    url: `${API_BASE_URL}/website/get-reviewer-accounts`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}
export function deleteReviewerAccount(signRequest) {
  return request({
    url: `${API_BASE_URL}/website/delete-reviewer-account`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function getReviewerApplicants(signRequest) {
  return request({
    url: `${API_BASE_URL}/website/get-reviewer-applicants`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}
export function createReview(signRequest) {
  return request({
    url: `${API_BASE_URL}/website/create-review`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}



