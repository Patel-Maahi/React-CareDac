import axiosInstance from "../../axios";

export const getCaregiverList = async (filters) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/patient/caregiver?page=${filters.page}&limit=${filters.limit}&language=${filters.language}&worker_role=${filters.worker_role}&gender=${filters.gender}&experience=${filters.experience}&services=${filters.services}&average_rates=${filters.average_rates}&highlight=${filters.highlight}&can_also_with=${filters.can_also_with}&city=${filters.city}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCaregiverDetails = async (caregiverId) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/patient/caregiver/${caregiverId}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getFeedback = async (caregiverId) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/patient/feedback/caregiver/${caregiverId}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const checkUnavailability = async (unavailabilityData) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/patient/check-unavailability/${unavailabilityData.id}?booking_date=${unavailabilityData.bookingDate}&start_time=${unavailabilityData.startTime}&end_time=${unavailabilityData.endTime}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
