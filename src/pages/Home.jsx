import React from "react";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="home-header">
        <div className="content text-center">
          <span className="home-slogan">
            Welcome to
            <br /> guides<span className="inline-home">.org</span>
          </span>
        </div>
        <Outlet />
      </div>
      <div className="overlay"></div>
    </>
  );
}

export default Home;
