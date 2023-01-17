import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import facade from "./facades/apiFacade";

const useAuth = () => {
  const isLoggedIn = facade.loggedIn();
  return isLoggedIn;
};

const ProtectedRoutesAdmin = () => {
  const [role, setRole] = useState(facade.getRole());
  const isAuth = useAuth();

  console.log(isAuth, role);

  return isAuth && role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutesAdmin;
