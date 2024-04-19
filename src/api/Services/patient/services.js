import axiosInstance from "../../axios";

//get all services
export const viewAllServices = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/common/services-list");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateService = async (services) => {
  try {
    const response = await axiosInstance.patch(
      "/api/v1/common/services",
      services
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//get the added service
export const viewServices = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/common/services");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
