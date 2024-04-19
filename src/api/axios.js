import axios from "axios";
import { getToken } from "./auth";

const axiosInstance = axios.create({
  baseURL: "http://13.236.182.225:8000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
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
