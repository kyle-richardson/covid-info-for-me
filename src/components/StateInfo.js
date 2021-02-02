import React, { useEffect, useState } from "react";
import axios from "axios";
// import TextField from "@material-ui/core/TextField";
import moment from "moment";
import { stateAbbrev } from "../data/stateAbbrev";

const StateInfo = ({ currentState }) => {
  const stateName = currentState && currentState.split(" (")[0];
  const [stateList, setStateList] = useState([]);
  const [searchDate, setSearchDate] = useState(
    moment().subtract(1, "days").format("YYYY-MM-DD")
  );
  const [searchObject, setSearchObject] = useState("");
  const abbrev =
    stateName &&
    stateAbbrev.filter(
      (state) => state.name.toLowerCase() === stateName.toLowerCase()
    ).length > 0 &&
    stateAbbrev.filter(
      (state) => state.name.toLowerCase() === stateName.toLowerCase()
    )[0].abbreviation;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/states/${stateName}?yesterday=true`)
      .then((res) => {
        setSearchObject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentState, stateName]);

  return (
    <div className="state-info-container">
      {currentState && (
        <div className="title">
          <h3>{`State: ${
            stateName.charAt(0).toUpperCase() + stateName.slice(1)
          } (${abbrev})`}</h3>
        </div>
      )}
      {currentState && (
        <div className="info-box" style={{ marginBottom: "20px" }}>
          <p>Confirmed(total): {searchObject.cases}</p>
          <p>Active: {searchObject.active}</p>
          <p>New cases(24 hrs): {searchObject.todayCases}</p>
          <p>Deaths(total): {searchObject.deaths}</p>
          <p>New deaths(24 hrs): {searchObject.todayDeaths}</p>
          <p>Last updated: {moment(searchObject.updated).format("MMM DD, YYYY HH:mm")}</p>
        </div>
      )}
    </div>
  );
};

export default StateInfo;
