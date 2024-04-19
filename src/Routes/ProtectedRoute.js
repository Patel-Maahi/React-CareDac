import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../api/auth";

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoute;
