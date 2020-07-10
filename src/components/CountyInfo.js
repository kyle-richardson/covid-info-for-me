import React from "react";

const CountyInfo = ({ myCountyObject }) => {
  return (
    <div className="county-info-container">
      {myCountyObject && (
        <div className="title">
          <h3>{`County: ${
            myCountyObject.county_name.charAt(0).toUpperCase() +
            myCountyObject.county_name.slice(1)
          }`}</h3>
        </div>
      )}
      {myCountyObject && (
        <div className="info-box">
          <p>Confirmed(total): {myCountyObject.confirmed}</p>
          <p>
            New cases(24 hrs):{" "}
            {myCountyObject.new === 0
              ? "0 (or not recorded)"
              : myCountyObject.new}
          </p>
          <p>Deaths(total): {myCountyObject.death}</p>
          <p>
            New deaths(24 hrs):{" "}
            {myCountyObject.new_death === 0
              ? "0 (or not recorded)"
              : myCountyObject.new_death}
          </p>
          <p>Fatality rate: {myCountyObject.fatality_rate}</p>
          <p>Last Updated: {myCountyObject.last_update}</p>
        </div>
      )}
    </div>
  );
};

export default CountyInfo;
