import {
  Container,
  Paper,
  Stack,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";
import React, { useEffect } from "react";
import BookingsCard from "../Bookings/BookingsCard";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Components/Navbar/Navbar";
import { getBookedAppointmentList } from "../../api/Services/patient/booking";

const Bookings = () => {
  const pagination = {
    page: 1,
    limit: 10000,
  };

  const navigate = useNavigate();
  const openCurrentBookingDetails = () => {
    navigate("/current-booking-details");
  };
  const openPreviousBookingDetails = () => {
    navigate("/previous-booking-details");
  };

  useEffect(() => {
    getBookedAppointmentList(pagination.page, pagination.limit).then((res) => {
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <Navbar />
      <Box sx={{ maxHeight: "100vh", overflow: "auto" }}>
        {" "}
        <Container sx={{ marginTop: "120px" }}>
          <Paper elevation={3} sx={{ padding: "30px" }}>
            {/* Current Bookings */}
            <Box>
              <Typography>Current Booking</Typography>
              <Box marginTop={2} onClick={openCurrentBookingDetails}>
                <BookingsCard />
              </Box>
            </Box>
            {/* Previous Bookings */}
            <Box marginTop={3}>
              <Typography>Previous Bookings</Typography>
              <Stack
                marginTop={2}
                spacing={2}
                onClick={openPreviousBookingDetails}
              >
                <BookingsCard />
                <BookingsCard />
                <BookingsCard />
                <BookingsCard />
                <BookingsCard />
                <BookingsCard />
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Bookings;
