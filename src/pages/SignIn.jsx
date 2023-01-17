import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/login/Login";

const SignIn = ({ loggedIn, setLoggedIn, setErrorMsg }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) navigate("/");
  });

  return (
    <>
      <LoginComponent setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg} />
    </>
  );
};

export default Login;
