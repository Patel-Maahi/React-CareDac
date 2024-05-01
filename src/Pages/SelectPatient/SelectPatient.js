import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Rating,
  ButtonGroup,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProfileImg from "../../Assets/Images/profile.png";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AvatarImg from "../../Assets/Images/Avatar.png";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { getMember } from "../../api/Services/patient/member";
import { getAvailability } from "../../api/Services/patient/booking";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import profileNotFound from "../../Assets/Images/profile-blank.jpg";
import { checkUnavailability } from "../../api/Services/patient/caregiver";

const SelectPatient = ({ closeSelectPatient, id, caregiverDetails }) => {
  const date = new Date().toLocaleDateString();
  const imgUrl = "https://caredac-web.s3.ap-southeast-2.amazonaws.com";
  const [btnIndex, setBtnIndex] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [bookingSlots, setBookingSlots] = useState([]);
  const [members, setMembers] = useState([]);
  const [newDate, setNewDate] = useState(date);
  const [startDate, setStartDate] = useState({});
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    getMember().then((res) => {
      setMembers(res.data);
    });
    getAvailability(id, newDate).then((res) => {
      console.log(res.data.slot);
      const availableSlots = res.data.slot;
      const newTimeSlots = availableSlots.map((item) => {
        const time = new Date(item.start_date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        return { time: time, availability: item.availability };
      });
      setAvailableTimeSlots([...newTimeSlots]);
      if (!availableSlots?.length > 0) {
        toast.error(res.message, {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  }, []);

  console.log(availableTimeSlots);
  const handleClose = () => {
    closeSelectPatient();
  };
  const handleVariantChange = (index, e) => {
    setBtnIndex((prev) => {
      if (prev.includes(index)) {
        return prev.filter((item) => item !== index);
      } else {
        return [...prev, index];
      }
    });
    console.log(e.target.value);
    setStartDate(availableTimeSlots[btnIndex[0]], newDate);
    setEndDate(availableTimeSlots[btnIndex[btnIndex.length - 1]]);
  };

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    setNewDate(formattedDate);
    getAvailability(id, newDate).then((res) => {
      const availableSlots = res.data.slot;
      const newTimeSlots = availableSlots.map((item) => {
        const time = new Date(item.start_date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        return { time: time, availability: item.availability };
      });
      setAvailableTimeSlots([...newTimeSlots]);
      if (!availableSlots?.length > 0) {
        toast.error(res.message, {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };
  const handleBookSlot = () => {
    if (!availableTimeSlots?.length > 0) {
      toast.error("Slot duration must be atleast 1 hour", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (btnIndex.length <= 2) {
        toast.error("Slot duration must be atleast 1 hour", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const unavailabilityData = {
          startTime: newDate + " " + startDate.time,
          endTime: newDate + " " + endDate.time,
          bookingDate: newDate,
          id: id,
        };
        checkUnavailability(unavailabilityData);
      }
      console.log(startDate);
      console.log(endDate);

      // console.log(unavailabilityData);
    }
  };

  return (
    <>
      <Box
        padding={3}
        sx={{
          maxWidth: "550px",
          borderRadius: "10px",
          border: "1px solid #F2F4F7",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#024FAA", fontSize: "18px", fontWeight: "600" }}
          gutterBottom
        >
          Book For?
        </Typography>
        <Typography
          variant="subtitle1"
          color={"#73787E"}
          fontWeight={"400"}
          fontSize={"16px"}
          gutterBottom
        >
          Select Patient for the care
        </Typography>
        <Card sx={{ marginTop: "30px" }}>
          <Stack direction={"row"} alignItems={"center"} marginLeft={2}>
            <Box>
              <CardMedia
                component="img"
                sx={{
                  width: "80px",
                  height: "80px",
                  objectFit: "fill",
                  border: "3px solid rgb(252, 145, 85)",
                  borderRadius: "20px",
                }}
                image={
                  caregiverDetails.profile_image
                    ? `${imgUrl}${caregiverDetails.profile_image}`
                    : profileNotFound
                }
                alt="Caregiver Profile Image"
              />
            </Box>
            <CardContent>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#101828",
                  }}
                >
                  {caregiverDetails?.full_name}
                </Typography>
                <Stack
                  // marginTop={1}
                  direction={"row"}
                  spacing={1}
                  alignItems={"center"}
                >
                  <Rating
                    defaultValue={caregiverDetails?.average_rates}
                    precision={0.5}
                  />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#101828",
                    }}
                  >
                    ({caregiverDetails?.average_rates})
                  </Typography>
                </Stack>
                <Stack direction={"row"}>
                  <GppGoodIcon color="success" sx={{ fontSize: "24px" }} />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#667085",
                    }}
                  >
                    Background check done
                  </Typography>
                </Stack>
              </Box>
            </CardContent>
          </Stack>
        </Card>
        <Box marginTop={2}>
          <Typography
            variant="subtitle1"
            sx={{ color: "", fontSize: "20px", fontWeight: "" }}
          >
            Select Family Member
          </Typography>
          <Box marginTop={2}>
            {members.map((item) => (
              <Card sx={{ marginTop: "20px" }}>
                <Stack direction={"row"} alignItems={"center"} marginLeft={2}>
                  <Box>
                    <CardMedia
                      image={AvatarImg}
                      component="img"
                      sx={{ width: "32px", borderRadius: "50px" }}
                    />
                  </Box>
                  <Box flexGrow={1}>
                    <CardContent>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Box>
                          <Typography
                            fontSize={"16px"}
                            fontWeight={"500"}
                            color={"#101828"}
                          >
                            {item.full_name}
                          </Typography>
                          <Typography
                            fontWeight={"400"}
                            fontSize={"14px"}
                            color={"#101828"}
                          >
                            {item.age}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            color={"#667085"}
                            fontSize={"14px"}
                            fontWeight={"400"}
                          >
                            {item.gender === "female" ? (
                              <FemaleIcon />
                            ) : (
                              <MaleIcon />
                            )}

                            {item.gender}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Box>
                </Stack>
              </Card>
            ))}
          </Box>
        </Box>
        <Box
          marginTop={4}
          sx={{
            borderRadius: "8px",
            border: "1px solid #F2F4F7",
            padding: "15px",
          }}
        >
          <Typography
            gutterBottom
            color={"#344054"}
            fontSize={"14px"}
            fontWeight={"500"}
          >
            Booking Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  border: "1px solid #475467",
                  width: "380px",
                  height: "44px",
                },
                '& input[type="text"]::placeholder': {
                  opacity: 0,
                },
              }}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          <Typography
            gutterBottom
            marginTop={2}
            color={"#344054"}
            fontSize={"14px"}
            fontWeight={"500"}
          >
            Booking Time
          </Typography>

          <Box width={"520px"}>
            {availableTimeSlots?.map((item, index) => (
              <Button
                key={index}
                variant={btnIndex.includes(index) ? "contained" : "outlined"}
                sx={{
                  marginX: "8px",
                  marginY: "5px",
                  backgroundColor: item.availability === false ? "gray" : "",
                  cursor:
                    item.availability === false ? "not-allowed" : "pointer",
                  border: "1px solid #101828",
                  borderRadius: "5px",
                  color: "#101828",
                  color: item.availability === false ? "black" : "#101828",
                  boxShadow: "2px 2px 15px 0px #0000000D",
                  padding: {
                    xs: "6px 50px",
                    md: "6px 30px",
                  },
                  // "&:disabled": {
                  //   color: "#6c757d",
                  //   backgroundColor: "#e9ecef",
                  //   cursor: "not-allowed",
                  // },
                }}
                disabled={item.availability === false}
                onClick={(e) => handleVariantChange(index, e)}
                type="button"
                disableTouchRipple
                value={item.time}
              >
                {item.time}
              </Button>
            ))}
          </Box>
        </Box>

        <Box marginTop={3}>
          {/* <Button
              variant="outlined"
              sx={{ padding: "15px 60px", borderRadius: "40px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                padding: "15px 70px",
                borderRadius: "40px",
                marginLeft: "20px",
              }}
            >
              Book
            </Button> */}
          <Button
            variant="contained"
            sx={{
              padding: "15px 70px",
              borderRadius: "40px",
              // marginLeft: "20px",
              textTransform: "none",
            }}
            fullWidth
            onClick={handleBookSlot}
          >
            Continue
          </Button>
        </Box>
      </Box>

      <ToastContainer />
    </>
  );
};

export default SelectPatient;
