import axios from "../axios";
import { setToken } from "../auth";
import axiosInstance from "../axios";

export const userRegisteration = async (userData) => {
  try {
    const response = await axios.post("/api/v1/auth/register", userData);
    const token = response.data.token;
    setToken(token);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//for account verification
export const otpVerification = async (otp) => {
  try {
    const response = await axiosInstance.patch(
      "/api/v1/auth/verify-account",
      otp
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const userLogin = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/login", userData);
    const token = response.data.token;
    setToken(token);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const forgotPassword = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "api/v1/auth/forgot-password",
      userData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//forgot-password link
export const forgotPasswordLink = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/auth/forgot-password-link",
      userData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//Change Password
export const changePassword = async (userData) => {
  try {
    const response = await axiosInstance.patch(
      "/api/v1/auth/change-password",
      userData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
