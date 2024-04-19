import React from "react";
import { Button } from "@mui/material";
import bgImage from "../../../Assets/Images/Bg.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { preferences } from "../../../api/Services/patient/common";

export const RegisterPatientInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state.whoNeedCare);

  const schema = yup.object().shape({
    age: yup
      .string()
      .matches(/^[0-9]+$/, "Input contains only numbers")
      .required("Age is required"),

    postcode: yup
      .string()
      .required("Postcode is required")
      .matches(/^[0-9]+$/, "Input contains only numbers")
      .min(6, "Postcode must be of six digits")
      .max(6, "Postcode must be of six digits"),
    needHelpTo: yup.string().required("Select atleast one"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitData = (data) => {
    console.log(data);
    const preferencesData = {
      who_need_care: location.state?.whoNeedCare,
      age: data.age,
      post_code: data.postcode,
      need_help: data.needHelpTo,
    };
    preferences(preferencesData).then((res) => {
      console.log(res.data);
      if (res.status === "success") {
        navigate("/register-service-needed");
      }
    });
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
        <div>
          <h1 className="form-title">Info</h1>
          <div className="form-description">Enter patient details</div>
          <div className="mt-4">
            <form
              style={{ width: "450px" }}
              onSubmit={handleSubmit(submitData)}
            >
              <div>
                <label htmlFor="age" className="login-form-label">
                  Age
                </label>
                <input
                  type="text"
                  id="age"
                  placeholder="Enter Age"
                  className="form-control mt-2"
                  style={{ border: "1px solid #475467", borderRadius: "12px" }}
                  {...register("age")}
                />
                {errors.age && (
                  <p className="text-danger">{errors.age.message}</p>
                )}
              </div>
              <div className="mt-2">
                <label htmlFor="postcode" className="login-form-label">
                  Postcode
                </label>
                <input
                  type="text"
                  id="postcode"
                  placeholder="Enter Postcode"
                  className="form-control mt-2"
                  style={{ border: "1px solid #475467", borderRadius: "12px" }}
                  {...register("postcode")}
                />
                {errors.postcode && (
                  <p className="text-danger" style={{ maxWidth: "450px" }}>
                    {errors.postcode.message}
                  </p>
                )}
              </div>

              <div className="mt-3">
                <div>Need help to</div>
                <div className="mt-1">
                  <div className="">
                    <input
                      type="radio"
                      id="findAProvider"
                      className="form-check-input"
                      value="Find a Provider"
                      {...register("needHelpTo")}
                    />
                    <label
                      htmlFor="findAProvider"
                      className="login-form-label ms-2"
                    >
                      Find a provider
                    </label>
                  </div>
                  <div className="mt-1">
                    <input
                      type="radio"
                      id="BeReadyForPlan"
                      className="form-check-input"
                      value="Be ready for a plan"
                      {...register("needHelpTo")}
                    />
                    <label
                      htmlFor="BeReadyForPlan"
                      className="login-form-label ms-2"
                    >
                      Be ready for a plan
                    </label>
                  </div>
                  <div className="mt-1">
                    <input
                      type="radio"
                      id="applyForNDIS"
                      className="form-check-input"
                      value="Apply for NDIS"
                      {...register("needHelpTo")}
                    />
                    <label
                      htmlFor="applyForNDIS"
                      className="login-form-label ms-2"
                    >
                      Apply for NDIS"
                    </label>
                  </div>
                </div>
                {errors.needHelpTo && (
                  <p className="text-danger" style={{ maxWidth: "450px" }}>
                    {errors.needHelpTo.message}
                  </p>
                )}
              </div>
              <div className="mt-4">
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
                  Next
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
