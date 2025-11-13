import axios from "axios";
import { BASE_URL } from "../constant/config";
import { LOGIN_URL } from "../urls";
import storage from "../utils/storage";

export const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * 60 * 30 * 3, // 3 phút
});


// add token to header automatically
apiClient.interceptors.request.use(
    function (config){
        config.headers.Authorization = "Bearer " + storage.getToken();
        return config;
    }
)

// 
apiClient.interceptors.response.use(
    function (response) {
        if(response.data?.success === false || response.data?.result === false) {
            throw new Error(response.data.message);
        }
        return response;
    } 
    
// researching after
//     function (error) {
//     // Drunk code here. Will fix after has refresh token api 👀
//     if (error?.response?.status === 401 || error?.response?.status === 403) {
//       clearLogout();
//       if (!window.location.pathname.includes(LOGIN_URL))
//         window.open(LOGIN_URL, "_parent");
//     }
//     return Promise.reject(error);
//   },
)

export const filterEmptyString = (params: Record<string, any>) => {
  const result: Record<string, any> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "") {
      result[key] = value;
    }
  });

  return result;
};
