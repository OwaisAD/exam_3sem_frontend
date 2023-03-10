import React, { useState } from "react";
import { Button } from "react-bootstrap";
import facade from "../facades/apiFacade";

const CreateGuide = ({
  seeCreateGuide,
  setSeeCreateGuide,
  seeCreateTrip,
  setSeeCreateTrip,
  setGuidesData,
}) => {
  const initialState = {
    gender: "",
    birthYear: "",
    profile: "",
    image: "",
  };

  const [guideToBeCreated, setGuideToBeCreated] = useState(initialState);

  const handleCreateGuide = async (e) => {
    e.preventDefault();

    if (
      guideToBeCreated.gender == "" ||
      guideToBeCreated.birthYear == "" ||
      guideToBeCreated.profile == "" ||
      guideToBeCreated.image == ""
    ) {
      alert("Please fill out the fields");
      return;
    }

    const confirmation = confirm("Are you sure you want to create guide?");
    if (!confirmation) return;

    const response = await facade.createGuide(guideToBeCreated);
    console.log("created guide: " + response);
    // setGuideToBeCreated(initialState);
    // refresh and open all trips
    const updatedGuideData = await facade.getAllGuides();
    setGuidesData(updatedGuideData);
    setSeeCreateGuide(!seeCreateGuide);
    setSeeCreateTrip(!seeCreateTrip);
  };

  const onChange = (evt) => {
    setGuideToBeCreated({ ...guideToBeCreated, [evt.target.id]: evt.target.value });
  };

  return (
    <form>
      <div className="create-boat-component">
        <h2 className="text-center">Create guide</h2>
        <h4 className="text-white">Select gender</h4>
        <select name="" id="gender" onChange={onChange}>
          <option disabled selected>
            Select gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <h4 className="text-white">Select birthyear</h4>
        <select name="" id="birthYear" onChange={onChange}>
          <option disabled selected>
            Select birthyear
          </option>
          <option value="2010">2010</option>
          <option value="2009">2009</option>
          <option value="2008">2008</option>
          <option value="2007">2007</option>
          <option value="2006">2006</option>
          <option value="2005">2005</option>
          <option value="2004">2004</option>
          <option value="2003">2003</option>
          <option value="2002">2002</option>
          <option value="2001">2001</option>
          <option value="2000">2000</option>
          <option value="1999">1999</option>
          <option value="1998">1998</option>
          <option value="1997">1997</option>
          <option value="1996">1996</option>
          <option value="1995">1995</option>
          <option value="1994">1994</option>
          <option value="1993">1993</option>
          <option value="1992">1992</option>
          <option value="1991">1991</option>
          <option value="1990">1990</option>
          <option value="1989">1989</option>
          <option value="1988">1988</option>
          <option value="1987">1987</option>
          <option value="1986">1986</option>
          <option value="1985">1985</option>
          <option value="1984">1984</option>
          <option value="1983">1983</option>
          <option value="1982">1982</option>
          <option value="1981">1981</option>
          <option value="1980">1980</option>
          <option value="1979">1979</option>
          <option value="1978">1978</option>
          <option value="1977">1977</option>
          <option value="1976">1976</option>
          <option value="1975">1975</option>
          <option value="1974">1974</option>
          <option value="1973">1973</option>
          <option value="1972">1972</option>
          <option value="1971">1971</option>
          <option value="1970">1970</option>
          <option value="1969">1969</option>
          <option value="1968">1968</option>
          <option value="1967">1967</option>
          <option value="1966">1966</option>
          <option value="1965">1965</option>
          <option value="1964">1964</option>
          <option value="1963">1963</option>
          <option value="1962">1962</option>
          <option value="1961">1961</option>
          <option value="1960">1960</option>
          <option value="1959">1959</option>
          <option value="1958">1958</option>
          <option value="1957">1957</option>
          <option value="1956">1956</option>
          <option value="1955">1955</option>
          <option value="1954">1954</option>
          <option value="1953">1953</option>
          <option value="1952">1952</option>
          <option value="1951">1951</option>
          <option value="1950">1950</option>
          <option value="1949">1949</option>
          <option value="1948">1948</option>
          <option value="1947">1947</option>
          <option value="1946">1946</option>
          <option value="1945">1945</option>
          <option value="1944">1944</option>
          <option value="1943">1943</option>
          <option value="1942">1942</option>
          <option value="1941">1941</option>
          <option value="1940">1940</option>
        </select>

        <h4 className="text-white">Enter profile (name..)</h4>
        <input type="text" placeholder="Enter profile" onChange={onChange} id="profile" />

        <h4 className="text-white">Enter image</h4>
        <input type="text" placeholder="Enter image url" onChange={onChange} id="image" />

        <Button style={{ marginTop: "5px" }} onClick={(e) => handleCreateGuide(e)}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateGuide;
