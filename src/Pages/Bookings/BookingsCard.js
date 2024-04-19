import {
  CardContent,
  CardMedia,
  Container,
  Paper,
  Stack,
  Typography,
  Box,
  Card,
  Button,
} from "@mui/material";
import React from "react";
import ProfileImg from "../../Assets/Images/profile.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CallIcon from "@mui/icons-material/Call";

const BookingsCard = () => {
  return (
    <>
      <Card>
        <Stack marginLeft={2} direction={"row"} alignItems={"center"}>
          <Box>
            <CardMedia
              image={ProfileImg}
              component="img"
              sx={{ maxWidth: "64px" }}
            />
          </Box>
          <Box flexGrow={1}>
            <CardContent>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>
                  <Typography
                    color={"#101828"}
                    fontSize={"16px"}
                    fontWeight={"500"}
                    gutterBottom
                  >
                    Paula Mora
                  </Typography>
                  <Typography
                    color={"#101828"}
                    fontSize={"14px"}
                    fontWeight={"400"}
                  >
                    Oct 17, 2023 1:55 am
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    endIcon={<AccessTimeIcon />}
                    sx={{
                      flexDirection: "column-reverse",
                      textTransform: "none",
                      boxShadow: "2px 2px 15px 0px #0000000D",
                      color: "#475467",
                      border: "1px solid #F2F4F7",
                    }}
                  >
                    2 hr
                  </Button>
                  <Button
                    variant="outlined"
                    endIcon={<CallIcon />}
                    sx={{
                      flexDirection: "column-reverse",
                      textTransform: "none",
                      boxShadow: "2px 2px 15px 0px #0000000D",
                      color: "#475467",
                      border: "1px solid #F2F4F7",
                    }}
                  >
                    call
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Box>
        </Stack>
      </Card>
    </>
  );
};

export default BookingsCard;
