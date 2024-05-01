import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Box, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../../api/Services/authentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const LoginForm = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const onSubmit = (data) => {
    userLogin(data).then((res) => {
      if (res.status === "success") {
        toast.success(res.message);
        navigate("/home");
      } else {
        toast.error(res.message, {
          // position: toast.POSITION?.TOP_RIGHT,
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "450px" }}>
        <div>
          <label htmlFor="email" className="login-form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            className="form-control"
            style={{ border: "1px solid #475467", borderRadius: "12px" }}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mt-2" style={{ position: "relative" }}>
          <label htmlFor="password" className="login-form-label">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter password"
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
            <p className="text-danger" style={{ maxWidth: "450px" }}>
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="d-flex align-items-center justify-content-center mt-2 mb-3">
          <Link
            to="forgot-password"
            className="login-forgot-password text-primary text-decoration-none"
          >
            Forgot Password?
          </Link>
        </div>
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
          Log In
        </Button>
      </form>
      <ToastContainer />
    </>
  );
};
