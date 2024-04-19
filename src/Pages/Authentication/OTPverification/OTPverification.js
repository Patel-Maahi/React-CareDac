import React from "react";
import { Button } from "@mui/material";
import "../OTPverification/OTPverification.css";
import bgImage from "../../../Assets/Images/Bg.png";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
  forgotPassword,
  otpVerification,
} from "../../../api/Services/authentication";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const OTPverification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(otp);
    const otpCode = {
      otp: otp,
    };

    otpVerification(otpCode).then((res) => {
      console.log(res);
      if (res.status === "success") {
        navigate("/register-patient");
      }
    });

    // navigate("/register-patient");
  };
  return (
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
          <h1 className="form-title">OTP Verification </h1>
          <div className="form-description">
            Enter the OTP sent to your email here{" "}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <div>
              <label className="mb-2">OTP code</label>
            </div>

            {/* <input type="text" className="otp-input text-center" />
            <input type="text" className="otp-input text-center ms-2" />
            <input type="text" className="otp-input text-center ms-2" />
            <input type="text" className="otp-input text-center ms-2" /> */}
            <MuiOtpInput value={otp} onChange={handleChange} />
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
                paddingY: "15px",
              }}
            >
              {/* <Link
                to="/register-patient"
                className="text-decoration-none text-light"
              > */}
              Verify
              {/* </Link> */}
            </Button>
          </div>
          <div className="mt-4 d-flex align-items-center justify-content-center">
            <p>
              Didn't receive OTP?
              <span className="ms-1 text-primary">Resend</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
