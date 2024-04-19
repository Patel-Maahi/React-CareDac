import React from "react";
import "./ResetPassword.css";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import bgImage from "../../../Assets/Images/Bg.png";

export const ResetPassword = () => {
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
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
          <div>
            <h1 className="form-title">Reset your password</h1>
            <p className="form-description">Change your password</p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-2">
                <label htmlFor="password" className="login-form-label">
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  placeholder="Enter password"
                  className="form-control"
                  style={{ border: "1px solid #475467", borderRadius: "12px" }}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-danger" style={{ maxWidth: "450px" }}>
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <label htmlFor="confirmPassword" className="login-form-label">
                  Confirm Password
                </label>
                <input
                  type="text"
                  id="confirmPassword"
                  placeholder="confirm password"
                  className="form-control"
                  style={{ border: "1px solid #475467", borderRadius: "12px" }}
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-danger" style={{ maxWidth: "450px" }}>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
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
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
