import React from "react";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import lineImg from "../../../Assets/Images/Line 29.png";
import ReactFlagsSelect from "react-flags-select";
import { useState } from "react";
import bgImage from "../../../Assets/Images/Bg.png";

export const RegisterPatientDetails = () => {
  const [selected, setSelected] = useState("");
  const stateOptions = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
  ];
  const [selectedState, setSelectedState] = useState("");
  const schema = yup.object().shape({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
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
        <div className="wrapper">
          <div>
            <h1 className="form-title">Enter patient details</h1>
            <div className="form-description">Need to add perfect details</div>
          </div>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit(onSubmit)}>
              <img src={lineImg} />
              <div className="mt-2">
                <input
                  placeholder="Use my current location"
                  className="form-control"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="address1" className="login-form-label mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="address1"
                  placeholder="Enter address"
                  className="form-control"
                  style={{ border: "1px solid #475467", borderRadius: "12px" }}
                  {...register("addressLine1")}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="address2" className="login-form-label mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="address2"
                  placeholder="Enter address"
                  className="form-control"
                  style={{ border: "1px solid #475467", borderRadius: "12px" }}
                  {...register("addressLine2")}
                />
              </div>
              {/* COUNTRY AND STATE */}
              <div className="d-flex align-items-center justify-content-around mt-3">
                <div>
                  <label htmlFor="country-dropdown" className="mb-1">
                    Country
                  </label>
                  <ReactFlagsSelect
                    selected={selected}
                    onSelect={(code) => setSelected(code)}
                    placeholder="Select Country"
                    style={{
                      border: "1px solid #475467",
                      borderRadius: "12px",
                    }}
                    {...register("country")}
                  />
                </div>
                <div>
                  <label htmlFor="state-dropdown" className="mb-1">
                    State
                  </label>
                  <select
                    className="form-select"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    style={{
                      border: "1px solid #475467",
                      borderRadius: "12px",
                    }}
                    {...register("state")}
                  >
                    <option value="">Select State</option>
                    {stateOptions.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* COUNTRY AND STATE */}
              {/* CITY AND PINCODE */}
              <div className="d-flex align-items-center justify-content-around mt-3">
                <div>
                  <label htmlFor="city" className="login-form-label mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    placeholder="Enter city"
                    className="form-control"
                    style={{
                      border: "1px solid #475467",
                      borderRadius: "12px",
                    }}
                    {...register("city")}
                  />
                </div>
                <div>
                  <label htmlFor="pincode" className="login-form-label mb-1">
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
                </div>
              </div>
              {/* CITY AND PINCODE */}
              <img src={lineImg} />
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
