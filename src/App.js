import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import CountyInfo from "./components/CountyInfo";
import LocationForm from "./components/LocationForm";
import StateInfo from "./components/StateInfo";

function App() {
  const [currentState, setCurrentState] = useState("");
  const [fullCountyList, setFullCountyList] = useState([]);
  const [stateCountyList, setStateCountyList] = useState([]);
  const [currentCounty, setCurrentCounty] = useState("");
  const [countyErrors, setCountyErrors] = useState();
  const [stateErrors, setStateErrors] = useState();
  const [myCountyObject, setMyCountyObject] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/county`)
      .then((res) => {
        const list = res.data.message;
        setFullCountyList(list);
      })
      .catch((err) => {
        setCountyErrors("Could not fetch county data. Try again later.");
      });
  }, []);

  useEffect(() => {
    if (currentState) {
      const stateName = currentState.split(" (")[0];
      const getCounties = fullCountyList.filter(
        (ele) => ele.state_name.toLowerCase() === stateName.toLowerCase()
      );
      if (getCounties.length > 0) {
        setStateCountyList(getCounties);
      }
    }
  }, [currentState]);

  useEffect(() => {
    if (currentState && currentCounty) {
      const stateName = currentState.split(" (")[0];
      const filtered = fullCountyList.filter(
        (ele) =>
          ele.county_name.toLowerCase() === currentCounty.toLowerCase() &&
          ele.state_name.toLowerCase() === stateName.toLowerCase()
      )[0];
      setMyCountyObject(filtered);
    }
  }, [currentState, currentCounty]);

  return (
    <div className="App">
      <h1>COVID info for me</h1>
      {stateErrors && <p style={{ color: "red" }}>{stateErrors}</p>}
      {countyErrors && <p style={{ color: "red" }}>{countyErrors}</p>}
      <LocationForm
        currentState={currentState}
        setState={setCurrentState}
        countyList={stateCountyList}
        setCounty={setCurrentCounty}
      />
      <StateInfo currentState={currentState} />
      <CountyInfo myCountyObject={myCountyObject} />
    </div>
  );
}

export default App;
