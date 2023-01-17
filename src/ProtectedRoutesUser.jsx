import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import facade from "./facades/apiFacade";

const useAuth = () => {
  const isLoggedIn = facade.loggedIn();
  return isLoggedIn;
};

const ProtectedRoutesUser = () => {
  const [role, setRole] = useState(facade.getRole());
  const isAuth = useAuth();

  return isAuth && role === "user" ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutesUser;
