import React, {useEffect, useState} from "react";
import axios from "axios"
import { stateAbbrev } from "../data/stateAbbrev";

const CountyInfo = ({ myCountyObject, state }) => {
  const [historicalData, setHistData] = useState()
  useEffect(()=> {
    if (myCountyObject){
      axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/nyt/counties?county=${myCountyObject.county.toLowerCase()}`)
      .then((res) => {
        setHistData(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [myCountyObject, state])
  return (
    <div className="county-info-container">
      {myCountyObject && (
        <div className="title">
          <h3>{`County: ${
            myCountyObject.county.charAt(0).toUpperCase() +
            myCountyObject.county.slice(1)
          }`}</h3>
        </div>
      )}
      {myCountyObject && (
        <div className="info-box">
          <p>Confirmed(total): {myCountyObject.stats.confirmed}</p>
          {/* <p>
            New cases(24 hrs):{" "}
            {myCountyObject.new === 0
              ? "0 (or not recorded)"
              : myCountyObject.new}
          </p> */}
          <p>Deaths(total): {myCountyObject.stats.deaths}</p>
          {/* <p>
            New deaths(24 hrs):{" "}
            {myCountyObject.new_death === 0
              ? "0 (or not recorded)"
              : myCountyObject.new_death}
          </p> */}
          {/* <p>Fatality rate: {myCountyObject.fatality_rate}</p> */}
          <p>Last Updated: {myCountyObject.updatedAt}</p>
        </div>
      )}
    </div>
  );
};

export default CountyInfo;
