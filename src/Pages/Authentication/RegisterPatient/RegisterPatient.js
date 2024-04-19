import { Box, Button, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import React from "react";
import bgImage from "../../../Assets/Images/Bg.png";
import { useNavigate } from "react-router-dom";

export const RegisterPatient = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    const whoNeedCare = e.target.value;
    navigate("/register-patient-info", { state: { whoNeedCare } });
  };
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          height: "100vh",
          backgroundSize: "100% 100%",
          fontFamily: "",
        }}
      >
        <Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              Who need care?
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Enter patient details
            </Typography>
          </Box>
          <Divider orientation="horizontal" component={"div"} />
          <Stack marginTop={2} spacing={1}>
            <Button
              variant="outlined"
              sx={{
                border: "1px solid #475467",
                borderRadius: "12px",
                padding: "8px 100px",
                color: "#344054",
                textTransform: "none",
              }}
              onClick={handleClick}
              value="My Self"
            >
              My Self
            </Button>
            <Button
              variant="outlined"
              sx={{
                border: "1px solid #475467",
                borderRadius: "12px",
                padding: "8px 100px",
                color: "#344054",
                textTransform: "none",
              }}
              onClick={handleClick}
              value="My child"
            >
              My child
            </Button>
            <Button
              variant="outlined"
              sx={{
                border: "1px solid #475467",
                borderRadius: "12px",
                padding: "8px 100px",
                color: "#344054",
                textTransform: "none",
              }}
              onClick={handleClick}
              value="My Partner"
            >
              My Partner
            </Button>
            <Button
              variant="outlined"
              sx={{
                border: "1px solid #475467",
                borderRadius: "12px",
                padding: "8px 100px",
                color: "#344054",
                textTransform: "none",
              }}
              onClick={handleClick}
              value="My Client"
            >
              My Client
            </Button>
            <Button
              variant="outlined"
              sx={{
                border: "1px solid #475467",
                borderRadius: "12px",
                padding: "8px 100px",
                color: "#344054",
                textTransform: "none",
              }}
              onClick={handleClick}
              value="Other"
            >
              Other
            </Button>
          </Stack>
        </Box>
      </div>
    </>
  );
};
