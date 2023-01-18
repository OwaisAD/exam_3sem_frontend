import React, { useState } from "react";
import { Button } from "react-bootstrap";
import facade from "../facades/apiFacade";

const CreateTrip = ({ harbourData }) => {
  const initialState = {
    brand: "",
    make: "",
    name: "",
    image: "",
    harbour: {
      id: 0,
    },
  };

  const [tripToBeCreated, setTripToBeCreated] = useState(initialState);

  const handleCreateTrip = (e) => {
    e.preventDefault();
    const create = confirm("Are you sure you want to create trip");
    if (!create) return;

    facade.createBoat(tripToBeCreated);
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
        <h4 className="text-white">Boat brand</h4>
        <input
          type="text"
          placeholder="Boat brand"
          onChange={onChange}
          id="brand"
          value={tripToBeCreated.brand}
        />

        <h4 className="text-white">Boat make</h4>
        <input
          type="text"
          placeholder="Boat make"
          onChange={onChange}
          id="make"
          value={tripToBeCreated.make}
        />

        <h4 className="text-white">Boat name</h4>
        <input
          type="text"
          placeholder="Boat name"
          onChange={onChange}
          id="name"
          value={tripToBeCreated.name}
        />

        <h4 className="text-white">Boat image</h4>
        <input
          type="text"
          placeholder="Boat image"
          onChange={onChange}
          id="image"
          value={tripToBeCreated.image}
        />

        <h4 className="text-white">Select a harbour</h4>
        <select id="harbours" name="harbourlist" onChange={onChange}>
          <option value="" disabled selected>
            Select a Harbour
          </option>
          {harbourData.map((harbour) => (
            <option value={harbour.id}>{harbour.name}</option>
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
