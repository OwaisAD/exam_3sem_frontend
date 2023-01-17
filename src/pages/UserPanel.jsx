import React from "react";

const UserPanel = ({ loggedIn }) => {
  return (
    <>
      {!loggedIn ? (
        <Unauthorized />
      ) : (
        <>
          <div className="profile-page">
            <div className="nine">
              <h1>
                Searcher <span style={{ color: "white" }}>Here you can explore some data</span>
              </h1>
            </div>
          </div>
          <div className="overlay-about"></div>
        </>
      )}
    </>
  );
};

export default UserPanel;
