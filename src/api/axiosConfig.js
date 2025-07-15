import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

let isRefreshing = false;
let failedRequestsQueue = [];

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
     

    if (error.response?.status === 401 && !originalRequest._retry && error?.response?.data?.errorCode == "EXPIRED_ACCESS_TOKEN"
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(
          `${BASE_URL}/auth/refreshToken`,
          {},
          { withCredentials: true }
        );

        failedRequestsQueue.forEach((pending) => pending.resolve());
        return api(originalRequest);
      } catch (refreshError) {

        failedRequestsQueue.forEach((pending) => pending.reject(refreshError));

        if (refreshError.response?.status === 401 && refreshError.response.data.errorCode === "EXPIRED_REFRESH_TOKEN") {
          

          // Redirect to login or handle logout
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        failedRequestsQueue = [];
      }
    }

    return Promise.reject(error);
  }
);

export default api;
