import React from "react";
import { RegistrationForm } from "./RegistrationForm";
import { Link } from "react-router-dom";
import bgImage from "../../../Assets/Images/Bg.png";

export const Registration = () => {
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
        <div className="registration-wrapper">
          <div>
            <h1 className="form-title">Sign Up</h1>
            <p className="form-description">Welcome to CareDac </p>
          </div>
          <div className="registration-form">
            <RegistrationForm />
          </div>
          <div className="d-flex align-items-center justify-content-center mt-3">
            <p style={{ fontSize: "14px", fontWeight: "400" }}>
              Already have an account?
              <Link to="/" className=" ms-1 text-primary text-decoration-none">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
