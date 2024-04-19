import React, { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import { List } from "@mui/icons-material";
import careDacLogo from "../../../src/Assets/Images/cardac-logo 1.png";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import languageImg from "../../Assets/Images/language-square.svg";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../../api/auth";
import {
  Menu,
  MenuItem,
  Typography,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";

const DrawerComp = ({ open, onClose, handleLogoClick, profile }) => {
  const [anchorEl, setAnchorEl] = useState(null);
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
    handleLogoClick();
  };

  const DrawerList = (
    <Box
      sx={{ width: "210px" }}
      role="presentation"
      // onClick={toggleDrawer(false)}
      padding={3}
    >
      <Box>
        <Box
          component={"img"}
          src={careDacLogo}
          sx={{
            padding: "5px 12px",
            border: "1px solid #98A2B3",
            borderRadius: "12px",
            backgroundColor: "#ffff",
            cursor: "pointer",
          }}
          onClick={navigateHome}
        ></Box>
        <Divider
          sx={{
            marginTop: "15px",
            marginBottom: "15px",
            border: "1px solid black",
          }}
        />
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
          fullWidth
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
          <MenuItem onClick={handleMenuClose} sx={{ color: "red" }}>
            Delete Account
          </MenuItem>
        </Menu>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          // marginLeft: "20px",
          // padding: "10px",
          gap: "5px",
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>
              {" "}
              <Link
                to={"/home"}
                style={{ textDecoration: "none", color: "#101828" }}
              >
                Home
              </Link>{" "}
            </ListItemText>
          </ListItemIcon>
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <ListItemText>
              {" "}
              <Link
                to={"/bookings"}
                style={{ textDecoration: "none", color: "#101828" }}
              >
                Appointments
              </Link>{" "}
            </ListItemText>
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ListItemText>
              <Link
                to={"/payments"}
                style={{ textDecoration: "none", color: "#101828" }}
              >
                Payments
              </Link>
            </ListItemText>
          </ListItemIcon>
        </ListItemButton>
      </Box>
      <Box component={"div"} width={"150px"}>
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
            <Typography color={"#73787E"} padding={1} fontStyle={"italic"}>
              <img src={languageImg} /> Select{" "}
            </Typography>
            <MenuItem value={10}>English</MenuItem>
            <MenuItem value={20}>Malay</MenuItem>
            <MenuItem value={30}>Thai</MenuItem>
            <MenuItem value={30}>Indonesia</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={onClose}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default DrawerComp;
