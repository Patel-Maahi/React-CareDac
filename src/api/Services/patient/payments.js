import axiosInstance from "../../axios";

export const getMyPayments = async (page, limit) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/payment/my-payments?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
