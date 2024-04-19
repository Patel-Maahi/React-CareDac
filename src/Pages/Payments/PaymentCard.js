import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import ProfileImg from "../../Assets/Images/profile.png";

const PaymentCard = () => {
  return (
    <>
      <Card>
        <Stack direction={"row"} alignItems={"center"} marginLeft={"15px"}>
          <Box>
            <CardMedia
              component={"img"}
              image={ProfileImg}
              sx={{ width: "64px" }}
            />
          </Box>

          <CardContent sx={{ flexGrow: 1 }}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box>
                {" "}
                <Typography gutterBottom>Kimberly Mastrangelo</Typography>
                <Typography>Oct 29, 2023 7:38 am</Typography>
              </Box>
              <Box
                borderRadius={"8px"}
                border={"1px solid #F2F4F7"}
                boxShadow={"2px 2px 15px 0px #0000000D"}
                padding={2}
              >
                <Typography>$3,165.98</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Stack>
      </Card>
    </>
  );
};

export default PaymentCard;
