import axios from "axios";
import Cookies from "js-cookie";
//export const baseURL = "https://hrm-backend.herokuapp.com";
export const baseURL =
//   process.env.NODE_ENV === "production"
//     ? "https://voidnepal-hrm-api.onrender.com"
//     : 
    "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;