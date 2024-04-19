import axiosInstance from "../../axios";

export const addMember = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/patient/member",
      userData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getMember = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/patient/member");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getMemberDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/patient/member/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateMember = async (id) => {
  try {
    const response = await axiosInstance.patch(`/api/v1/patient/member/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteMember = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/patient/member/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
