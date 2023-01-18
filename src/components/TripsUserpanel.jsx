import React, { useState } from "react";
import facade from "../facades/apiFacade";
import TripTR from "./TripTR";

const TripsUserpanel = ({ tripData, setTripData}) => {
  //   const [boatOwners, setBoatOwners] = useState([]);
  //   const [boatClicked, setBoatClicked] = useState("");

  //   const handleCheckOwners = async (evt, boatId) => {
  //     evt.preventDefault();
  //     const response = await facade.getOwnersByBoatId(boatId);
  //     setBoatOwners(response);
  //     setBoatClicked(boatId);
  //   };

  return (
    <div className="boats-container">
      <table className="boats-table">
        <thead style={{ position: "sticky", top: "0px" }}>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Duration (hrs)</th>
            <th>Packinglist</th>
            <th>Guide</th>
            <th>People</th>
            <th>Join/leave</th>
          </tr>
        </thead>

        <tbody>
          {tripData?.map((trip) => (
            <TripTR trip={trip} setTripData={setTripData}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripsUserpanel;
