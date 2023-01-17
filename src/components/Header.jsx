import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";
import NavButton from "../components/navbar/NavButton";
import facade from "../facades/apiFacade";
import { MdDirectionsBoatFilled } from "react-icons/md";

function Header({ loggedIn, setLoggedIn, setCreateAccountClicked }) {
  const navigate = useNavigate();
  const location = useLocation();
  const role = facade.getRole() ? facade.getRole() : "";

  const navbarItemManager = (pathname) => {
    if (pathname === "/") {
      return (
        <nav className="topnav">
          <div className="left-side-navbar">
            <NavButton isLogo />

            {loggedIn && role === "user" && (
              <>
                <NavButton text="Boats" iconClass="fas fa-ship" to="userpanel" />
              </>
            )}
            {loggedIn && role === "admin" && (
              <>
                <NavButton text="Panel" iconClass="fas fa-pencil-square-o" to="adminpanel" />
              </>
            )}
          </div>

          <div className="right-side-navbar">
            <NavButton text="About" iconClass="fas fa-seedling" to="/about" />
            {!loggedIn ? (
              <NavButton
                text="Sign In"
                onClick={() => {
                  setCreateAccountClicked(false);
                }}
                to="/signin"
              />
            ) : (
              <>
                <div className="btn-login">
                  <NavLink style={{ paddingRight: "10px", cursor: "pointer" }} to="/profile">
                    Hello,{" "}
                    {loggedIn &&
                      facade.getUsername().charAt(0).toUpperCase() +
                        facade.getUsername().slice(1)}{" "}
                    <i className="fas fa-user-circle"></i>
                  </NavLink>

                  <NavButton
                    text="Sign Out"
                    onClick={() => {
                      facade.logout();
                      setLoggedIn(false);
                      navigate("/");
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </nav>
      );
    } else if (pathname === "/signin" || pathname === "/register") {
      return (
        <nav className="topnav">
          <div className="left-side-navbar">
            <NavButton isLogo />
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="topnav">
          <div className="left-side-navbar">
            <NavButton isLogo />

            {loggedIn && role === "user" && (
              <>
                <NavButton text="Boats" iconClass="fas fa-ship" to="userpanel" />
              </>
            )}
            {loggedIn && role === "admin" && (
              <>
                <NavButton text="Panel" iconClass="fas fa-pencil-square-o" to="adminpanel" />
              </>
            )}
          </div>

          <div className="right-side-navbar">
            <NavButton text="About" iconClass="fas fa-seedling" to="/about" />
            {!loggedIn ? (
              <NavButton
                text="Sign In"
                onClick={() => {
                  setCreateAccountClicked(false);
                }}
                to="/signin"
              />
            ) : (
              <>
                <div className="btn-login">
                  <NavLink style={{ paddingRight: "10px", cursor: "pointer" }} to="/profile">
                    Hello,{" "}
                    {loggedIn &&
                      facade.getUsername().charAt(0).toUpperCase() +
                        facade.getUsername().slice(1)}{" "}
                    <i className="fas fa-user-circle"></i>
                  </NavLink>
                  <NavButton
                    text="Sign Out"
                    onClick={() => {
                      navigate("/");
                      setLoggedIn(false);
                      facade.logout();
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </nav>
      );
    }
  };

  return navbarItemManager(location.pathname);
}

export default Header;
