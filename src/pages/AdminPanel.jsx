import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import CreateGuide from "../components/CreateGuide";
import CreateTrip from "../components/CreateTrip";
import TripsAdminpanel from "../components/TripsAdminpanel";
import facade from "../facades/apiFacade";

const AdminPanel = ({ loggedIn }) => {
  const [tripData, setTripData] = useState([]);
  const [guidesData, setGuidesData] = useState([]);

  const [seeAllTrips, setSeeAllTrips] = useState(false);
  const [seeCreateTrip, setSeeCreateTrip] = useState(false);
  const [seeCreateGuide, setSeeCreateGuide] = useState(false);

  useEffect(() => {
    // fetch trips data
    async function fetchData() {
      const response = await facade.getAllTrips();
      setTripData(response);
    }
    fetchData();

    // fetch all guides
    async function fetchGuides() {
      const response = await facade.getAllGuides();
      setGuidesData(response);
    }
    fetchGuides();
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
                Admin panel <span style={{ color: "white" }}>Here you can change information</span>
              </h1>
            </div>

            <div
              style={{
                zIndex: "1000",
                margin: "0 auto",
                border: "1px solid red",
                width: "700px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {/* SEE ALL TRIPS */}
              <Button
                onClick={() => {
                  if (seeCreateTrip || seeCreateGuide) {
                    setSeeCreateTrip(false);
                    setSeeCreateGuide(false);
                  }
                  setSeeAllTrips(!seeAllTrips);
                }}
              >
                All trips
              </Button>

              {/* CREATE A TRIP */}
              <Button
                onClick={() => {
                  if (seeAllTrips || seeCreateGuide) {
                    setSeeAllTrips(false);
                    setSeeCreateGuide(false);
                  }
                  setSeeCreateTrip(!seeCreateTrip);
                }}
              >
                Create trip
              </Button>

              {/* CREATE A GUIDE */}
              <Button
                onClick={() => {
                  if (seeAllTrips || seeCreateTrip) {
                    setSeeAllTrips(false);
                    setSeeCreateTrip(false);
                  }
                  setSeeCreateGuide(!seeCreateGuide);
                }}
              >
                Create guide
              </Button>
            </div>

            {seeAllTrips && (
              <>
                <div className="boats-container">
                  <h2>All trips</h2>
                  <input type="text" placeholder="Search for a trip" />
                  <TripsAdminpanel tripData={tripData} setTripData={setTripData} />
                </div>
              </>
            )}

            {seeCreateTrip && (
              <>
                <div className="boats-container">
                  <CreateTrip guidesData={guidesData} seeCreateTrip={seeCreateTrip} setSeeCreateTrip={setSeeCreateTrip} seeAllTrips={seeAllTrips} setSeeAllTrips={setSeeAllTrips} setTripData={setTripData}/>
                </div>
              </>
            )}
            {!seeAllTrips && !seeCreateTrip && !seeCreateGuide && (
              <>
                <h2 className="mx-auto text-white" style={{ zIndex: "1000" }}>
                  Click on a button
                </h2>
              </>
            )}

            {seeCreateGuide && <>
              <div className="boats-container">
                <CreateGuide />                
              </div>
            </>}
          </div>

          <div className="overlay-about"></div>
        </>
      )}
    </>
  );
};

export default AdminPanel;
