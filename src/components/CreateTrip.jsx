import React, { useState } from "react";
import { Button } from "react-bootstrap";
import facade from "../facades/apiFacade";

const CreateTrip = ({ guidesData }) => {
  const initialState = {
    date: "",
    year: "",
    location: "",
    duration: "",
    packingList: "",
    harbour: {
      id: 0,
    },
  };

  const [tripToBeCreated, setTripToBeCreated] = useState(initialState);

  const handleCreateTrip = (e) => {
    e.preventDefault();
    const create = confirm("Are you sure you want to create trip");
    if (!create) return;

    facade.createTrip(tripToBeCreated);
    setTripToBeCreated(initialState);
  };

  const onChange = (evt) => {
    if (evt.target.id === "harbours") {
      console.log("ITS a harbour");
      setTripToBeCreated({ ...tripToBeCreated, ["harbour"]: { id: evt.target.value } });
      return;
    }
    setTripToBeCreated({ ...tripToBeCreated, [evt.target.id]: evt.target.value });
  };

  return (
    <form>
      <div className="create-boat-component">
        <h2 className="text-center">Create trip</h2>
        <h4 className="text-white">Enter date</h4>
        <input
          type="text"
          placeholder="yyyy/mm/dd"
          onChange={onChange}
          id="brand"
          value={tripToBeCreated.brand}
        />

        <h4 className="text-white">Enter time</h4>
        <select name="" id="" onChange={onChange}>
          <option disabled selected>
            Select a time
          </option>
          <option value="08:00:00">8:00</option>
          <option value="09:00:00">9:00</option>
          <option value="10:00:00">10:00</option>
          <option value="11:00:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
        </select>

        <h4 className="text-white">Location</h4>
        <input
          type="text"
          placeholder="Enter location"
          onChange={onChange}
          id="name"
          value={tripToBeCreated.name}
        />

        <h4 className="text-white">Duration</h4>
        <input
          type="text"
          placeholder="Enter duration"
          onChange={onChange}
          id="image"
          value={tripToBeCreated.image}
        />

        <h4 className="text-white">Packing list</h4>
        <input
          type="text"
          placeholder="Enter packing list"
          onChange={onChange}
          id="image"
          value={tripToBeCreated.image}
        />

        <h4 className="text-white">Select a Guide</h4>
        <select id="harbours" name="harbourlist" onChange={onChange}>
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
