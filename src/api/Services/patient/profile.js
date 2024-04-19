import axiosInstance from "../../axios";
import axios from "axios";

export const viewProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/common/profile");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await axiosInstance.patch(
      "/api/v1/common/edit-profile",
      userData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const imageUpload = async (img) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/common/image-upload",
      img
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//get-countries from CountriesNow
export const getCountry = async () => {
  try {
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const postCountry = async (country) => {
  try {
    const response = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/states",
      country
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getState = async (country) => {
  try {
    const response = await axios.get(
      `https://countriesnow.space/api/v0.1/countries/states/q?country=${country}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCity = async (country, state) => {
  try {
    const response = await axios.get(
      `https://countriesnow.space/api/v0.1/countries/state/cities/q?country=${country}&state=${state}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
