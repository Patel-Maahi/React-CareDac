import axiosInstance from "../../axios";

export const preferences = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/patient/preference",
      userData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const servicesNeeded = async (userData) => {
  try {
    const response = await axiosInstance.patch(
      "/api/v1/common/services",
      userData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getFilterData = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/patient/filter");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
