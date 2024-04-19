import axiosInstance from "../../axios";

export const addSpecialNeeds = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/patient/special-needs",
      userData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getSpecialNeeds = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/patient/special-needs");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteSpecialNeeds = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/patient/special-needs/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
