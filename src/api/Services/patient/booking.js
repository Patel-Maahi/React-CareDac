import axiosInstance from "../../axios";

export const getBookedAppointmentList = async (page, limit) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/patient/appointment?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAvailability = async (id, date) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/patient/availability/caregiver/${id}?booking_date=${date}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
