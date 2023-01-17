import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateAccount from "../components/login/CreateAccount";

const Registration = ({ loggedIn, setLoggedIn, setErrorMsg, errorMsg }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) navigate("/");
  });

  return <CreateAccount setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg} errorMsg={errorMsg} />;
};

export default Registration;
