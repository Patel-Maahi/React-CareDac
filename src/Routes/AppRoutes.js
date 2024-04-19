import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import CaregiverProfile from "../Pages/CaregiverProfile/CaregiverProfile";
import { Navbar } from "../Components/Navbar/Navbar";
import SelectPatient from "../Pages/SelectPatient/SelectPatient";
import Bookings from "../Pages/Bookings/Bookings";
import PreviousBookingDetails from "../Pages/PreviousBookingDetails/PreviousBookingDetails";
import CurrentBookingDetails from "../Pages/CurrentBookingDetails/CurrentBookingDetails";
import Payments from "../Pages/Payments/Payments";
import Profile from "../Pages/Profile/Profile";
import { Login } from "../Pages/Authentication/Login/Login";
import { Registration } from "../Pages/Authentication/Registration/Registration";
import { ForgotPassword } from "../Pages/Authentication/ForgotPassword/ForgotPassword";
import { ResetPassword } from "../Pages/Authentication/ResetPassword/ResetPassword";
import { OTPverification } from "../Pages/Authentication/OTPverification/OTPverification";
import { RegisterMemberDetails } from "../Pages/Authentication/RegisterMemberDetails/RegisterMemberDetails";
import { RegisterPatient } from "../Pages/Authentication/RegisterPatient/RegisterPatient";
import { RegisterPatientInfo } from "../Pages/Authentication/RegisterPatientInfo/RegisterPatientInfo";
import { SelectLanguage } from "../Pages/Authentication/SelectLanguage/SelectLanguage";
import { RegisterServiceNeeded } from "../Pages/Authentication/RegisterServiceNeeded/RegisterServiceNeeded";
import { RegisterPatientDetails } from "../Pages/Authentication/RegisterPatientDetails/RegisterPatientDetails";
import ProtectedRoute from "./ProtectedRoute";
import EditProfile from "../Pages/Profile/EditProfile";

export const AppRoutes = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div>
        <Routes>
          <Route path="/selectlanguage" element={<SelectLanguage />} />
          <Route exact path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/otp-verification" element={<OTPverification />} />
          <Route path="/register-patient" element={<RegisterPatient />} />
          <Route
            path="/register-patient-info"
            element={<RegisterPatientInfo />}
          />
          <Route
            path="/register-service-needed"
            element={<RegisterServiceNeeded />}
          />
          <Route
            path="/register-member-details"
            element={<RegisterMemberDetails />}
          />
          <Route
            path="/register-patient-details"
            element={<RegisterPatientDetails />}
          />

          <Route path="/home" element={<ProtectedRoute Component={Home} />} />
          <Route
            path="/caregiver-profile/:id"
            element={<ProtectedRoute Component={CaregiverProfile} />}
          />
          {/* <Route path="/select-patient" element={<SelectPatient />} /> */}
          <Route
            path="/bookings"
            element={<ProtectedRoute Component={Bookings} />}
          />
          <Route
            path="/payments"
            element={<ProtectedRoute Component={Payments} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute Component={Profile} />}
          />
          {/* <Route path="/edit-profile" element={<EditProfile />} /> */}
          <Route
            path="/previous-booking-details"
            element={<PreviousBookingDetails />}
          />
          <Route
            path="/current-booking-details"
            element={<CurrentBookingDetails />}
          />
        </Routes>
      </div>
    </>
  );
};
