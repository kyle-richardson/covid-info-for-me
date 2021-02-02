import React, {useEffect, useState} from "react";
import axios from "axios"
import moment from "moment"

const CountyInfo = ({ myCountyObject, state }) => {
  const [historicalData, setHistData] = useState()
  useEffect(()=> {
    if (myCountyObject){
      axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/nyt/counties/${myCountyObject.county.toLowerCase()}?lastdays=1`)
      .then((res) => {
        setHistData(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [myCountyObject, state])
  return (
    <div className="county-info-container">
      {myCountyObject && historicalData &&  (
        <div className="title">
          <h3>{`County: ${
            myCountyObject.county.charAt(0).toUpperCase() +
            myCountyObject.county.slice(1)
          }`}</h3>
        </div>
      )}
      {myCountyObject && historicalData && (
        <div className="info-box">
          <p>Confirmed(total): {myCountyObject.stats.confirmed}</p>
          <p>
            New cases(24 hrs):{" "}
            {myCountyObject.stats.confirmed - historicalData[0].cases}
          </p>
          <p>Deaths(total): {myCountyObject.stats.deaths}</p>
          <p>
            New deaths(24 hrs):{" "}
            {myCountyObject.stats.deaths - historicalData[0].deaths}
          </p> 
          <p>Fatality rate: {Math.round((Number(myCountyObject.stats.deaths) / Number(myCountyObject.stats.confirmed)) * 1000) / 1000 }</p>
          <p>Last Updated: {moment(myCountyObject.updatedAt).format("MMM DD, YYYY HH:mm")}</p>
        </div>
      )}
    </div>
  );
};

export default CountyInfo;
