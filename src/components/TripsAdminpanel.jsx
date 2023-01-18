import React from "react";
import TripTRAdmin from "./TripTRAdmin";

const TripsAdminpanel = ({ tripData, setTripData }) => {
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
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {tripData.map((trip) => (
            <TripTRAdmin trip={trip} setTripData={setTripData}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripsAdminpanel;
