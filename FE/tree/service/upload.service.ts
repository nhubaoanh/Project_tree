import { API_DOWNLOAD } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IBaseUpload, IBaseUploadMulti } from "@/types/base";

// Upload nhiều file - endpoint: /api-core/upload-multiple
const uploadFiles = async (data: FormData): Promise<IBaseUploadMulti> => {
  return apiClient
    .post(`${API_DOWNLOAD}/upload-multiple`, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.message && res.data.message !== "") {
        throw new Error(res.data.message);
      } else {
        // Fix URL domain if needed
        if (res.data.paths) {
          res.data.paths = res.data.paths.map((path: string) => 
            path.replace('https://giaphaso.vn/', 'https://api.giaphaso.vn/')
          );
        }
        return res.data;
      }
    });
};

export const uploadFile = async (data: FormData): Promise<IBaseUpload> => {
  return apiClient.post(`${API_DOWNLOAD}/upload`, data, {
    headers: {
      accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  })
  .then((res) => {
    if (res.data.message && res.data.message !== "") {
      throw new Error(res.data.message);
    } else {
      // Fix URL domain if needed
      if (res.data.path) {
        res.data.path = res.data.path.replace('https://giaphaso.vn/', 'https://api.giaphaso.vn/');
      }
      return res.data;
    }
  });
}

export { uploadFiles };