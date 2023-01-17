import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import facade from "./facades/apiFacade";

const useAuth = () => {
  const isLoggedIn = facade.loggedIn();
  return isLoggedIn;
};

const ProtectedRoutesAdmin = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutesAdmin;
