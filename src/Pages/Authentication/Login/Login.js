import React from "react";
import { LoginForm } from "./LoginForm";
import { Link } from "react-router-dom";
import bgImage from "../../../Assets/Images/Bg.png";

export const Login = () => {
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
            <h1 className="form-title">Log In </h1>
            <div className="form-description">Welcome to CareDac </div>
          </div>
          <div className="mt-3">
            <LoginForm />
          </div>
          <div className="d-flex align-items-center justify-content-center mt-4">
            <p className="login-form-text ">
              Don’t have an account?
              <Link
                to="/registration"
                className="text-primary ms-1 text-decoration-none"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
