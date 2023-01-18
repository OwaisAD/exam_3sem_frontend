import React, { useState } from "react";
import { Button } from "react-bootstrap";
import facade from "../facades/apiFacade";

const CreateTrip = ({
  guidesData,
  seeCreateTrip,
  setSeeCreateTrip,
  seeAllTrips,
  setSeeAllTrips,
  setTripData,
}) => {
  const initialState = {
    date: {
      year: "",
      month: 2,
      day: 20,
    },
    time: {
      hour: "",
      minute: 0,
      second: 0,
      nano: 0,
    },
    location: "",
    duration: "",
    packingList: "",
    guide: {
      id: 0,
    },
  };

  const [tripToBeCreated, setTripToBeCreated] = useState(initialState);

  const handleCreateTrip = async (e) => {
    e.preventDefault();

    if (
      tripToBeCreated.date.year == "" ||
      tripToBeCreated.time.hour == "" ||
      tripToBeCreated.location == "" ||
      tripToBeCreated.duration == "" ||
      tripToBeCreated.packingList == "" ||
      tripToBeCreated.guide.id == 0
    ) {
      alert("Please fill out the fields");
      return;
    }

    const confirmation = confirm("Are you sure you want to create trip?");
    if (!confirmation) return;

    const response = await facade.createTrip(tripToBeCreated);
    console.log("created trip: " + response);
    // setTripToBeCreated(initialState);
    // refresh and open all trips
    const updatedData = await facade.getAllTrips();
    setTripData(updatedData);
    setSeeCreateTrip(!seeCreateTrip);
    setSeeAllTrips(!seeAllTrips);
  };

  const onChange = (evt) => {
    if (evt.target.id === "date") {
      setTripToBeCreated({ ...tripToBeCreated, ["date"]: { year: evt.target.value } });
      return;
    }

    if (evt.target.id === "time") {
      setTripToBeCreated({ ...tripToBeCreated, ["time"]: { hour: evt.target.value } });
      return;
    }

    if (evt.target.id === "guides") {
      setTripToBeCreated({ ...tripToBeCreated, ["guide"]: { id: evt.target.value } });
      return;
    }
    setTripToBeCreated({ ...tripToBeCreated, [evt.target.id]: evt.target.value });
  };

  return (
    <form>
      <div className="create-boat-component">
        <h2 className="text-center">Create trip</h2>

        {/* Could upgrade it with: https://codepen.io/abdulmlik/pen/dJOJov */}
        <h4 className="text-white">Enter date</h4>
        <input type="text" placeholder="yyyy-mm-dd" onChange={onChange} id="date" />

        <h4 className="text-white">Enter time</h4>
        <select name="" id="time" onChange={onChange}>
          <option disabled selected>
            Select a time
          </option>
          <option value="8">8:00</option>
          <option value="9">9:00</option>
          <option value="10">10:00</option>
          <option value="11">11:00</option>
          <option value="12">12:00</option>
          <option value="13">13:00</option>
          <option value="14">14:00</option>
        </select>

        <h4 className="text-white">Location</h4>
        <input type="text" placeholder="Enter location" onChange={onChange} id="location" />

        <h4 className="text-white">Duration</h4>
        <input
          type="text"
          placeholder="Enter duration"
          onChange={onChange}
          id="duration"
          value={tripToBeCreated.duration}
        />

        <h4 className="text-white">Packing list</h4>
        <input type="text" placeholder="Enter packing list" onChange={onChange} id="packingList" />

        <h4 className="text-white">Select a Guide</h4>
        <select id="guides" name="harbourlist" onChange={onChange}>
          <option value="" disabled selected>
            Select a Guide
          </option>
          {guidesData.map((guide) => (
            <option value={guide.id}>
              {guide.profile}, {guide.gender}, {guide.birthYear}
            </option>
          ))}
        </select>
        <Button style={{ marginTop: "5px" }} onClick={(e) => handleCreateTrip(e)}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateTrip;
