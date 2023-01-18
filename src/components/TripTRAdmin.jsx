import React, { useState } from "react";
import { Button } from "react-bootstrap";
import facade from "../facades/apiFacade";

const TripTRAdmin = ({ trip, setTripData, guidesData }) => {
  const [seeGuide, setSeeGuide] = useState(false);
  const [clickedAssigned, setClickedAssigned] = useState(false);
  const [seeTripPeople, setSeeTripPeople] = useState(false);
  const [editingGuide, setEditingGuide] = useState(false);

  const initialGuide = { id: 0 };
  const [newGuide, setNewGuide] = useState(initialGuide);

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
    console.log(freshTrip);
  };

  const handleRemoveTrip = async (tripId) => {
    const confirmation = confirm("Are you sure you want to delete trip with id: " + tripId);
    if (!confirmation) return;

    const response = await facade.removeTripByTripId(tripId);
    setTripData(response);
  };

  const handleRemovePersonFromTrip = async (personId, tripId) => {
    const confirmation = confirm(
      "Are you sure you want to delete person with id: " +
        personId +
        " from trip with id: " +
        tripId
    );
    if (!confirmation) return;

    await facade.removePersonFromTrip(tripId, personId);
    const updatedTrips = await facade.getAllTrips();
    setTripData(updatedTrips);
  };

  const onChangeGuide = (evt) => {
    setNewGuide({ ...newGuide, ["id"]: evt.target.value });
    console.log(newGuide);
  };

  const handleChangeGuide = async (tripId) => {
    if (newGuide.id === 0) {
      alert("Guide was NOT updated");
      setEditingGuide(!editingGuide);
      return;
    }

    const confirmation = confirm(
      "Are you sure you want to update the guide on trip with id " + tripId + "?"
    );
    if (!confirmation) {
      setNewGuide({ ...newGuide, ["id"]: 0 });
      setEditingGuide(!editingGuide);
      return;
    }
    // update guide
    const response = await facade.updateGuideOnTrip(newGuide.id, tripId);
    console.log("updated", response);
    // fetch trips and refresh table
    const refreshTable = await facade.getAllTrips();
    setTripData(refreshTable);

    setNewGuide({ ...newGuide, ["id"]: 0 });
    setEditingGuide(!editingGuide);
  };

  return (
    <>
      {/* DISPLAYING TRIP INFORMATION ON ROW */}
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
          <i
            className="fas fa-remove"
            style={{ cursor: "pointer" }}
            onClick={() => handleRemoveTrip(trip.id)}
          ></i>
        </td>
      </tr>

      {/* DISPLAYING A LIST OF PEOPLE */}

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
              <td>
                <i
                  className="fas fa-remove"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleRemovePersonFromTrip(person.id, trip.id);
                  }}
                ></i>
              </td>
            </tr>
          ))}
          <br />
        </>
      )}

      {/* DISPLAYING GUIDE */}
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
            {!editingGuide && (
              <td
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setEditingGuide(!editingGuide)}
              >
                Edit guide
              </td>
            )}
          </tr>

          {editingGuide && (
            <>
              <p>Select new Guide</p>
              <td>
                <div style={{ width: "150px" }}>
                  <select name="" id="" onChange={onChangeGuide}>
                    <option disabled selected>
                      Select a new guide
                    </option>
                    {guidesData
                      .filter((guide) => guide.id != trip.guide.id)
                      .map((guide) => (
                        <option value={guide.id}>{guide.profile}</option>
                      ))}
                  </select>
                  <Button onClick={() => handleChangeGuide(trip.id)}>Save</Button>
                </div>
              </td>
            </>
          )}
          <br />
        </>
      )}

      {/* ASSIGNING PERSON TO TRIP */}
      {clickedAssigned && (
        <>
          <p>Please fill out the fields below to join the above trip</p>
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

export default TripTRAdmin;
