import React, { useState, useEffect } from "react";
import ProfileImg from "../../Assets/Images/profile.png";
import Card from "@mui/material/Card";
import {
  Box,
  CardMedia,
  Typography,
  Rating,
  Stack,
  CardActions,
  Button,
  CardContent,
} from "@mui/material";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { useNavigate } from "react-router-dom";
import profileNotFound from "../../Assets/Images/profile-blank.jpg";

const ProfileCard = ({ caregiverData }) => {
  const imgUrl = "https://caredac-web.s3.ap-southeast-2.amazonaws.com";

  const navigate = useNavigate();

  const handleClick = () => {
    const caregiverId = caregiverData.id;
    navigate(`/caregiver-profile/${caregiverId}`);
  };
  console.log(caregiverData.profile_image);

  return (
    <>
      <Card sx={{ padding: "15px" }}>
        <CardContent>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Stack direction={"row"} spacing={2}>
                <Box>
                  <CardMedia
                    component="img"
                    sx={{
                      width: "65px",
                      height: "65px",
                      border: "1px solid #FC9155",
                      borderRadius: "12px",
                      objectFit: "fill",
                    }}
                    image={
                      caregiverData.profile_image
                        ? `${imgUrl}${caregiverData?.profile_image}`
                        : profileNotFound
                    }
                    // alt="Caregiver Profile Image"
                  />
                </Box>

                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#101828",
                    }}
                  >
                    {caregiverData.full_name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#101828",
                    }}
                  >
                    {caregiverData.work_area}
                  </Typography>
                  <Stack direction={"row"} spacing={1}>
                    <Rating
                      precision={0.5}
                      // value={caregiverData?.total_rates}
                      defaultValue={caregiverData?.average_rates}
                    />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#101828",
                      }}
                    >
                      ({caregiverData?.total_rates}){" "}
                      {caregiverData?.total_rates}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#101828",
                  marginTop: "10px",
                }}
              >
                {caregiverData?.worker_role} Available Care
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography
                sx={{ fontSize: "16px", fontWeight: "600", color: "#101828" }}
              >
                ${caregiverData.services_cost}/hr - {caregiverData.experience}{" "}
                yrs exp
              </Typography>
              <CardActions sx={{ padding: 0 }}>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "40px",
                    backgroundColor: "#024FAA",
                    textTransform: "none",
                    padding: "10px 30px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                  disableElevation
                  onClick={handleClick}
                >
                  Book
                </Button>
              </CardActions>
              <Stack direction={"row"}>
                <GppGoodIcon color="success" sx={{ fontSize: "24px" }} />
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "500", color: "#667085" }}
                >
                  Background {caregiverData?.background_verified}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileCard;
