import axiosInstance from "../../axios";

export const addCondition = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/patient/condition",
      userData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCondition = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/patient/condition");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteCondition = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/patient/condition/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
