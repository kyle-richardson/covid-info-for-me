import React, { useEffect, useState } from "react";
import axios from "axios";
// import TextField from "@material-ui/core/TextField";
import moment from "moment";
import { stateAbbrev } from "../data/stateAbbrev";

const StateInfo = ({ stateName, setErrors, errors }) => {
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
      .post(`${process.env.REACT_APP_API_BASE_URL}/state`, {
        stateAbbr: abbrev,
      })
      .then((res) => {
        console.log(res.data.message);
        setStateList(res.data.message);
        setErrors({ ...errors, state: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, state: "State name not found." });
      });
  }, [stateName, abbrev]);

  useEffect(() => {
    if (searchDate && stateList.length > 0) {
      setSearchObject(stateList.filter((ele) => ele.Date === searchDate));
    }
  }, [searchDate, stateList]);

  return (
    <div className="county-info-container">
      {searchObject && <h3>{`State: ${stateName} (${abbrev})`}</h3>}
      {searchObject && (
        <div>
          <p>Confirmed(total): {searchObject[0].Confirmed}</p>
          <p>Deaths(total): {searchObject[0].Deaths}</p>
          <p>As of: {searchObject[0].Date}</p>
        </div>
      )}
    </div>
  );
};

export default StateInfo;
