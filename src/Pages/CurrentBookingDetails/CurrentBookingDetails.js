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

const CurrentBookingDetails = () => {
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
                        sx={{ maxWidth: "144px" }}
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

            {/* Notes */}
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

export default CurrentBookingDetails;
