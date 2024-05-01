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
import HomeIcon from "@mui/icons-material/Home";
import { getMember } from "../../api/Services/patient/member";
import {
  viewAllServices,
  viewServices,
} from "../../api/Services/patient/services";
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
  const [profileData, setProfileData] = useState();
  const [conditionList, setConditionList] = useState([]);
  const [specialNeedsList, setSpecialNeedsList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [newServices, setNewServices] = useState([]);
  const [members, setMembers] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [editMember, setEditMember] = useState(false);
  const [openFormValue, setOpenFormValue] = useState(true);
  const [initials, setInitials] = useState([]);

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

  const getProfileData = () => {
    viewProfile().then((res) => {
      setProfileData(res.data);
    });
  };
  const getAddedServices = () => {
    viewServices().then((res) => {
      setNewServices(res.data);
    });
    console.log(newServices);
  };

  useEffect(() => {
    viewProfile().then((res) => {
      setProfileData(res.data);
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
      // setMembers(res.data);
      const membersArray = res.data;

      const membersWithInitials = membersArray.map((item) => {
        const fullName = item.full_name;
        const [firstname, lastname] = fullName.split(" ");
        const firstInitial = firstname.charAt(0).toUpperCase();
        const lastInitial = lastname.charAt(0).toUpperCase();
        const initials = firstInitial + lastInitial;
        return { ...item, initials: initials };
      });
      setMembers(membersWithInitials);
    });

    viewServices().then((res) => {
      setNewServices(res.data);
      // setNewServices((prev) => [...prev, res.data]);
    });
  }, []);

  useEffect(() => {
    viewAllServices().then((res) => {
      const serviceList = res.data;
      const updatedServiceList = serviceList.map((item1) => {
        const foundItem = newServices.find(
          (item2) => item2.services === item1.services
        );
        if (foundItem) {
          return { ...item1, checked: true };
        } else {
          return item1;
        }
      });

      setServicesList(updatedServiceList);
    });
  }, [newServices]);
  console.log(servicesList);

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
                  // image={profileData?.profile_image}
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
                      <span
                        style={{
                          color: "#101828",
                          fontSize: "16px",
                          fontWeight: "600",
                          marginLeft: "10px",
                        }}
                      >
                        +91 {profileData?.mobile_number}
                      </span>
                      <MailOutlineIcon
                        sx={{ marginRight: "10px", marginLeft: "10px" }}
                      />
                      <span
                        style={{
                          color: "#101828",
                          fontSize: "16px",
                          fontWeight: "600",
                          // marginLeft: "10px",
                        }}
                      >
                        {" "}
                        {profileData?.email}
                      </span>
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
                      Emergency contact
                      <span
                        style={{
                          color: "#101828",
                          fontSize: "16px",
                          fontWeight: "600",
                          marginLeft: "10px",
                        }}
                      >
                        +91 {profileData?.emergency_mobile_number}
                      </span>
                    </Typography>
                    <Typography
                      gutterBottom
                      fontSize={"16px"}
                      color={"#667085"}
                      fontWeight={"500"}
                    >
                      <HomeIcon sx={{ marginRight: "10px" }} />
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
                        color: "#024FAA",
                        border: "1px solid #024FAA",
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
                  <Typography
                    fontSize={"20px"}
                    fontWeight={600}
                    color={"#344054"}
                  >
                    My Condition
                  </Typography>
                  <Button
                    variant="text"
                    onClick={handleOpenMyCondition}
                    value="My Condition"
                    sx={{
                      color: "#024FAA",
                      fontSize: "20px",
                      fontWeight: 600,
                      textTransform: "none",
                    }}
                  >
                    Edit
                  </Button>
                </Stack>
                <Stack marginTop={1}>
                  {conditionList.map((item) => (
                    <Typography
                      gutterBottom
                      fontSize={"16px"}
                      fontWeight={600}
                      color={"#344054"}
                    >
                      <TaskAltIcon
                        color="success"
                        sx={{ marginRight: "10px", fontSize: "16px" }}
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
                  <Typography
                    fontSize={"20px"}
                    fontWeight={600}
                    color={"#344054"}
                  >
                    Special Needs
                  </Typography>
                  <Button
                    variant="text"
                    value="Special Needs"
                    onClick={handleOpenMyCondition}
                    sx={{
                      color: "#024FAA",
                      fontSize: "20px",
                      fontWeight: 600,
                      textTransform: "none",
                    }}
                  >
                    Edit
                  </Button>
                </Stack>
                <Stack marginTop={1}>
                  <ul>
                    {specialNeedsList.map((item) => (
                      <li>
                        <Typography
                          gutterBottom
                          fontSize={"16px"}
                          fontWeight={600}
                          color={"#667085"}
                        >
                          {item.needs}
                        </Typography>
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
                  <Typography
                    fontSize={"20px"}
                    fontWeight={600}
                    color={"#344054"}
                  >
                    Services I need
                  </Typography>
                  <Button
                    variant="text"
                    onClick={handleOpenServiceNeeded}
                    value="true"
                    sx={{
                      color: "#024FAA",
                      fontSize: "20px",
                      fontWeight: 600,
                      textTransform: "none",
                    }}
                  >
                    Edit
                  </Button>
                </Stack>
                <Stack marginTop={1}>
                  <ul>
                    {newServices.map((item) => (
                      <li>
                        <Typography
                          gutterBottom
                          fontSize={"16px"}
                          fontWeight={600}
                          color={"#667085"}
                        >
                          {item.services}
                        </Typography>
                      </li>
                    ))}
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
                <Typography
                  fontSize={"20px"}
                  fontWeight={600}
                  color={"#344054"}
                >
                  Family Member Details
                </Typography>
                <Button
                  variant="text"
                  onClick={handleAddMember}
                  sx={{
                    color: "#024FAA",
                    fontSize: "20px",
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
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
                      <Box
                        bgcolor={"#D1E6FF"}
                        height={"32px"}
                        width={"32px"}
                        borderRadius={"50px"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        marginLeft={"10px"}
                      >
                        <Typography
                          color={"#024FAA"}
                          fontSize={"14px"}
                          fontWeight={500}
                        >
                          {item.initials}
                        </Typography>
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
                            <Typography
                              fontSize={"16px"}
                              fontWeight={500}
                              color={"#101828"}
                            >
                              {item.full_name}
                            </Typography>
                            <Typography
                              fontSize={"14px"}
                              fontWeight={400}
                              color={"#101828"}
                            >
                              {item.age}
                            </Typography>
                          </Stack>
                          <Stack>
                            <Typography fontSize={"14px"} color={"#667085"}>
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
                <Typography
                  fontSize={"20px"}
                  fontWeight={600}
                  color={"#344054"}
                >
                  Payment details
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    color: "#024FAA",
                    fontSize: "20px",
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  Add new{" "}
                </Button>
              </Stack>
              <Stack spacing={2} marginTop={2}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    bgcolor={"#D1E6FF"}
                    height={"32px"}
                    width={"32px"}
                    borderRadius={"50px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    marginLeft={"10px"}
                  >
                    <Typography
                      color={"#024FAA"}
                      fontSize={"14px"}
                      fontWeight={500}
                    >
                      {initials}
                    </Typography>
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
                        <Typography
                          fontSize={"16px"}
                          fontWeight={500}
                          color={"#101828"}
                        >
                          Samarth Patel
                        </Typography>
                        <Typography
                          fontSize={"14px"}
                          fontWeight={400}
                          color={"#101828"}
                        >
                          1234-XXXX-XXXX-1234
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography
                          fontSize={"14px"}
                          fontWeight={400}
                          color={"#667085"}
                        >
                          12/25
                        </Typography>
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
                  <Box
                    bgcolor={"#D1E6FF"}
                    height={"32px"}
                    width={"32px"}
                    borderRadius={"50px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    marginLeft={"10px"}
                  >
                    <Typography
                      color={"#024FAA"}
                      fontSize={"14px"}
                      fontWeight={500}
                    >
                      {initials}
                    </Typography>
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
                        <Typography
                          fontSize={"16px"}
                          fontWeight={500}
                          color={"#101828"}
                        >
                          Samarth Patel{" "}
                        </Typography>
                        <Typography
                          fontSize={"14px"}
                          fontWeight={400}
                          color={"#101828"}
                        >
                          1234-XXXX-XXXX-1234
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography
                          fontSize={"14px"}
                          fontWeight={400}
                          color={"#667085"}
                        >
                          12/25
                        </Typography>
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
              getProfileData={getProfileData}
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
              getAddedServices={getAddedServices}
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
