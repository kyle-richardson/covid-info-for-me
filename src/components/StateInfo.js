import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import { countryAbbrev } from "../data/countryAbbrev";

const StateInfo = ({ stateName }) => {
  const [stateList, setStateList] = useState([]);
  const [searchDate, setSearchDate] = useState(
    moment().subtract(1, "days").format("YYYY-MM-DD")
  );
  const [searchObject, setSearchObject] = useState("");
  const abbrev = stateName
    ? countryAbbrev.filter(
        (state) => state.name.toLowerCase() === stateName.toLowerCase()
      )[0].abbreviation
    : "TX";

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/state`, {
        stateAbbr: abbrev,
      })
      .then((res) => {
        setStateList(res.data.message);
      })
      .catch((err) => console.log(err));
  }, [stateName]);

  useEffect(() => {
    if (searchDate && stateList.length > 0) {
      setSearchObject(stateList.filter((ele) => ele.Date === searchDate));
    }
  }, [searchDate, stateList]);

  return (
    <div className="county-info-container">
      {searchObject && <pre>{JSON.stringify(searchObject, null, 2)}</pre>}
    </div>
  );
};

export default StateInfo;
