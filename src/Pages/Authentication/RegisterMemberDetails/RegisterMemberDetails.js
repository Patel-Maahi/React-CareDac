import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import lineImg from "../../../Assets/Images/Line 29.png";
import { useState } from "react";
import bgImage from "../../../Assets/Images/Bg.png";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { addMember, getMember } from "../../../api/Services/patient/member";

export const RegisterMemberDetails = () => {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  // const [address1, setAddress1] = useState("");
  // const [address2, setAddress2] = useState("");
  // const [pincode, setPincode] = useState("");

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required("Full name is required")
      .matches(/^[a-zA-Z]*$/, "Full name must contain only letters")
      .min(2, "Full name must be at least 2 characters"),
    phoneNo: yup
      .string()
      .required("Mobile number is required")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits long"),
    dateOfBirth: yup.string().required("Date of birth is required"),
    genderOption: yup.string().required("Please select an option"),
    pincode: yup
      .string()
      .required("Pincode is required")
      .matches(/^[0-9]+$/, "Input contains only numbers")
      .min(6, "Pincode must be of six digits")
      .max(6, "Pincode must be of six digits"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    const memberDetailsData = {
      full_name: data.fullName,
      dob: data.dateOfBirth,
      mobile_number: data.phoneNo,
      gender: data.genderOption,
      country: country,
      state: state,
      city: city,
      address1: data.addressLine1,
      address2: data.addressLine2,
      pin_code: data.pincode,
    };
    addMember(memberDetailsData).then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    getMember().then((res) => {
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          height: "100vh",
          backgroundSize: "100% 100%",
          fontFamily: "",
        }}
      >
        <div
          className="wrapper"
          style={{ maxHeight: "90vh", overflow: "auto" }}
        >
          <div>
            <h1 className="form-title">Enter Member Details</h1>
            <div className="form-description">Need to add perfect details</div>
          </div>
          <img src={lineImg} />
          <div className="from-wrapper mt-2">
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "450px" }}>
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
                  {...register("dateOfBirth")}
                />
                {errors.dateOfBirth && (
                  <p className="text-danger">{errors.dateOfBirth.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="phoneNo" className="login-form-label">
                  Phone Number
                </label>
                <input
                  type="number"
                  id="phoneNo"
                  placeholder="Enter mobile number"
                  className="form-control"
                  style={{
                    border: "1px solid #475467",
                    borderRadius: "12px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  {...register("phoneNo")}
                />
                {errors.phoneNo && (
                  <p className="text-danger">{errors.phoneNo.message}</p>
                )}
              </div>
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
                      {...register("genderOption")}
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
                      {...register("genderOption")}
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
                      {...register("genderOption")}
                    />
                    <label
                      htmlFor="non-binary"
                      className="login-form-label ms-2"
                    >
                      Non-Binary
                    </label>
                  </div>
                </div>
                {errors.genderOption && (
                  <p className="text-danger" style={{ maxWidth: "450px" }}>
                    {errors.genderOption.message}
                  </p>
                )}
              </div>
              <img src={lineImg} />
              <div className="mt-2">
                <input
                  placeholder="Use my current location"
                  className="form-control"
                />
              </div>
              <div>
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
                  {...register("addressLine1")}
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
                  {...register("addressLine2")}
                />
              </div>
              {/* COUNTRY AND STATE */}
              <div className="d-flex align-items-center justify-content-around mt-3">
                <div>
                  <label htmlFor="country-dropdown" className="mb-1">
                    Country
                  </label>
                  <CountrySelect
                    onChange={(e) => {
                      setCountryid(e.id);
                      setCountry(e.name);
                    }}
                    placeHolder="Select Country"
                    showFlag={true}
                    // {...register("country")}
                  />
                </div>
                <div>
                  <label htmlFor="state-dropdown" className="mb-1">
                    State
                  </label>
                  <StateSelect
                    countryid={countryid}
                    onChange={(e) => {
                      setstateid(e.id);
                      setState(e.name);
                    }}
                    placeHolder="Select State"
                    // {...register("state")}
                  />
                </div>
              </div>
              {/* COUNTRY AND STATE */}
              {/* CITY AND PINCODE */}
              <div className="d-flex align-items-center justify-content-around mt-3">
                <div>
                  <label htmlFor="city" className="login-form-label">
                    City
                  </label>
                  <CitySelect
                    countryid={countryid}
                    stateid={stateid}
                    onChange={(e) => {
                      console.log(e.name);
                      setCity(e.name);
                    }}
                    placeHolder="Select City"
                    // {...register("city")}
                  />
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
                    {...register("pincode")}
                  />
                  {errors.pincode && (
                    <p className="text-danger" style={{ maxWidth: "450px" }}>
                      {errors.pincode.message}
                    </p>
                  )}
                </div>
              </div>
              {/* CITY AND PINCODE */}

              <div className="mt-3">
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    borderRadius: "40px",
                    backgroundColor: "#024FAA",
                    fontSize: "16px",
                    textTransform: "none",
                  }}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
