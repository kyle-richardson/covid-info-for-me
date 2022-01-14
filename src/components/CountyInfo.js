import React, {useEffect, useState} from "react";
import axios from "axios"
import moment from "moment"

const CountyInfo = ({ myCountyObject, state }) => {
  const [historicalData, setHistData] = useState()
  useEffect(()=> {
    if (myCountyObject){
      axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/nyt/counties/${myCountyObject.county.toLowerCase()}?lastdays=2`)
      .then((res) => {
        setHistData(res.data.filter( ({state}) => state.toLowerCase() === myCountyObject.province.toLowerCase()))
        console.log('mycountyobj', myCountyObject)
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
          <p>Confirmed (total): <span>{myCountyObject.stats.confirmed}</span></p>
          <p>
            New cases (24 hrs):{" "}
            <span>{historicalData[1].cases - historicalData[0].cases}</span>
          </p>
          <p>Deaths (total): <span>{myCountyObject.stats.deaths}</span></p>
          <p>
            New deaths (24 hrs):{" "}
            <span>{historicalData[1].deaths - historicalData[0].deaths}</span>
          </p> 
          <p>Fatality rate: <span>{Math.round((Number(myCountyObject.stats.deaths) / Number(myCountyObject.stats.confirmed)) * 1000) / 1000 }</span></p>
          <p>Last Updated: <span>{moment(myCountyObject.updatedAt).format("MMM DD, YYYY HH:mm")}</span></p>
        </div>
      )}
    </div>
  );
};

export default CountyInfo;
