import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import careDacLogo from "../../Assets/Images/cardac-logo 1.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import languageImg from "../../Assets/Images/language-square.svg";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { viewProfile } from "../../api/Services/patient/profile";
import { removeToken } from "../../api/auth";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerComp from "./DrawerComp";

export const Navbar = ({ profile }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileOpen = () => {
    navigate("/profile");
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    removeToken();
    navigate("/");
  };
  const navigateHome = () => {
    navigate("/home");
    setDrawerOpen(false);
  };
  const handleDeleteAccount = () => {
    removeToken();
    navigate("/");
  };
  return (
    <>
      <AppBar
        component={"nav"}
        sx={{
          backgroundColor: "#ffff",
          padding: "15px",
          boxShadow: "none",
          borderBottom: "1px solid #F2F4F7",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>

            <Box
              // component={"img"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexGrow={1}
            >
              <img
                src={careDacLogo}
                style={{
                  padding: "10px 14px",
                  border: "1px solid #98A2B3",
                  borderRadius: "12px",
                  backgroundColor: "#ffff",
                  cursor: "pointer",
                }}
                onClick={navigateHome}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexGrow: 1,
              },
            }}
          >
            <Box
              component={"div"}
              sx={{
                padding: "10px 14px",
                border: "1px solid #98A2B3",
                borderRadius: "12px",
                backgroundColor: "#ffff",
                cursor: "pointer",
              }}
              onClick={navigateHome}
            >
              <img src={careDacLogo} alt="CareDac Logo" />
            </Box>
            <Typography
              variant="h6"
              sx={{
                marginLeft: "20px",
                marginBottom: "20px",
                fontWeight: "500",
                fontSize: "12px",
                color: "#FC9155",
              }}
            >
              Your Location
            </Typography>
            <IconButton size="large" sx={{ color: "#98A2B3" }}>
              <ArrowDropDownIcon />
            </IconButton>
            <Box sx={{ display: "flex", gap: "30px", marginLeft: "auto" }}>
              <Box sx={{ display: "flex", gap: "40px", marginRight: "10px" }}>
                <Button
                  sx={{
                    color: "#101828",
                    textTransform: "none",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  <NavLink
                    style={{ textDecoration: "none", color: "#101828" }}
                    to={"/home"}
                  >
                    Home
                  </NavLink>
                </Button>
                <Button
                  sx={{
                    color: "#101828",
                    textTransform: "none",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  <NavLink
                    style={{ textDecoration: "none", color: "#101828" }}
                    to={"/bookings"}
                  >
                    Appointment
                  </NavLink>
                </Button>
                <Button
                  sx={{
                    color: "#101828",
                    textTransform: "none",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  <NavLink
                    style={{ textDecoration: "none", color: "#101828" }}
                    to={"/payments"}
                  >
                    Payments
                  </NavLink>
                </Button>
              </Box>
              <Box component={"div"} width={"140px"}>
                <FormControl fullWidth>
                  <InputLabel
                    id="demo-simple-select-label"
                    // shrink={false}
                    sx={{ fontStyle: "italic" }}
                  >
                    {" "}
                    <img src={languageImg} /> Select
                  </InputLabel>
                  <Select
                    id="demo-simple-select"
                    placeholder="Select"
                    // value={age}
                    // label="Age"
                    // onChange={handleChange}
                    fullWidth
                    sx={{ borderRadius: "40px" }}
                  >
                    <Typography
                      color={"#73787E"}
                      padding={1}
                      fontStyle={"italic"}
                    >
                      <img src={languageImg} /> Select{" "}
                    </Typography>
                    <MenuItem value={10}>English</MenuItem>
                    <MenuItem value={20}>Malay</MenuItem>
                    <MenuItem value={30}>Thai</MenuItem>
                    <MenuItem value={30}>Indonesia</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#024FAA",
                    color: "#ffff",
                    borderRadius: "40px",
                    padding: "15px ",
                  }}
                  onClick={handleMenuOpen}
                >
                  <PersonOutlineIcon sx={{ marginRight: "10px" }} />
                  {profile?.full_name}
                </Button>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  // anchorOrigin={{
                  //   vertical: 'top',
                  //   horizontal: 'right',
                  // }}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleProfileOpen}>Profile</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Change Password</MenuItem>
                  <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                  <MenuItem onClick={handleDeleteAccount} sx={{ color: "red" }}>
                    Delete Account
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>
        </Toolbar>
        <DrawerComp
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          handleLogoClick={navigateHome}
          profile={profile}
        />
      </AppBar>
    </>
  );
};
