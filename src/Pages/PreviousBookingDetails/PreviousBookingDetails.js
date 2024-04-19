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
  TextField,
  CardActions,
} from "@mui/material";
import React from "react";
import ProfileImg from "../../Assets/Images/profile.png";
import GppGoodIcon from "@mui/icons-material/GppGood";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Navbar } from "../../Components/Navbar/Navbar";

const PreviousBookingDetails = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ maxHeight: "100vh", overflow: "auto" }}>
        <Container sx={{ marginTop: "120px" }}>
          <Paper sx={{ padding: "30px" }} elevation={3}>
            {/* Profile */}
            <Card elevation={3}>
              <CardContent>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <Box>
                      <CardMedia
                        component="img"
                        sx={{ width: "144px" }}
                        image={ProfileImg}
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
                        PART- TIME
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontSize: "20px",
                          fontWeight: "700",
                          color: "#101828",
                        }}
                      >
                        Paula Mora
                      </Typography>
                      <Stack
                        marginTop={1}
                        direction={"row"}
                        spacing={1}
                        alignItems={"center"}
                      >
                        <Rating defaultValue={5} precision={0.5} />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#101828",
                          }}
                        >
                          (5)
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
                          Background check done
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <Box>
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
                      >
                        Rebook
                      </Button>
                    </Box>

                    <Box
                      boxShadow={"2px 2px 15px 0px #0000000D"}
                      borderRadius={"8px"}
                      border={"1px solid #F2F4F7"}
                      padding={"50px 20px"}
                    >
                      <Typography>Payment </Typography>
                      <Typography>$4,584.43</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
            <Card sx={{ marginTop: "20px" }}>
              <CardContent>
                <Stack direction={"row"} spacing={3}>
                  <Box
                    padding={2}
                    boxShadow={"2px 2px 15px 0px #0000000D"}
                    borderRadius={"8px"}
                  >
                    <Typography>Booking date</Typography>
                    <Typography>Oct 17, 2023</Typography>
                  </Box>
                  <Box
                    padding={2}
                    boxShadow={"2px 2px 15px 0px #0000000D"}
                    borderRadius={"8px"}
                  >
                    <Typography>Booking Time</Typography>
                    <Typography>1:55 am</Typography>
                  </Box>
                  <Box
                    padding={2}
                    boxShadow={"2px 2px 15px 0px #0000000D"}
                    borderRadius={"8px"}
                  >
                    <Typography>Booked for</Typography>
                    <Typography>Stephanie Sharkey</Typography>
                  </Box>
                  <Box
                    padding={2}
                    boxShadow={"2px 2px 15px 0px #0000000D"}
                    borderRadius={"8px"}
                  >
                    <Typography>Age</Typography>
                    <Typography>3Yrs</Typography>
                  </Box>
                  <Box
                    padding={2}
                    boxShadow={"2px 2px 15px 0px #0000000D"}
                    borderRadius={"8px"}
                  >
                    <Typography>Gender</Typography>
                    <Typography color={"#101828"}>Male</Typography>
                  </Box>
                  <Box
                    padding={2}
                    boxShadow={"2px 2px 15px 0px #0000000D"}
                    borderRadius={"8px"}
                  >
                    <Typography>Amount</Typography>
                    <Typography sx={{ color: "#FC9155" }}>$59/hr</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
            {/* About */}
            <Card sx={{ marginTop: "20px" }} elevation={3}>
              <CardContent>
                <Typography
                  sx={{ fontSize: "20px", fontWeight: "600", color: "#344054" }}
                >
                  About Paula
                </Typography>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
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
                        $30-40{" "}
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
                        5
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
                      33yers
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
                      Female
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
                      Speaking English
                    </Typography>
                  </Stack>
                </Stack>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "16px", fontWeight: "400", color: "#344054" }}
                >
                  I am a 22-year-old graduate student pursuing my Master's in
                  Social Work. I have 5 years of experience caring for children
                  from newborn - 7 years. I am an animal lover, so pets are no
                  problem! I have my own vehicle and am willing to drive
                  children if necessary. I am more than happy to help with
                  housework while watching your children! I am a non-smoker and
                  have received my COVID-19 vaccine!
                </Typography>
              </CardContent>
            </Card>
            {/* Connect */}
            <Card sx={{ marginTop: "20px" }} elevation={3}>
              <CardContent>
                <Typography
                  sx={{ fontSize: "20px", fontWeight: "600", color: "#344054" }}
                >
                  Connect Paula
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
                    Jan 24th to 9th Feb
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
                    9:00 AM to 5:00 PM
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            {/* Reviews */}
            <Card sx={{ marginTop: "20px" }} elevation={3}>
              <CardContent>
                <Typography>Notes from Paula</Typography>

                <Box
                  marginTop={2}
                  sx={{
                    borderRadius: "8px",
                    border: "1px solid #F2F4F7",
                    padding: "15px",
                  }}
                >
                  <Typography sx={{ color: "#344054" }}>
                    Date{" "}
                    <span style={{ color: "#101828" }}>
                      {" "}
                      Nov 1, 2023 3:10 pm
                    </span>
                  </Typography>
                  <Typography sx={{ color: "#344054" }}>
                    Donec dictum tristique porta. Etiam convallis lorem lobortis
                    nulla molestie, nec tincidunt ex ullamcorper. Quisque
                    ultrices lobortis elit sed euismod. Duis in ultrices dolor,
                    ac rhoncus
                  </Typography>
                </Box>
                <Box
                  marginTop={2}
                  sx={{
                    borderRadius: "8px",
                    border: "1px solid #F2F4F7",
                    padding: "15px",
                  }}
                >
                  <Typography sx={{ color: "#344054" }}>
                    Date{" "}
                    <span style={{ color: "#101828" }}>
                      Nov 1, 2023 3:10 pm
                    </span>
                  </Typography>
                  <Typography sx={{ color: "#344054" }}>
                    Donec dictum tristique porta. Etiam convallis lorem lobortis
                    nulla molestie, nec tincidunt ex ullamcorper. Quisque
                    ultrices lobortis elit sed euismod. Duis in ultrices dolor,
                    ac rhoncus
                  </Typography>
                </Box>
                <Box
                  marginTop={2}
                  sx={{
                    borderRadius: "8px",
                    border: "1px solid #F2F4F7",
                    padding: "15px",
                  }}
                >
                  <Typography sx={{ color: "#344054" }}>
                    Date
                    <span style={{ color: "#101828" }}>
                      {" "}
                      Nov 1, 2023 3:10 pm
                    </span>
                  </Typography>
                  <Typography sx={{ color: "#344054" }}>
                    Donec dictum tristique porta. Etiam convallis lorem lobortis
                    nulla molestie, nec tincidunt ex ullamcorper. Quisque
                    ultrices lobortis elit sed euismod. Duis in ultrices dolor,
                    ac rhoncus
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ marginTop: "20px" }}>
              <CardContent>
                <Typography>Give review to Paula</Typography>
                <Rating defaultValue={2.5} precision={0.5} />
                <Typography gutterBottom>Write review</Typography>
                <TextField
                  multiline
                  rows={4}
                  label="Enter review..."
                  variant="outlined"
                  fullWidth
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "40px",
                    textTransform: "none",
                    padding: "15px 30px",
                    marginLeft: "5px",
                  }}
                >
                  Submit
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default PreviousBookingDetails;
