import {
  CardContent,
  CardMedia,
  Container,
  Paper,
  Typography,
  Card,
  Box,
  Stack,
  Rating,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import ProfileImg from "../../Assets/Images/profile.png";
import GppGoodIcon from "@mui/icons-material/GppGood";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Link, useLocation, useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import SelectPatient from "../SelectPatient/SelectPatient";
import { useState } from "react";
import CaregiverProfileReview from "./CaregiverProfileReview";
import { Navbar } from "../../Components/Navbar/Navbar";
import { getCaregiverDetails } from "../../api/Services/patient/caregiver";
import profileNotFound from "../../Assets/Images/profile-blank.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "8px",
  bgcolor: "background.paper",
  boxShadow: 24,
  maxHeight: "90vh",
  overflowY: "auto",
};

const CaregiverProfile = () => {
  const imgUrl = "https://caredac-web.s3.ap-southeast-2.amazonaws.com";
  const [openModal, setOpenModal] = useState(false);
  const [caregiverDetails, setCaregiverDetails] = useState({});
  const [highlights, setHighlights] = useState([]);
  const [canAlsoWith, setCanAlsoWith] = useState([]);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const { id } = useParams();
  useEffect(() => {
    getCaregiverDetails(id).then((res) => {
      setCaregiverDetails(res.data);
      setHighlights(res.data?.highlight);
      setCanAlsoWith(res.data?.canAlsoWith);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ maxHeight: "100vh", overflow: "auto" }}>
        <Container sx={{ marginTop: "120px" }}>
          <Paper sx={{ padding: "30px" }} elevation={3}>
            {/* Profile */}
            <Card elevation={3}>
              <CardContent>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      md: "row",
                    },
                    justifyContent: {
                      md: "space-between",
                    },
                    alignItems: {
                      md: "center",
                    },
                  }}
                >
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: {
                        xs: "column",
                        md: "row",
                      },
                      alignItems: {
                        md: "center",
                      },
                    }}
                  >
                    <Box>
                      <CardMedia
                        component="img"
                        sx={{
                          width: "150px",
                          height: "150px",
                          objectFit: "fill",
                          marginRight: "20px",
                          borderRadius: "12px",
                        }}
                        image={
                          caregiverDetails.profile_image
                            ? `${imgUrl}${caregiverDetails.profile_image}`
                            : profileNotFound
                        }
                        alt="Caregiver Profile Image"
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "#101828",
                        }}
                      >
                        {caregiverDetails?.worker_role}
                      </Typography>
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
                        marginTop={1}
                        direction={"row"}
                        spacing={1}
                        alignItems={"center"}
                      >
                        <Rating
                          defaultValue={caregiverDetails?.average_rates}
                          // value={caregiverDetails?.average_rates}
                          precision={0.5}
                        />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#101828",
                          }}
                        >
                          ({caregiverDetails?.total_rates})
                        </Typography>
                      </Stack>
                      <Stack marginTop={1} direction={"row"}>
                        <GppGoodIcon
                          color="success"
                          sx={{ fontSize: "24px" }}
                        />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#667085",
                          }}
                        >
                          Background {caregiverDetails?.background_verified}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                  <Stack
                    sx={{
                      marginTop: {
                        xs: "20px",
                        md: "0px",
                      },
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        borderRadius: "40px",
                        backgroundColor: "#024FAA",
                        textTransform: "none",
                        padding: "15px 35px",
                      }}
                      disableElevation
                      onClick={handleOpen}
                    >
                      Book {caregiverDetails?.full_name}
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
            {/* About */}
            <Card sx={{ marginTop: "20px" }} elevation={3}>
              <CardContent>
                <Typography
                  sx={{ fontSize: "20px", fontWeight: "600", color: "#344054" }}
                >
                  About {caregiverDetails?.full_name}
                </Typography>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      md: "row",
                    },
                    alignItems: {
                      md: "center",
                    },
                    justifyContent: {
                      md: "space-between",
                    },
                  }}
                >
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#98A2B3",
                        }}
                      >
                        Hourly rate
                      </span>
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "700",
                          color: "#101828",
                          marginLeft: "10px",
                        }}
                      >
                        {caregiverDetails?.services_cost}
                      </span>
                      <span
                        style={{
                          color: "#C5C5C5",
                          fontSize: "40px",
                          marginLeft: "15px",
                          fontWeight: "100",
                        }}
                      >
                        |
                      </span>
                    </Typography>
                    <Typography>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#98A2B3",
                        }}
                      >
                        Years exp.
                      </span>
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "700",
                          color: "#101828",
                          marginLeft: "5px",
                        }}
                      >
                        {caregiverDetails?.experience}
                      </span>
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography
                      sx={{
                        color: "#101828",
                        fontSize: "16px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {caregiverDetails?.age}years
                      <span
                        style={{
                          color: "#C5C5C5",
                          fontSize: "40px",
                          marginLeft: "15px",
                          marginRight: "15px",
                          fontWeight: "100",
                        }}
                      >
                        |
                      </span>
                      {caregiverDetails?.gender}
                      <span
                        style={{
                          color: "#C5C5C5",
                          fontSize: "40px",
                          marginLeft: "15px",
                          marginRight: "15px",
                          fontWeight: "100",
                        }}
                      >
                        |
                      </span>
                      Speaking {caregiverDetails?.language_speak}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "16px", fontWeight: "400", color: "#344054" }}
                >
                  {caregiverDetails?.about}
                </Typography>
              </CardContent>
            </Card>
            {/* Connect */}
            <Card sx={{ marginTop: "20px" }} elevation={3}>
              <CardContent>
                <Typography
                  sx={{ fontSize: "20px", fontWeight: "600", color: "#344054" }}
                >
                  Connect {caregiverDetails?.full_name}
                </Typography>
                <Stack direction={"row "} alignItems={"center"} marginTop={1}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#98A2B3",
                    }}
                  >
                    <DateRangeIcon />
                    Availability Dates
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#101828",
                      marginLeft: "10px",
                    }}
                  >
                    {caregiverDetails?.todayDate}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#98A2B3",
                      marginLeft: "40px",
                    }}
                  >
                    <AccessTimeIcon />
                    Time
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#101828",
                      marginLeft: "10px",
                    }}
                  >
                    {caregiverDetails?.todayAvailabilityStartTime}
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: "#344054",
                    marginTop: "10px",
                  }}
                >
                  Send {caregiverDetails?.full_name} Message{" "}
                  <span style={{ color: "#FC9155" }}>here..</span>
                </Typography>
              </CardContent>
            </Card>
            {/* Reviews */}
            <Card sx={{ marginTop: "20px" }} elevation={3}>
              <CardContent>
                <Typography
                  color={"#344054"}
                  fontSize={"20px"}
                  fontWeight={"600"}
                >
                  Reviews
                </Typography>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography
                    color={"#101828"}
                    fontSize={"24px"}
                    fontWeight={"600"}
                  >
                    5.0
                  </Typography>
                  <Rating
                    defaultValue={5}
                    precision={0.5}
                    sx={{ fontSize: "20px" }}
                  />
                  <Typography
                    color={"#101828"}
                    fontSize={"16px"}
                    fontWeight={"600"}
                  >
                    (5)
                  </Typography>
                </Stack>
                <CaregiverProfileReview />
                <CaregiverProfileReview />
                <CaregiverProfileReview />
              </CardContent>
            </Card>
            <Stack marginTop={3} direction={"row"} spacing={4}>
              <Card sx={{ width: "50%", flexGrow: 1 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    fontSize={"20px"}
                    fontWeight={"600"}
                    color={"#344054"}
                  >
                    Highlights
                  </Typography>
                  <Box>
                    <ul style={{ listStyle: "none" }}>
                      {highlights.map((item) => (
                        <li>
                          {" "}
                          <TaskAltIcon
                            color="success"
                            sx={{ fontSize: "16px" }}
                          />{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ width: "50%", flexGrow: 1 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    fontSize={"20px"}
                    fontWeight={"600"}
                    color={"#344054"}
                  >
                    Can also with
                  </Typography>
                  <Box>
                    <ul>
                      {canAlsoWith.map((item) => (
                        <li>{item}</li>
                      ))}
                    </ul>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Paper>
        </Container>
      </div>

      <div>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <SelectPatient
              closeSelectPatient={handleClose}
              id={id}
              caregiverDetails={caregiverDetails}
            />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CaregiverProfile;
