import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { deleteMember } from "../../api/Services/patient/member";

const ViewMemberDetails = ({
  closeViewMemberDetails,
  memberData,
  editMember,
  getAllMembers,
}) => {
  const [memberDetails, setMemberDetails] = useState({});

  useEffect(() => {
    setMemberDetails(memberData);
  }, []);
  const handleDeleteMember = () => {
    deleteMember(memberDetails.id).then((res) => {
      if (res) {
        getAllMembers();
        closeViewMemberDetails();
      }
      console.log(res);
    });
  };
  return (
    <>
      <Box width={"600px"} padding={3}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h6" fontWeight={700}>
            Family Member Details
          </Typography>
          <IconButton disableTouchRipple onClick={closeViewMemberDetails}>
            <CancelIcon />
          </IconButton>
        </Box>

        <Divider sx={{ marginTop: "10px", marginBottom: "20px" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
              borderRadius={"8px"}
              padding={2}
            >
              <Typography gutterBottom>Name</Typography>
              <Typography fontWeight={600}>
                {memberDetails?.full_name}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              marginTop: {
                xs: "20px",
                md: "0px",
              },
            }}
          >
            <Box
              boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
              borderRadius={"8px"}
              padding={2}
            >
              <Typography gutterBottom>Age</Typography>
              <Typography fontWeight={600}>{memberDetails?.age}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} marginTop={3}>
          <Grid item xs={12} md={6}>
            <Box
              boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
              borderRadius={"8px"}
              padding={2}
            >
              <Typography gutterBottom>Gender</Typography>
              <Typography fontWeight={600}>{memberDetails?.gender}</Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              marginTop: {
                xs: "20px",
                md: "0px",
              },
            }}
          >
            <Box
              boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
              borderRadius={"8px"}
              padding={2}
            >
              <Typography gutterBottom>Date of Birth</Typography>
              <Typography fontWeight={600}>{memberDetails?.dob}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
          borderRadius={"8px"}
          padding={2}
          marginTop={4}
        >
          <Typography gutterBottom>Address</Typography>
          <Typography
            fontWeight={600}
          >{`${memberDetails?.address1}, ${memberDetails?.address2}, ${memberDetails?.city}, ${memberDetails?.state}, ${memberDetails?.country}, ${memberDetails?.pin_code}`}</Typography>
        </Box>
        <Divider sx={{ marginTop: "10px" }} />
        <Box
          marginTop={3}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Button
            variant="outlined"
            onClick={handleDeleteMember}
            sx={{ borderRadius: "40px", padding: "10px 10px", flexGrow: 1 }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={editMember}
            sx={{ borderRadius: "40px", padding: "10px 10px", flexGrow: 1 }}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ViewMemberDetails;
