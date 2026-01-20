import axios from "axios";
import { BASE_URL } from "@/constant/config";
import { LOGIN_URL } from "@/urls";
import storage from "@/utils/storage";

export const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * 60 * 30 * 3, // 3 phút
});

// Flag để tránh multiple refresh token calls
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Request interceptor - add token to header automatically
apiClient.interceptors.request.use(
    function (config){
        const token = storage.getToken();
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
        return config;
    }
)

// Response interceptor - xử lý lỗi 401 với refresh token
apiClient.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        const status = error?.response?.status;
        
        // 401 - Unauthorized: token hết hạn
        if (status === 401 && !originalRequest._retry) {
            // Nếu đang refresh, đợi kết quả
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({resolve, reject});
                }).then(token => {
                    originalRequest.headers.Authorization = 'Bearer ' + token;
                    return apiClient(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = storage.getRefreshToken();
            
            if (!refreshToken) {
                // Không có refresh token, redirect to login
                isRefreshing = false;
                storage.clearAll();
                if (typeof window !== "undefined" && !window.location.pathname.includes(LOGIN_URL)) {
                    window.location.href = LOGIN_URL;
                }
                return Promise.reject(error);
            }

            try {
                // Call refresh token API
                const response = await axios.post(`${BASE_URL}/users/refresh-token`, {
                    refreshToken: refreshToken
                });

                if (response.data.success && response.data.token) {
                    const newToken = response.data.token;
                    
                    // Save new token
                    storage.setToken(newToken);
                    
                    // Update authorization header
                    apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
                    originalRequest.headers.Authorization = 'Bearer ' + newToken;
                    
                    // Process queued requests
                    processQueue(null, newToken);
                    
                    isRefreshing = false;
                    
                    // Retry original request
                    return apiClient(originalRequest);
                } else {
                    throw new Error('Refresh token failed');
                }
            } catch (refreshError) {
                // Refresh token failed, logout user
                processQueue(refreshError, null);
                isRefreshing = false;
                storage.clearAll();
                
                if (typeof window !== "undefined" && !window.location.pathname.includes(LOGIN_URL)) {
                    window.location.href = LOGIN_URL;
                }
                
                return Promise.reject(refreshError);
            }
        }
        
        // 403 - Forbidden: không có quyền truy cập
        // Không log warning - để component xử lý gracefully
        
        return Promise.reject(error);
    }
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
