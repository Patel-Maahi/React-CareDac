import React from "react";
import { Typography, Box } from "@mui/material";

const CaregiverProfileReview = () => {
  return (
    <>
      <Box
        marginTop={2}
        sx={{
          borderRadius: "8px",
          border: "1px solid #F2F4F7",
          padding: "15px",
        }}
      >
        <Typography
          sx={{
            color: "#344054",
            fontSize: "16px",
            fontWeight: "400",
          }}
          gutterBottom
        >
          Reviewed by{" "}
          <span style={{ color: "#101828", fontWeight: "600" }}>Kim A.</span>
        </Typography>
        <Typography
          sx={{
            color: "#344054",
            fontSize: "14px",
            fontWeight: "400",
          }}
        >
          Donec dictum tristique porta. Etiam convallis lorem lobortis nulla
          molestie, nec tincidunt ex ullamcorper..
        </Typography>
      </Box>
    </>
  );
};

export default CaregiverProfileReview;
