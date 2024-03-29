import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import CountyInfo from "./components/CountyInfo";
import LocationForm from "./components/LocationForm";
import StateInfo from "./components/StateInfo";
import { Spinner } from "evergreen-ui";
import Footer from "./components/Footer"

function App() {
  const [currentState, setCurrentState] = useState("");
  const [fullCountyList, setFullCountyList] = useState([]);
  const [stateCountyList, setStateCountyList] = useState([]);
  const [currentCounty, setCurrentCounty] = useState("");
  const [countyErrors, setCountyErrors] = useState();
  const [stateErrors, setStateErrors] = useState();
  const [myCountyObject, setMyCountyObject] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/nyt/counties`)
      .then((res) => {
        const list = res.data;
        setFullCountyList(list);
      })
      .catch((err) => {
        setCountyErrors("Could not fetch county data. Try again later.");
      })
      .finally((res) => {
        setIsFetching(false);
      });
  }, []);

  useEffect(() => {
    if (currentState) {
      const stateName = currentState.split(" (")[0];
      const getCounties = fullCountyList.filter(
        (ele) => ele.state.toLowerCase() === stateName.toLowerCase()
      );
      if (getCounties.length > 0) {
        setStateCountyList(getCounties);
        setCurrentCounty("");
      }
    }
  }, [currentState]);

  useEffect(() => {
    if (currentState && currentCounty) {
      const stateName = currentState.split(" (")[0];
      const filtered = fullCountyList.filter(
        (ele) =>
          ele.county.toLowerCase() === currentCounty.toLowerCase() &&
          ele.state.toLowerCase() === stateName.toLowerCase()
      )[0];
      setMyCountyObject(filtered);
    }
  }, [currentState, currentCounty]);

  return (
    <div className="App">
      {isFetching ? (
        <Spinner marginX="auto" marginY={"20%"} />
      ) : (
        <>
          <h1 style={{marginBottom: "0"}}>COVID-19 info for me</h1>
          <p>Get info for your county</p>
          {stateErrors && <p style={{ color: "red" }}>{stateErrors}</p>}
          {countyErrors && <p style={{ color: "red" }}>{countyErrors}</p>}
          <LocationForm
            currentState={currentState}
            setState={setCurrentState}
            countyList={stateCountyList}
            setCounty={setCurrentCounty}
            currentCounty={currentCounty}
          />
          <div className="info-containers">
            {currentState && <StateInfo currentState={currentState} />}
            {myCountyObject && <CountyInfo myCountyObject={myCountyObject} state={currentState.split(" (")[0].toLowerCase()} />}
          </div>
          <Footer/>
        </>
      )}
    </div>
  );
}

export default App;
