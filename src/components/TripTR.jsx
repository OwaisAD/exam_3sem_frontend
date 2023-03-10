import React, { useState } from "react";
import { Button } from "react-bootstrap";
import facade from "../facades/apiFacade";

const TripTR = ({ trip, setTripData }) => {
  const [seeGuide, setSeeGuide] = useState(false);
  const [clickedAssigned, setClickedAssigned] = useState(false);
  const [seeTripPeople, setSeeTripPeople] = useState(false);

  const initialPersonObject = {
    address: "",
    email: "",
    birthYear: "",
    gender: "",
  };

  const [personObject, setPersonObject] = useState(initialPersonObject);

  const onChange = (evt) => {
    setPersonObject({ ...personObject, [evt.target.id]: evt.target.value });
    console.log(personObject);
  };

  const handleAssignToTrip = async (tripId) => {
    if (
      personObject.address == "" ||
      personObject.email == "" ||
      personObject.birthYear == "" ||
      personObject.gender == ""
    ) {
      alert("please fill out all your information");
      return;
    }

    const freshTrip = await facade.addPersonToTrip(tripId, personObject);
    const updatedTable = await facade.getAllTrips();
    setTripData(updatedTable);
  };

  const handleClickedAssigned = (evt) => {
    // if (evt.target.checked) {
    //   const confirmation = confirm("Are you sure you want to leave ths trip?");
    //   if (!confirmation) {
    //     return;
    //   }
    // }
    //mangler lidt logik her!
    setClickedAssigned(!clickedAssigned);
  };

  return (
    <>
      <tr key={trip.id}>
        <td>
          {trip.date.day}/{trip.date.month}/{trip.date.year}
        </td>
        <td>
          Meet @ {trip.time.hour}:{trip.time.minute}
        </td>
        <td>{trip.location}</td>
        <td>{trip.duration}</td>
        <td>{trip.packingList}</td>
        <td>
          <div style={{ color: "blue", cursor: "pointer" }} onClick={() => setSeeGuide(!seeGuide)}>
            check
          </div>
        </td>
        <td>
          {!trip.people.length ? (
            <div>None</div>
          ) : (
            <div
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setSeeTripPeople(!seeTripPeople)}
            >
              {trip.people.length}
            </div>
          )}
        </td>
        <td>
          <input
            type="checkbox"
            onClick={() => handleClickedAssigned()}
            defaultChecked={
              trip.people.map((person) => person.userId === facade.getUserId()).length > 0
            }
          />
        </td>
      </tr>

      {seeTripPeople && (
        <>
          <p>Current people</p>
          <tr>
            <td>Address</td>
            <td>Email</td>
            <td>Birthyear</td>
            <td>Gender</td>
          </tr>
          {trip.people.map((person) => (
            <tr>
              <td>{person.address}</td>
              <td>{person.email}</td>
              <td>{person.birthYear}</td>
              <td>{person.gender}</td>
            </tr>
          ))}
          <br />
        </>
      )}

      {seeGuide && (
        <>
          <p>About the guide</p>
          <tr>
            <td>Profile (name)</td>
            <td>Gender</td>
            <td>Birthyear</td>
            <td>Image</td>
          </tr>
          <tr>
            <td>{trip.guide.profile}</td>
            <td>{trip.guide.gender}</td>
            <td>{trip.guide.birthYear}</td>
            <td>
              <img src={trip.guide.image} alt="image of the guide" style={{ height: "150px" }} />
            </td>
          </tr>
          <br />
        </>
      )}

      {clickedAssigned && (
        <>
          <p>Please fill out the fields below to add participants</p>
          <tr>
            <td>
              Address: <input type="text" id="address" onChange={onChange} />
            </td>
            <td>
              Email: <input type="text" id="email" onChange={onChange} />
            </td>
            <td>
              Birthyear: <input type="text" id="birthYear" onChange={onChange} />
            </td>
            <td>
              Gender:{" "}
              <select name="" id="gender" onChange={onChange}>
                <option disabled selected>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </td>
            <td>
              <Button onClick={() => handleAssignToTrip(trip.id)}>Join</Button>
            </td>
          </tr>
          <br />
        </>
      )}
    </>
  );
};

export default TripTR;
