import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  MenuItem,
  FormControl,
  TextField,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import profileImg from "../../Assets/Images/profile.png";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import {
  getCity,
  getCountry,
  getState,
  postCountry,
  updateProfile,
  viewProfile,
} from "../../api/Services/patient/profile";
import { Country, State, City } from "country-state-city";
import {
  addMember,
  getMember,
  updateMember,
} from "../../api/Services/patient/member";
import profileNotFound from "../../Assets/Images/profile-blank.jpg";

const EditProfile = ({
  closeEditProfile,
  profileData,
  getProfileData,
  openFormValue,
  addNewMember,
  editMember,
  memberData,
}) => {
  const imgUrl = "https://caredac-web.s3.ap-southeast-2.amazonaws.com";
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [cities, setCities] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [uploadImage, setUploadImage] = useState("");
  // const [base64Img, setBase64Img] = useState("");
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    phoneNo: "",
    emergencyPhoneNo: "",
    gender: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    profileImage: "",
  });

  // const schema = yup.object().shape({
  //   fullName: yup
  //     .string()
  //     .required("Full name is required")
  //     .matches(
  //       /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/,
  //       "Full name must contain only letters"
  //     )
  //     .min(2, "Full name must be at least 2 characters"),
  //   phoneNo: yup
  //     .string()
  //     .required("Mobile number is required")
  //     .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits long"),
  //   emergencyPhoneNo: yup
  //     .string()
  //     .required("Mobile number is required")
  //     .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits long"),
  //   dateOfBirth: yup.string().required("Date of birth is required"),
  //   gender: yup.string().required("Please select an option"),
  //   pincode: yup
  //     .string()
  //     .required("Pincode is required")
  //     .matches(/^[0-9]+$/, "Input contains only numbers")
  //     .min(6, "Pincode must be of six digits")
  //     .max(6, "Pincode must be of six digits"),
  // });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (openFormValue === true || editMember === true) {
      if (openFormValue === true) {
        setValues({
          fullName: profileData?.full_name,
          email: profileData?.email,
          dateOfBirth: profileData?.dob,
          phoneNo: profileData?.mobile_number,
          emergencyPhoneNo: profileData?.emergency_mobile_number,
          gender: profileData?.gender,
          address1: profileData?.address1,
          address2: profileData?.address2,
          country: profileData?.country,
          state: profileData?.state,
          city: profileData?.city,
          pincode: profileData?.pin_code,
          // profileImage: imgUrl + profileData?.profile_image,
          profileImage: profileData?.profile_image,
        });
      } else {
        setValues({
          fullName: memberData?.full_name,
          email: memberData?.email,
          dateOfBirth: memberData?.dob,
          phoneNo: memberData?.mobile_number,
          gender: memberData?.gender,
          address1: memberData?.address1,
          address2: memberData?.address2,
          country: memberData?.country,
          state: memberData?.state,
          city: memberData?.city,
          pincode: memberData?.pin_code,
        });
      }
    }
  }, []);
  useEffect(() => {
    getCountry().then((res) => {
      const responseData = res.data;
      const countryArray = responseData.map((item) => item.country);
      setCountries(countryArray);
    });
  }, []);

  const fileInputRef = useRef(null);
  const handleFileSelect = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    setValues({ ...values, profileImage: URL.createObjectURL(selectedFile) });
    // setValues({ ...values, profileImage: selectedFile });
    // const reader = new FileReader();
    // reader.readAsDataURL(selectedFile);
    // reader.onload = () => {
    //   setBase64Img(reader.result);
    // };

    fileInputRef.current.value = null;
  };
  // console.log(uploadImage);
  // console.log(base64Img);
  console.log(uploadImage);
  const handleSelectCountries = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setValues({ ...values, country: country });
    getState(country).then((response) => {
      const responseData = response.data.states;
      const stateArray = responseData.map((item) => item.name);
      setStates(stateArray);
    });
  };
  const handleSelectState = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setValues({ ...values, state: state });
    getCity(selectedCountry, state).then((res) => {
      setCities(res.data);
    });
  };
  const handleSelectCity = (e) => {
    setValues({ ...values, city: e.target.value });
  };
  const onSubmit = () => {
    const userData = {
      full_name: values.fullName,
      dob: values.dateOfBirth,
      mobile_number: values.phoneNo,
      emergency_mobile_number: values.emergencyPhoneNo,
      gender: values.gender,
      address1: values.address1,
      address2: values.address2,
      country: values.country,
      state: values.state,
      city: values.city,
      pin_code: values.pincode,
      profile_image: values.profileImage,
      // profile_image: uploadImage,
    };
    if (openFormValue === false && editMember === false) {
      delete userData.emergency_mobile_number;
      delete userData.profile_image;
      //adding member
      addMember(userData).then((res) => {
        if (res) {
          addNewMember();
          closeEditProfile();
        }
      });
    } else if (editMember === true) {
      //updating member details
      updateMember(memberData.id, userData).then((res) => {
        if (res) {
          addNewMember();
          closeEditProfile();
        }
      });
    } else {
      //updating user profile
      updateProfile(userData).then((res) => {
        if (res) {
          getProfileData();
          closeEditProfile();
        }
      });
    }
  };
  console.log(values.profileImage);
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Box
        sx={{
          width: "450px",
        }}
      >
        <Paper elevation={3} sx={{ padding: "20px" }}>
          <Typography fontSize={"36px"} fontWeight={"600"} color={"#101828"}>
            {openFormValue === true
              ? "Edit Profile"
              : editMember === true
              ? "Edit Member Details"
              : "Add New Member "}
          </Typography>
          <Divider />
          {openFormValue && (
            <Stack
              direction={"row"}
              alignContent={"center"}
              justifyContent={"center"}
              marginTop={"20px"}
            >
              <Box position={"relative"}>
                <img
                  src={
                    values.profileImage ? values.profileImage : profileNotFound
                  }
                  // src={values.profileImage}
                  width={"150px"}
                  height={"150px"}
                  style={{ borderRadius: "12px", objectFit: "fill" }}
                  alt="profile"
                />
                <input
                  id="fileInput"
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileSelect}
                />
                <label htmlFor="fileInput">
                  <EditIcon
                    sx={{
                      position: "absolute",
                      bottom: "0px",
                      right: "0px",
                      color: "#ffff",
                    }}
                  />
                </label>
              </Box>
            </Stack>
          )}

          <Box marginTop={2}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ maxWidth: "400px" }}
            >
              <div>
                <label htmlFor="fullName" className="login-form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter Full name"
                  className="form-control"
                  style={{
                    border: "1px solid #475467",
                    borderRadius: "12px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  {...register("fullName")}
                  value={values.fullName}
                  onChange={(e) =>
                    setValues({ ...values, fullName: e.target.value })
                  }
                />
                {errors.fullName && (
                  <p className="text-danger">{errors.fullName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="login-form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  placeholder=""
                  className="form-control"
                  style={{
                    border: "1px solid #475467",
                    borderRadius: "12px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  value={values.dateOfBirth}
                  onChange={(e) =>
                    setValues({ ...values, dateOfBirth: e.target.value })
                  }
                  // {...register("dateOfBirth")}
                />
                {errors.dateOfBirth && (
                  <p className="text-danger">{errors.dateOfBirth.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="login-form-label">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter Email"
                  className="form-control"
                  style={{
                    border: "1px solid #475467",
                    borderRadius: "12px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  {...register("email")}
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="phoneNo" className="login-form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="phoneNo"
                  placeholder="Enter mobile number"
                  className="form-control"
                  style={{
                    border: "1px solid #475467",
                    borderRadius: "12px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  value={values.phoneNo}
                  onChange={(e) =>
                    setValues({ ...values, phoneNo: e.target.value })
                  }
                  // {...register("phoneNo")}
                />
                {errors.phoneNo && (
                  <p className="text-danger">{errors.phoneNo.message}</p>
                )}
              </div>
              {openFormValue && (
                <div>
                  <label
                    htmlFor="emergencyPhoneNo"
                    className="login-form-label"
                  >
                    Emergency Mobile Number
                  </label>
                  <input
                    type="text"
                    id="emergencyPhoneNo"
                    placeholder="Enter mobile number"
                    className="form-control"
                    style={{
                      border: "1px solid #475467",
                      borderRadius: "12px",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                    value={values.emergencyPhoneNo}
                    onChange={(e) =>
                      setValues({ ...values, emergencyPhoneNo: e.target.value })
                    }
                    // {...register("emergencyPhoneNo")}
                  />
                  {errors.emergencyPhoneNo && (
                    <p className="text-danger">
                      {errors.emergencyPhoneNo.message}
                    </p>
                  )}
                </div>
              )}

              {/* Radio-buttons? */}
              <div className="mt-3">
                <div>Gender</div>
                <div className="d-flex align-items-center mt-1">
                  <div className="">
                    <input
                      type="radio"
                      id="male"
                      className="form-check-input"
                      value="male"
                      checked={values.gender === "male"}
                      onChange={(e) =>
                        setValues({ ...values, gender: e.target.value })
                      }
                      // {...register("gender")}
                    />
                    <label htmlFor="male" className="login-form-label ms-2">
                      Male
                    </label>
                  </div>
                  <div className="ms-2 ">
                    <input
                      type="radio"
                      id="female"
                      className="form-check-input"
                      value="female"
                      checked={values.gender === "female"}
                      onChange={(e) =>
                        setValues({ ...values, gender: e.target.value })
                      }
                      // {...register("gender")}
                    />
                    <label htmlFor="female" className="login-form-label ms-2">
                      Female
                    </label>
                  </div>
                  <div className="ms-2">
                    <input
                      type="radio"
                      id="non-binary"
                      className="form-check-input"
                      value="non-binary"
                      checked={values.gender === "non-binary"}
                      onChange={(e) =>
                        setValues({ ...values, gender: e.target.value })
                      }
                      // {...register("gender")}
                    />
                    <label
                      htmlFor="non-binary"
                      className="login-form-label ms-2"
                    >
                      Non-Binary
                    </label>
                  </div>
                </div>
                {errors.gender && (
                  <p className="text-danger" style={{ maxWidth: "450px" }}>
                    {errors.gender.message}
                  </p>
                )}
              </div>
              <Divider />
              <div className="mt-2">
                <input
                  placeholder="Use my current location"
                  className="form-control"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="address1" className="login-form-label">
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="address1"
                  placeholder="Enter address"
                  className="form-control"
                  style={{
                    border: "1px solid #475467",
                    borderRadius: "12px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  value={values.address1}
                  onChange={(e) =>
                    setValues({ ...values, address1: e.target.value })
                  }
                  // {...register("address1")}
                />
              </div>
              <div>
                <label htmlFor="address2" className="login-form-label">
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="address2"
                  placeholder="Enter address"
                  className="form-control"
                  style={{
                    border: "1px solid #475467",
                    borderRadius: "12px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  value={values.address2}
                  onChange={(e) =>
                    setValues({ ...values, address2: e.target.value })
                  }
                  // {...register("address2")}
                />
              </div>
              {/* COUNTRY AND STATE */}
              <div className="d-flex align-items-center justify-content-around mt-4">
                <FormControl
                  sx={{ borderColor: "red", borderRadius: "12px" }}
                  fullWidth
                >
                  <TextField
                    label="Select Country"
                    select
                    fullWidth
                    size="small"
                    InputLabelProps={{ sx: { color: "#101828" } }}
                    onChange={handleSelectCountries}
                  >
                    {countries?.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </TextField>
                </FormControl>

                <FormControl
                  sx={{ borderColor: "red", borderRadius: "12px" }}
                  fullWidth
                >
                  <TextField
                    label="Select State"
                    select
                    fullWidth
                    size="small"
                    InputLabelProps={{ sx: { color: "#101828" } }}
                    onChange={handleSelectState}
                  >
                    {states?.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </div>
              {/* COUNTRY AND STATE */}
              {/* CITY AND PINCODE */}
              <div className="d-flex align-items-center justify-content-around mt-3">
                <div style={{ width: "50%" }} className="mt-3">
                  <FormControl
                    sx={{ borderColor: "red", borderRadius: "12px" }}
                    fullWidth
                  >
                    <TextField
                      label="Select City"
                      select
                      fullWidth
                      size="small"
                      InputLabelProps={{ sx: { color: "#101828" } }}
                      onChange={handleSelectCity}
                    >
                      {cities?.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </div>
                <div>
                  <label htmlFor="pincode" className="login-form-label">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    placeholder="Enter pin code"
                    className="form-control"
                    style={{
                      border: "1px solid #475467",
                      borderRadius: "12px",
                    }}
                    value={values.pincode}
                    onChange={(e) =>
                      setValues({ ...values, pincode: e.target.value })
                    }
                    // {...register("pincode")}
                  />
                  {errors.pincode && (
                    <p className="text-danger" style={{ maxWidth: "450px" }}>
                      {errors.pincode.message}
                    </p>
                  )}
                </div>
              </div>
              {/* CITY AND PINCODE */}

              <div className="mt-3 d-flex align-items-center justify-content-between">
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: "40px",

                    fontSize: "16px",
                    textTransform: "none",
                  }}
                  onClick={closeEditProfile}
                >
                  Cancle
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    borderRadius: "40px",
                    backgroundColor: "#024FAA",
                    fontSize: "16px",
                    textTransform: "none",
                    marginLeft: "10px",
                  }}
                  disableTouchRipple
                >
                  Save
                </Button>
              </div>
            </form>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default EditProfile;
