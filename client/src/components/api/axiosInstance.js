import axios from "axios";

export const baseURL = "http://127.0.0.1:8000";
// export const baseURL = "https://backend.tekpython.com";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      config.headers["Content-Type"] = "application/json";
      config.headers["accept"] = "application/json";
    } else {
      config.headers["Content-Type"] = "application/json";
      config.headers["accept"] = "application/json";
      config.headers["X-CSRFToken"] = "csrfToken";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refresh_token");
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      localStorage.clear();
      window.location = "/";
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;

