import React from "react";

const AdminPanel = ({ loggedIn }) => {
  return (
    <>
      {!loggedIn ? (
        <Unauthorized />
      ) : (
        <>
          <div className="profile-page">
            <div className="nine">
              <h1>
                Admin panel <span style={{ color: "white" }}>Here you can change information</span>
              </h1>
            </div>
          </div>
          <div className="overlay-about"></div>
        </>
      )}
    </>
  );
};

export default AdminPanel;
