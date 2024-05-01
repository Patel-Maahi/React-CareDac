import { Button } from "@mui/material";
import React from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { changePassword } from "../../../api/Services/authentication";

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    oldPassword: yup
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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const onSubmit = (data) => {
    console.log(data);
    const passwordData = {
      new_password: data.password,
      old_password: data.oldPassword,
    };
    changePassword(passwordData).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      <div style={{ width: "400px", padding: "20px" }}>
        <h1>Change Password</h1>
        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2" style={{ position: "relative" }}>
            <label htmlFor="oldPassword" className="login-form-label">
              Old Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              placeholder="Enter old password"
              className="form-control"
              style={{ border: "1px solid #475467", borderRadius: "12px" }}
              {...register("oldPassword")}
            />
            {showOldPassword ? (
              <VisibilityIcon
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "30px",
                  color: "#7E7585",
                }}
                onClick={toggleOldPasswordVisibility}
              />
            ) : (
              <VisibilityOffIcon
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "30px",
                  color: "#7E7585",
                }}
                onClick={toggleOldPasswordVisibility}
              />
            )}
            {errors.oldPassword && (
              <p className="text-danger" style={{ maxWidth: "350px" }}>
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div className="mt-2" style={{ position: "relative" }}>
            <label htmlFor="password" className="login-form-label">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter new password"
              className="form-control"
              style={{ border: "1px solid #475467", borderRadius: "12px" }}
              {...register("password")}
            />
            {showPassword ? (
              <VisibilityIcon
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "30px",
                  color: "#7E7585",
                }}
                onClick={togglePasswordVisibility}
              />
            ) : (
              <VisibilityOffIcon
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "30px",
                  color: "#7E7585",
                }}
                onClick={togglePasswordVisibility}
              />
            )}
            {errors.password && (
              <p className="text-danger" style={{ maxWidth: "350px" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mt-2" style={{ position: "relative" }}>
            <label htmlFor="confirmPassword" className="login-form-label">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="confirm password"
              className="form-control"
              style={{ border: "1px solid #475467", borderRadius: "12px" }}
              {...register("confirmPassword")}
            />
            {showConfirmPassword ? (
              <VisibilityIcon
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "30px",
                  color: "#7E7585",
                }}
                onClick={toggleConfirmPasswordVisibility}
              />
            ) : (
              <VisibilityOffIcon
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "30px",
                  color: "#7E7585",
                }}
                onClick={toggleConfirmPasswordVisibility}
              />
            )}
            {errors.confirmPassword && (
              <p className="text-danger" style={{ maxWidth: "350px" }}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="mt-3 d-flex justify-content-center">
            <Button
              variant="outlined"
              sx={{ borderRadius: "40px", padding: "10px 40px" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: "40px",
                padding: "10px 40px",
                marginLeft: "10px",
              }}
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
