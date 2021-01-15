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
      .get(`${process.env.REACT_APP_API_BASE_URL}/states/:${stateName}?yesterday=true`)
      .then((res) => {
        setStateList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentState, stateName]);

  useEffect(() => {
    if (searchDate && stateList.length > 0) {
      const filterForDate = stateList.filter((ele) => ele.Date === searchDate);
      const backOneDay = stateList.filter(
        (ele) =>
          ele.Date ===
          moment(searchDate).subtract(1, "days").format("YYYY-MM-DD")
      );
      setSearchObject({
        ...filterForDate[0],
        new_confirmed:
          Number(filterForDate[0].Confirmed) - Number(backOneDay[0].Confirmed),
        new_deaths:
          Number(filterForDate[0].Deaths) - Number(backOneDay[0].Deaths),
      });
    } else setSearchObject("");
  }, [searchDate, stateList]);

  return (
    <div className="state-info-container">
      {searchObject && (
        <div className="title">
          <h3>{`State: ${
            stateName.charAt(0).toUpperCase() + stateName.slice(1)
          } (${abbrev})`}</h3>
        </div>
      )}
      {searchObject && (
        <div className="info-box" style={{ marginBottom: "20px" }}>
          <p>Confirmed(total): {searchObject.Confirmed}</p>
          <p>New cases(24 hrs): {searchObject.new_confirmed}</p>
          <p>Deaths(total): {searchObject.Deaths}</p>
          <p>New deaths(24 hrs): {searchObject.new_deaths}</p>
          <p>As of: {searchObject.Date}</p>
        </div>
      )}
    </div>
  );
};

export default StateInfo;
