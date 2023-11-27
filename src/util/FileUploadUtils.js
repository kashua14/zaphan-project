
import { API_BASE_URL } from "constants";
import request from "./RequestBody";


/* University Methods Start*/

export function uploadFiles(data) {

    // data.append('sectionDocumentOwner', 5);

    console.log("data => ", data);

    return request({
        url: API_BASE_URL + "/system_files/upload-file",
        method: 'POST',
        body: data
    });
}

export function removeFile(fileID) {
    return request({
          url: API_BASE_URL + "/system_files/remove/" + fileID,
          method: 'GET'
      });
  }







