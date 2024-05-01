import React, { useEffect, useState } from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import {
  Box,
  CssBaseline,
  Stack,
  Grid,
  Button,
  Typography,
  Paper,
  MenuItem,
  FormControl,
  Slider,
  TextField,
  IconButton,
  ButtonGroup,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Card,
  Radio,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import StarIcon from "@mui/icons-material/Star";
import ProfileCard from "./ProfileCard";
import { getCaregiverList } from "../../api/Services/patient/caregiver";
import { getFilterData } from "../../api/Services/patient/common";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ToastContainer, toast } from "react-toastify";
import { viewProfile } from "../../api/Services/patient/profile";
import Modal from "@mui/material/Modal";
import ChangePassword from "../../Pages/Authentication/ChangePassword/ChangePassword";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

export const Home = () => {
  const [caregiverList, setCaregiverList] = useState();
  const [filterDataUniqueCities, setFilterDataUniqueCities] = useState();
  const [filterDataCondition, setFilterDataCondition] = useState();
  const [filterDataSpecialNeeds, setFilterDataSpecialNeeds] = useState();
  const [filterDataWorkerRole, setFilterDataWorkerRole] = useState();
  const [filterDataGenders, setFilterDataGenders] = useState();
  const [filterDataService, setFilterDataService] = useState();
  const [filterDataLanguages, setFilterDataLanguages] = useState();
  const [workerRoleValue, setWorkerRoleValue] = useState("all");
  const [locationValue, setLocationValue] = useState([]);
  const [ratingsSelected, setRatingsSelected] = useState({
    4: false,
    3: false,
    2: false,
    1: false,
  });
  const [ratingsValue, setRatingsValue] = useState("");
  const [genderValue, setGenderValue] = useState([]);
  const [checkedGenders, setCheckedGenders] = useState({
    Male: false,
    Female: false,
    NonBinary: false,
  });
  const [experienceValue, setExperienceValue] = useState([0, 30]);
  const [serviceValues, setServiceValues] = useState([]);
  const [specialNeedsValue, setSpecialNeedsValue] = useState([]);
  const [conditionValue, setConditionValue] = useState([]);
  const [languageValue, setLanguageValue] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const filters = {
    page: 1,
    limit: 100,
    language: languageValue.map(({ language }) => language).join(","),
    worker_role: workerRoleValue,
    gender: genderValue.join(","),
    experience: experienceValue.join("-"),
    services: serviceValues.join(","),
    average_rates: ratingsValue,
    highlight: specialNeedsValue.map(({ needs }) => needs).join(","),
    can_also_with: conditionValue.map(({ conditions }) => conditions).join(","),
    city: locationValue.join(","),
  };
  // console.log(filters);

  useEffect(() => {
    getCaregiverList(filters).then((res) => {
      setCaregiverList(res.data);
    });
  }, [
    languageValue,
    workerRoleValue,
    genderValue,
    experienceValue,
    serviceValues,
    ratingsValue,
    specialNeedsValue,
    conditionValue,
    locationValue,
  ]);

  useEffect(() => {
    getFilterData().then((res) => {
      setFilterDataUniqueCities(res.data.uniqueCities);
      setFilterDataCondition(res.data.condition);
      setFilterDataSpecialNeeds(res.data.specialNeeds);
      setFilterDataWorkerRole(res.data.worker_role);
      setFilterDataGenders(res.data.genders);
      setFilterDataService(res.data.service);
      setFilterDataLanguages(res.data.languages);
    });
    viewProfile().then((res) => {
      setUserProfile(res.data);
    });
  }, []);

  const handleClearFilters = () => {
    setLanguageValue([]);
    setWorkerRoleValue("all");
    setGenderValue([]);
    setExperienceValue([]);
    setServiceValues([]);
    setRatingsValue("");
    setSpecialNeedsValue([]);
    setConditionValue([]);
    setLocationValue([]);
    toast.success("Filter Cleared", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleWorkerRoleChange = (e) => {
    switch (e.target.value) {
      case "Full Time":
        setWorkerRoleValue("full_time");
        break;
      case "Part Time":
        setWorkerRoleValue("part_time");
        break;
      case "Student":
        setWorkerRoleValue("student");
        break;
      case "Casual":
        setWorkerRoleValue("casual");
        break;
      case "All":
        setWorkerRoleValue("all");
        break;
    }
  };

  const handleLocationChange = (e, value) => {
    setLocationValue(value);
  };

  const handleButtonClick = (e) => {
    setRatingsSelected((prevState) => {
      if (prevState[e.currentTarget.value]) {
        setRatingsValue("");
        return { ...prevState, [e.currentTarget.value]: false };
      } else {
        const updatedState = Object.fromEntries(
          Object.entries(prevState).map(([key, value]) => [
            key,
            key === e.currentTarget.value,
          ])
        );
        setRatingsValue(e.currentTarget.value);
        return updatedState;
      }
    });
  };

  const handleGenderCheckboxChange = (event) => {
    console.log(event.target.name);
    let gender = event.target.name;
    switch (gender) {
      case "Male":
        gender = "male";
        break;
      case "Female":
        gender = "female";
        break;
      case "Non-Binary":
        gender = "other";
        break;
    }
    const { name, checked } = event.target;
    setCheckedGenders((prevCheckedGenders) => ({
      ...prevCheckedGenders,
      [name]: checked,
    }));
    if (event.target.checked) {
      setGenderValue((prev) => [...prev, gender]);
    } else {
      setGenderValue((prev) => prev.filter((item) => item !== gender));
    }
  };

  const handleExperienceChange = (event, newValue) => {
    setExperienceValue(newValue);
  };

  const handleServiceChange = (e) => {
    if (e.target.checked) {
      setServiceValues((prev) => [...prev, e.target.value]);
    } else {
      setServiceValues((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    }
  };

  const handleSpecialNeedsChange = (event, value) => {
    setSpecialNeedsValue(value);
  };

  const handleConditionsChange = (event, value) => {
    setConditionValue(value);
  };

  const handleLanguageChange = (event, value) => {
    setLanguageValue(value);
  };

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  return (
    <>
      <Navbar
        profile={userProfile}
        openChangePassword={handleOpenChangePassword}
      />
      <Box sx={{ maxHeight: "100vh", overflow: "auto" }}>
        <CssBaseline />
        <Grid
          container
          sx={{
            padding: {
              xs: 5,
              sm: 5,
              md: 5,
              lg: 20,
              xl: 20,
            },
            paddingTop: {
              xs: 15,
              sm: 15,
              md: 15,
              lg: 15,
              xl: 15,
            },
          }}
          spacing={4}
        >
          <Grid item xs={12} sm={12} md={5}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px 30px 30px 30px",
                // maxHeight: "80vh",
                // overflow: "auto",
              }}
            >
              <Box>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant="h6" marginBottom={2}>
                    Showing results for
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: "40px",
                      color: "#475467",
                      border: "1px solid #98A2B3",
                      textTransform: "none",
                    }}
                    onClick={handleClearFilters}
                  >
                    Clear filter
                  </Button>
                </Stack>

                <FormControl fullWidth>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    InputLabelProps={{ sx: { color: "#101828" } }}
                    defaultValue="All"
                    onChange={handleWorkerRoleChange}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {filterDataWorkerRole?.map((item) => (
                      <MenuItem value={item.value}>{item.value}</MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <Typography variant="h6" marginBottom={2} marginTop={2}>
                  Location
                </Typography>
                <Autocomplete
                  multiple
                  fullWidth
                  id="checkboxes-tags-demo"
                  options={filterDataUniqueCities ? filterDataUniqueCities : ""}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  onChange={handleLocationChange}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // label="Checkboxes"
                      placeholder="Search City"
                    />
                  )}
                />
              </Box>
              <Box marginTop={2}>
                <Stack direction="row" justifyContent={"space-between"}>
                  <Typography variant="h6">Filter</Typography>
                </Stack>
                <Stack marginTop={2}>
                  <Paper elevation={3} sx={{ padding: "15px" }}>
                    {/* Ratings */}
                    <Box marginTop={3}>
                      <Typography
                        color={"rgb(102, 112, 133)"}
                        fontWeight={"700"}
                        fontSize={"16px"}
                        gutterBottom
                      >
                        Rating
                      </Typography>
                      <Box
                        marginTop={1}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={"10px"}
                      >
                        <Box>
                          <Button
                            onClick={handleButtonClick} // Toggle selected state on button click
                            variant={
                              ratingsSelected[4] ? "contained" : "outlined"
                            }
                            sx={{
                              color: ratingsSelected ? "" : "rgb(71, 84, 103)",
                              border: ratingsSelected
                                ? ""
                                : "1px solid rgb(152, 162, 179)",
                              borderRadius: "40px",
                              padding: "12px 18px",
                              textTransform: "none",
                            }}
                            value="4"
                          >
                            <StarIcon sx={{ color: "#FEC84B" }} />{" "}
                            <StarIcon sx={{ color: "#FEC84B" }} />{" "}
                            <StarIcon sx={{ color: "#FEC84B" }} />{" "}
                            <StarIcon sx={{ color: "#FEC84B" }} /> & Up
                          </Button>
                        </Box>
                        <Box>
                          <Button
                            onClick={handleButtonClick}
                            variant={
                              ratingsSelected[3] ? "contained" : "outlined"
                            }
                            sx={{
                              color: ratingsSelected ? "" : "rgb(71, 84, 103)",
                              border: ratingsSelected
                                ? ""
                                : "1px solid rgb(152, 162, 179)",
                              borderRadius: "40px",
                              padding: "12px 18px",
                              textTransform: "none",
                            }}
                            value="3"
                          >
                            <StarIcon sx={{ color: "#FEC84B" }} />{" "}
                            <StarIcon sx={{ color: "#FEC84B" }} />{" "}
                            <StarIcon sx={{ color: "#FEC84B" }} /> & Up
                          </Button>
                        </Box>
                        <Box>
                          <Button
                            onClick={handleButtonClick}
                            variant={
                              ratingsSelected[2] ? "contained" : "outlined"
                            }
                            sx={{
                              color: ratingsSelected ? "" : "rgb(71, 84, 103)",
                              border: ratingsSelected
                                ? ""
                                : "1px solid rgb(152, 162, 179)",
                              borderRadius: "40px",
                              padding: "12px 18px",
                              textTransform: "none",
                            }}
                            value="2"
                          >
                            <StarIcon sx={{ color: "#FEC84B" }} />{" "}
                            <StarIcon sx={{ color: "#FEC84B" }} /> & Up
                          </Button>
                        </Box>
                        <Box>
                          <Button
                            onClick={handleButtonClick}
                            variant={
                              ratingsSelected[1] ? "contained" : "outlined"
                            }
                            sx={{
                              color: ratingsSelected ? "" : "rgb(71, 84, 103)",
                              border: ratingsSelected
                                ? ""
                                : "1px solid rgb(152, 162, 179)",
                              borderRadius: "40px",
                              padding: "12px 18px",
                              textTransform: "none",
                            }}
                            value="1"
                          >
                            <StarIcon sx={{ color: "#FEC84B" }} /> & Up
                          </Button>
                        </Box>
                      </Box>
                    </Box>

                    {/* Gender */}
                    <Box marginTop={3}>
                      <Typography
                        color={"rgb(102, 112, 133)"}
                        fontWeight={"700"}
                        fontSize={"16px"}
                        gutterBottom
                      >
                        Gender
                      </Typography>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        gap={"10px"}
                        marginTop={1}
                      >
                        {filterDataGenders?.map((item) => (
                          // <Box>
                          //   <Checkbox
                          //     checked={maleChecked}
                          //     onChange={(e) => setMaleChecked(e.target.checked)}
                          //     inputProps={{ "aria-label": "controlled" }}
                          //     sx={{ display: "none" }}
                          //     value={"Male"}
                          //   />
                          //   <Button
                          //     variant={maleChecked ? "contained" : "outlined"}
                          //     onClick={handleGenderButtonClick}
                          //     // onClick={() => setMaleChecked(!maleChecked)}
                          //     sx={{
                          //       color: maleChecked ? "" : "rgb(71, 84, 103)",
                          //       border: maleChecked
                          //         ? ""
                          //         : "1px solid rgb(152, 162, 179)",
                          //       borderRadius: "40px",
                          //       padding: "12px 18px",
                          //       textTransform: "none",
                          //     }}
                          //     value={item.value}
                          //   >
                          //     {item.value}
                          //   </Button>
                          // </Box>

                          <Box
                            key={item.value}
                            display="flex"
                            alignItems="center"
                          >
                            <Checkbox
                              checked={checkedGenders[item.value]}
                              onChange={handleGenderCheckboxChange}
                              inputProps={{ "aria-label": "controlled" }}
                              sx={{ display: "none" }}
                              name={item.value}
                            />
                            <Button
                              variant={
                                checkedGenders[item.value]
                                  ? "contained"
                                  : "outlined"
                              }
                              onClick={() =>
                                handleGenderCheckboxChange({
                                  target: {
                                    name: item.value,
                                    checked: !checkedGenders[item.value],
                                  },
                                })
                              }
                              sx={{
                                color: checkedGenders[item.value]
                                  ? ""
                                  : "rgb(71, 84, 103)",
                                border: checkedGenders[item.value]
                                  ? ""
                                  : "1px solid rgb(152, 162, 179)",
                                borderRadius: "40px",
                                padding: "12px 18px",
                                textTransform: "none",
                              }}
                            >
                              {item.value}
                            </Button>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    {/* Experience */}
                    <Box marginTop={3}>
                      <Typography
                        color={"rgb(102, 112, 133)"}
                        fontWeight={"700"}
                        fontSize={"16px"}
                        gutterBottom
                      >
                        Experience
                      </Typography>
                      <Box
                        sx={{
                          maxWidth: {
                            md: 300,
                          },
                        }}
                      >
                        <Slider
                          getAriaLabel={() => "Temperature range"}
                          value={experienceValue}
                          onChange={handleExperienceChange}
                          valueLabelDisplay="auto"
                          // getAriaValueText={valuetext}
                          sx={{ color: "#FC9155" }}
                          max={30}
                        />
                      </Box>
                    </Box>

                    {/* Select Service */}
                    <Box marginTop={3}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "16px",
                          color: "#667085",
                          fontWeight: "600",
                        }}
                      >
                        Select service
                      </Typography>
                      <Stack>
                        <FormGroup>
                          {filterDataService?.map((item) => (
                            <FormControlLabel
                              control={<Checkbox />}
                              label={item.services}
                              onChange={handleServiceChange}
                              value={item.services}
                            />
                          ))}
                        </FormGroup>
                      </Stack>
                    </Box>

                    <Box marginTop={3}>
                      <Typography gutterBottom>Special Needs</Typography>
                      <Autocomplete
                        multiple
                        fullWidth
                        id="checkboxes-tags-demo"
                        options={
                          filterDataSpecialNeeds ? filterDataSpecialNeeds : ""
                        }
                        disableCloseOnSelect
                        onChange={handleSpecialNeedsChange}
                        getOptionLabel={(option) => option.needs}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.needs}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // label="Checkboxes"
                            placeholder="Search Needs"
                          />
                        )}
                      />
                    </Box>
                    <Box marginTop={3}>
                      <Typography gutterBottom>My Conditions</Typography>
                      <Autocomplete
                        multiple
                        fullWidth
                        id="checkboxes-tags-demo"
                        options={filterDataCondition ? filterDataCondition : ""}
                        disableCloseOnSelect
                        onChange={handleConditionsChange}
                        getOptionLabel={(option) => option.conditions}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.conditions}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // label="Checkboxes"
                            placeholder="Search Conditions"
                          />
                        )}
                      />
                    </Box>
                    <Box marginTop={3}>
                      <Typography gutterBottom>Languages Know</Typography>
                      <Autocomplete
                        multiple
                        fullWidth
                        id="checkboxes-tags-demo"
                        options={filterDataLanguages ? filterDataLanguages : ""}
                        disableCloseOnSelect
                        onChange={handleLanguageChange}
                        getOptionLabel={(option) => option.language}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.language}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // label="Checkboxes"
                            placeholder="Search Languages"
                          />
                        )}
                      />
                    </Box>
                  </Paper>
                </Stack>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            <Paper elevation={3} sx={{ padding: "20px 30px 30px 30px" }}>
              <Typography variant="h6" gutterBottom>
                Caregiver
              </Typography>
              <Stack direction={"column"} spacing={2}>
                {caregiverList?.map((item) => (
                  <ProfileCard caregiverData={item} />
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
      <Modal
        open={openChangePassword}
        onClose={handleCloseChangePassword}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ChangePassword />
        </Box>
      </Modal>
    </>
  );
};
