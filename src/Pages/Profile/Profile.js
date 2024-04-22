import {
  CardMedia,
  Container,
  Card,
  Stack,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProfileImg2 from "../../Assets/Images/Rectangle 6.png";
import FemaleIcon from "@mui/icons-material/Female";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AvatarImg from "../../Assets/Images/Avatar.png";
import MaleIcon from "@mui/icons-material/Male";
import { Navbar } from "../../Components/Navbar/Navbar";
import EditProfile from "./EditProfile";
import Modal from "@mui/material/Modal";
import MyCondition from "./MyCondition";
import { RegisterServiceNeeded } from "../Authentication/RegisterServiceNeeded/RegisterServiceNeeded";
import { viewProfile } from "../../api/Services/patient/profile";
import { getCondition } from "../../api/Services/patient/condition";
import { getSpecialNeeds } from "../../api/Services/patient/specialNeeds";
import { getMember } from "../../api/Services/patient/member";
import { viewAllServices } from "../../api/Services/patient/services";
import ViewMemberDetails from "./ViewMemberDetails";

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

const Profile = () => {
  const imgUrl = "https://caredac-web.s3.ap-southeast-2.amazonaws.com";
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openMyCondition, setOpenMyCondition] = useState(false);
  const [modalValue, setModalValue] = useState();
  const [openServiceNeeded, setOpenServiceNeeded] = useState(false);
  const [openViewMemberDetails, setOpenViewMemberDetails] = useState(false);
  // const [profileImg, setProfileImg] = useState(ProfileImg2);
  const [profileData, setProfileData] = useState();
  const [conditionList, setConditionList] = useState([]);
  const [specialNeedsList, setSpecialNeedsList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [members, setMembers] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [editMember, setEditMember] = useState(false);
  const [openFormValue, setOpenFormValue] = useState(true);

  const handleOpenEditProfile = () => {
    setOpenFormValue(true);
    setOpenEditProfile(true);
  };
  const handleCloseEditProfile = () => setOpenEditProfile(false);

  const handleOpenMyCondition = (e) => {
    setOpenMyCondition(true);
    setModalValue(e.target.value);
  };
  const handleCloseMyCondition = () => setOpenMyCondition(false);

  const handleOpenServiceNeeded = (e) => {
    setOpenServiceNeeded(true);
    setModalValue(e.target.value);
  };
  const handleCloseServiceNeeded = () => setOpenServiceNeeded(false);

  const handleOpenViewMemberDetails = (id) => {
    setOpenViewMemberDetails(true);
    const memberDetails = members.find((item) => item.id === id);
    setMemberData(memberDetails);
  };
  const handleCloseViewMemberDetails = () => {
    setOpenViewMemberDetails(false);
  };

  const handleListChange = () => {
    getCondition().then((res) => {
      const conditionData = res.data;
      setConditionList(conditionData);
    });
    getSpecialNeeds().then((res) => {
      const specialNeedsData = res.data;
      setSpecialNeedsList(specialNeedsData);
    });
  };

  const handleGetAllMembers = () => {
    getMember().then((res) => {
      setMembers(res.data);
    });
  };

  useEffect(() => {
    viewProfile().then((res) => {
      setProfileData(res.data);
      // setProfileImg(res.data.profile_image);
    });
    getCondition().then((res) => {
      const conditionData = res.data;
      setConditionList(conditionData);
    });
    getSpecialNeeds().then((res) => {
      const specialNeedsData = res.data;
      setSpecialNeedsList(specialNeedsData);
    });
    getMember().then((res) => {
      setMembers(res.data);
    });
    viewAllServices().then((res) => {
      setServicesList(res.data);
    });
    // const updatedServiceList = serviceList.map((item) => {
    //   const checkService = serviceAdded.find(
    //     (service) => service.services === item.services
    //   );
    //   return checkService ? { ...item, checked: true } : item;
    // });
    // setServicesList(updatedServiceList);
  }, []);

  const handleAddMember = () => {
    setOpenFormValue(false);
    setOpenEditProfile(true);
    setEditMember(false);
  };
  const handleEditMember = () => {
    setOpenFormValue(false);
    setOpenEditProfile(true);
    setEditMember(true);
  };
  return (
    <>
      <Navbar />
      <Box sx={{ maxHeight: "100vh", overflow: "auto" }}>
        <Container sx={{ marginTop: "120px" }}>
          <Card>
            <Stack
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                alignItems: {
                  xs: "center",
                  md: "start",
                },
                justifyContent: {
                  xs: "space-between",
                  md: "",
                },
              }}
              // alignItems={"center"}
              spacing={2}
              marginLeft={"20px"}
            >
              <Box>
                <CardMedia
                  component={"img"}
                  image={`${imgUrl}${profileData?.profile_image}`}
                  sx={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "10px",
                    marginTop: "35px",
                    objectFit: "fill",
                  }}
                />
              </Box>
              <Box flexGrow={1}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      md: "row",
                    },
                    alignItems: {
                      xs: "center",
                      md: "",
                    },
                    justifyContent: {
                      xs: "space-between",
                      md: "",
                    },
                  }}
                >
                  <Box>
                    <Typography
                      gutterBottom
                      fontSize={"16px"}
                      color={"#667085"}
                      fontWeight={"500"}
                    >
                      <span
                        style={{
                          color: "#101828",
                          fontSize: "20px",
                          fontWeight: "700",
                        }}
                      >
                        {profileData?.full_name}
                      </span>
                      {profileData?.gender === "female" ? (
                        <FemaleIcon />
                      ) : (
                        <MaleIcon />
                      )}

                      {profileData?.gender}
                    </Typography>
                    <Typography
                      gutterBottom
                      fontSize={"16px"}
                      color={"#667085"}
                      fontWeight={"500"}
                    >
                      <CallIcon sx={{ marginRight: "10px" }} />
                      +91 {profileData?.mobile_number}
                      <MailOutlineIcon
                        sx={{ marginRight: "10px", marginLeft: "10px" }}
                      />
                      {profileData?.email}
                    </Typography>
                    <Typography
                      gutterBottom
                      fontSize={"16px"}
                      color={"#667085"}
                      fontWeight={"500"}
                    >
                      <CalendarMonthIcon sx={{ marginRight: "10px" }} />
                      Date of Birth{" "}
                      <span
                        style={{
                          color: "#101828",
                          fontSize: "16px",
                          fontWeight: "600",
                          marginLeft: "10px",
                        }}
                      >
                        {profileData?.dob}
                      </span>
                    </Typography>
                    <Typography
                      gutterBottom
                      fontSize={"16px"}
                      color={"#667085"}
                      fontWeight={"500"}
                    >
                      <CallIcon sx={{ marginRight: "10px" }} />
                      Emergency contact +91{" "}
                      {profileData?.emergency_mobile_number}
                    </Typography>
                    <Typography
                      gutterBottom
                      fontSize={"16px"}
                      color={"#667085"}
                      fontWeight={"500"}
                    >
                      <CalendarMonthIcon sx={{ marginRight: "10px" }} />
                      Address{" "}
                      <span
                        style={{
                          color: "#101828",
                          fontSize: "16px",
                          fontWeight: "600",
                          marginLeft: "10px",
                        }}
                      >
                        {profileData?.address1}
                      </span>
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: "40px",
                        padding: "10px 30px",
                        textTransform: "none",
                        marginTop: {
                          xs: "20px",
                          md: "0px",
                        },
                      }}
                      onClick={handleOpenEditProfile}
                    >
                      Edit Profile
                    </Button>
                  </Box>
                </CardContent>
              </Box>
            </Stack>
          </Card>
          <Stack
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: {
                xs: "0px",
                md: "20px",
              },
            }}
            spacing={2}
            marginTop={3}
          >
            <Card
              sx={{
                width: {
                  xs: "100%",
                  md: "33%",
                },
              }}
            >
              <CardContent>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography>My Condition</Typography>
                  <Button
                    variant="text"
                    onClick={handleOpenMyCondition}
                    value="My Condition"
                  >
                    Edit
                  </Button>
                </Stack>
                <Stack marginTop={1}>
                  {conditionList.map((item) => (
                    <Typography gutterBottom>
                      <TaskAltIcon
                        color="success"
                        sx={{ marginRight: "10px" }}
                      />
                      {item.conditions}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
            <Card
              sx={{
                width: {
                  xs: "100%",
                  md: "33%",
                },
              }}
            >
              <CardContent>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography>Special Needs</Typography>
                  <Button
                    variant="text"
                    value="Special Needs"
                    onClick={handleOpenMyCondition}
                  >
                    Edit
                  </Button>
                </Stack>
                <Stack marginTop={1}>
                  <ul>
                    {specialNeedsList.map((item) => (
                      <li>
                        <Typography gutterBottom>{item.needs}</Typography>
                      </li>
                    ))}
                  </ul>
                </Stack>
              </CardContent>
            </Card>
            <Card
              sx={{
                width: {
                  xs: "100%",
                  md: "33%",
                },
              }}
            >
              <CardContent>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography>Services I need</Typography>
                  <Button
                    variant="text"
                    onClick={handleOpenServiceNeeded}
                    value="true"
                  >
                    Edit
                  </Button>
                </Stack>
                <Stack marginTop={1}>
                  <ul>
                    <li>
                      <Typography gutterBottom>Personals care</Typography>
                    </li>
                    <li>
                      {" "}
                      <Typography gutterBottom>Domestic Assistance</Typography>
                    </li>
                    <li>
                      {" "}
                      <Typography gutterBottom>
                        Out and About Transport
                      </Typography>
                    </li>
                  </ul>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: {
                xs: "0px",
                md: "20px",
              },
            }}
            spacing={2}
            marginTop={3}
          >
            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "50%",
                },
              }}
              padding={2}
              border={"1px solid #F2F4F7"}
              marginTop={3}
              borderRadius={"8px"}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography>Family Member Details</Typography>
                <Button variant="text" onClick={handleAddMember}>
                  Add new member
                </Button>
              </Stack>
              <Stack spacing={2} marginTop={2}>
                {members.map((item) => (
                  <Box
                    component={"div"}
                    onClick={() => handleOpenViewMemberDetails(item.id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Card
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <Box>
                        <CardMedia
                          component={"img"}
                          image={AvatarImg}
                          sx={{
                            width: "32px",
                            borderRadius: "50px",
                            marginLeft: "10px",
                          }}
                        />
                      </Box>
                      <Box flexGrow={1}>
                        <CardContent
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Stack>
                            <Typography>{item.full_name}</Typography>
                            <Typography>{item.age}</Typography>
                          </Stack>
                          <Stack>
                            <Typography>
                              {item.gender === "male" ? (
                                <MaleIcon />
                              ) : (
                                <FemaleIcon />
                              )}

                              {item.gender}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Box>
                    </Card>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "50%",
                },
              }}
              padding={2}
              borderRadius={"8px"}
              border={"1px solid #F2F4F7"}
              marginTop={3}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography>Payment details</Typography>
                <Button variant="text">Add new </Button>
              </Stack>
              <Stack spacing={2} marginTop={2}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <CardMedia
                      component={"img"}
                      image={AvatarImg}
                      sx={{
                        width: "32px",
                        borderRadius: "50px",
                        marginLeft: "10px",
                      }}
                    />
                  </Box>
                  <Box flexGrow={1}>
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack>
                        <Typography>Samarth Patel</Typography>
                        <Typography>1234-XXXX-XXXX-1234</Typography>
                      </Stack>
                      <Stack>
                        <Typography>12/25</Typography>
                      </Stack>
                    </CardContent>
                  </Box>
                </Card>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <CardMedia
                      component={"img"}
                      image={AvatarImg}
                      sx={{
                        width: "32px",
                        borderRadius: "50px",
                        marginLeft: "10px",
                      }}
                    />
                  </Box>
                  <Box flexGrow={1}>
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack>
                        <Typography>Samarth Patel </Typography>
                        <Typography>1234-XXXX-XXXX-1234</Typography>
                      </Stack>
                      <Stack>
                        <Typography>12/25</Typography>
                      </Stack>
                    </CardContent>
                  </Box>
                </Card>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Box>
        {/* EditProfile Condition */}
        <Modal
          open={openEditProfile}
          onClose={handleCloseEditProfile}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditProfile
              profileData={profileData}
              closeEditProfile={handleCloseEditProfile}
              viewProfile={viewProfile}
              openFormValue={openFormValue}
              addNewMember={handleGetAllMembers}
              editMember={editMember}
              memberData={memberData}
            />
          </Box>
        </Modal>

        {/* MyCondition Modal and Special Needs*/}
        <Modal
          open={openMyCondition}
          onClose={handleCloseMyCondition}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <MyCondition
              closeMyCondition={handleCloseMyCondition}
              onListChange={handleListChange}
              modalValue={modalValue}
              conditionsList={conditionList}
              specialNeedsList={specialNeedsList}
            />
          </Box>
        </Modal>

        {/* Service I need */}
        <Modal
          open={openServiceNeeded}
          onClose={handleCloseServiceNeeded}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <RegisterServiceNeeded
              closeServiceNeeded={handleCloseServiceNeeded}
              modalValue={modalValue}
              servicesList={servicesList}
            />
          </Box>
        </Modal>

        {/* View Member Details */}
        <Modal
          open={openViewMemberDetails}
          onClose={handleCloseViewMemberDetails}
        >
          <Box sx={style}>
            <ViewMemberDetails
              closeViewMemberDetails={handleCloseViewMemberDetails}
              memberData={memberData}
              editMember={handleEditMember}
              getAllMembers={handleGetAllMembers}
            />
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default Profile;
