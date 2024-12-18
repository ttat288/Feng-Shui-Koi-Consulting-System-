import { refreshToken } from "./../services/AuthenticationService";
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";
import { convertKeysToCamelCase } from "../utils/keyCaseConverter";

const API_HOST = import.meta.env.VITE_API_HOST;
const API_PORT = import.meta.env.VITE_API_PORT;
// const API_DEVELOPMENT = import.meta.env.VITE_API_DEVELOPMENT;
// const API_DEPLOY = import.meta.env.VITE_API_DEPLOY;

// const BASE_URL =
//   API_DEVELOPMENT === true
//     ? `${API_HOST}:${API_PORT}/api`
//     : `${API_DEPLOY}/api`;

const BASE_URL = `${API_HOST}:${API_PORT}/api`;

const axiosAuth: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a Request interceptor
axiosAuth.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    // Initialize header if not already defined
    config.headers = config.headers || {};

    const accessToken = localStorage.getItem("AccessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // No kebab-case conversion for data
    // No kebab-case conversion for params

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add Response interceptor
axiosAuth.interceptors.response.use(
  function (response: AxiosResponse) {
    if (response.data) {
      response.data = convertKeysToCamelCase(response.data);
    }
    return response;
  },

  async function (error) {
    if (error.message === "Network Error" && !error.response) {
      toast.error("Lỗi mạng, vui lòng kiểm tra kết nối!");
    }

    const originalRequest = error.config;

    if (error.response && error.response.status === 403) {
      toast.error("Bạn không có quyền truy cập vào tài nguyên này");
    }

    if (error.response && error.response.status === 401) {
      const authMessage = error.response.data.Message;

      if (authMessage && authMessage.includes("Token đã hết hạn!")) {
        const newAccessToken = await refreshToken();

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosAuth(originalRequest);
        } else {
          toast.error("Token đã hết hạn. Vui lòng đăng nhập lại.");
          window.location.href = "/login";
        }
      } else {
        toast.error("Bạn không được phép truy cập trang này");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosAuth;
