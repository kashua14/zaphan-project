import { API_BASE_URL, ACCESS_TOKEN } from "constants";

const request = (options) => {
  const header = new Headers({
    "Content-Type": "application/json",
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    header.append("Authorization", `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`);
  }

  const defaults = { headers: header, ...options };

  return fetch(defaults.url, defaults).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function createPermissionSet(signRequest) {
  // alert()
  return request({
    url: `${API_BASE_URL}/permissions/create-process`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function getPermissionSets(signRequest) {
  return request({
    url: `${API_BASE_URL}/permissions/get-permission-sets`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function deletePermissionSet(signRequest) {
  return request({
    url: `${API_BASE_URL}/permissions/delete-permission-set`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function getSystemModule() {
  return request({
    url: `${API_BASE_URL}/permissions/get-System-module`,
    method: "GET"
    
  });
}



export function getSystemProcess() {
  return request({
    url: `${API_BASE_URL}/permissions/get-system-process`,
    method: "GET"
    
  });
}


export function getActionPermission() {
  return request({
    url: `${API_BASE_URL}/permissions/get-action-permission`,
    method: "GET"
    
  });
}

export function getPositionStatus() {
  return request({
    url: `${API_BASE_URL}/permissions/get-position-status`,
    method: "GET"
    
  });
}


export function getPermissions(signRequest) {
  return request({
    url: `${API_BASE_URL}/permissions/get-permissions`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function createPosition(signRequest) {
  return request({
    url: `${API_BASE_URL}/permissions/get-create-position`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}


export function getPositions(signRequest) {
  return request({
    url: `${API_BASE_URL}/permissions/get-positions`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}


export function getPositionPermissions(signRequest) {
  return request({
    url: `${API_BASE_URL}/permissions/get-position-permissions`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}


export function getUserPermissions(signRequest) {
  return request({
    url: `${API_BASE_URL}/permissions/get-user-permissions`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}

export function createUserPermissions(signRequest) {
  return request({
    url: `${API_BASE_URL}/permissions/create-user-permissions`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}


export function deleteUserPermission(signRequest) {
  return request({
    url: `${API_BASE_URL}/permissions/delete-user-permission`,
    method: "POST",
    body: JSON.stringify(signRequest),
  });
}