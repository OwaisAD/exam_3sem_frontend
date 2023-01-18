import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import TripsUserpanel from "../components/TripsUserpanel";
import facade from "../facades/apiFacade";

const UserPanel = ({ loggedIn }) => {
  const [tripData, setTripData] = useState([]);
  const [seeAllTrips, setSeeAllTrips] = useState(false);

  useEffect(() => {
    // fetch trips data
    async function fetchData() {
      const response = await facade.getAllTrips();
      setTripData(response);
    }
    fetchData();
  }, []);

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

            <div
              style={{
                zIndex: "1000",
                margin: "0 auto",
                border: "0.5px solid red",
                borderRadius: "10px",
                width: "400px",
                padding: "5px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {/* SEE ALL TRIPS */}
              <Button
                onClick={() => {
                  setSeeAllTrips(!seeAllTrips);
                }}
              >
                See all trips
              </Button>
            </div>

            {seeAllTrips && (
              <div
                style={{
                  width: "500px",
                  margin: "0 auto",
                  paddingTop: "15px",
                  zIndex: "1000",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input type="text" placeholder="Search trip" />
                <div>
                  <select>
                    <option disabled select>
                      Filter
                    </option>
                    <option value="date">By year asc</option>
                    <option value="year">By year desc</option>
                  </select>
                </div>
              </div>
            )}

            {tripData && seeAllTrips && (
              <>
                <h3 className="text-white mx-auto" style={{ zIndex: "1000" }}>
                  Currently viewing trips :
                </h3>
                <div style={{ zIndex: "1000" }}>
                  <TripsUserpanel tripData={tripData} />
                </div>
              </>
            )}

            {!seeAllTrips && (
              <>
                <h2 className="mx-auto text-white" style={{ zIndex: "1000" }}>
                  Click on a button
                </h2>
              </>
            )}
          </div>
          <div className="overlay-about"></div>
        </>
      )}
    </>
  );
};

export default UserPanel;
