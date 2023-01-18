import React, { useState } from "react";
import facade from "../facades/apiFacade";

const Trip = ({ currentBoatData, harbour }) => {
  const [boatOwners, setBoatOwners] = useState([]);
  const [boatClicked, setBoatClicked] = useState("");

  const handleCheckOwners = async (evt, boatId) => {
    evt.preventDefault();
    const response = await facade.getOwnersByBoatId(boatId);
    setBoatOwners(response);
    setBoatClicked(boatId);
  };

  return currentBoatData?.map((boat) => {
    return (
      <>
        <div key={boat.id} className="boat">
          <p>Brand: {boat.brand}</p>
          <p>Make: {boat.make}</p>
          <p>Name: {boat.name}</p>
          <img src={boat.image} alt="" />
          {harbour && (
            <p>
              <a href="" onClick={(e) => handleCheckOwners(e, boat.id)}>
                Check Owners
              </a>
            </p>
          )}

          {boatOwners && boat.id === boatClicked && (
            <p>
              {boatOwners.map((owner) => (
                <>{owner.name}</>
              ))}
            </p>
          )}
        </div>
      </>
    );
  });
};

export default Trip;