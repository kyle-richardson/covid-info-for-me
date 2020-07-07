import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import StateInfo from "./StateInfo";

const CountyInfo = () => {
  const [countyList, setCountyList] = useState([]);
  const [myCountyString, setMyCountyString] = useState("Tarrant");
  const [myCountyObject, setMyCountyObject] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/county`)
      .then((res) => {
        console.log(res);
        const list = res.data.message;
        setCountyList(list);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (myCountyString && countyList.length > 0) {
      setMyCountyObject(
        countyList.filter((ele) => ele.county_name === myCountyString)
      );
    }
  }, [myCountyString, countyList]);

  return (
    <div className="county-info-container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          id="standard-basic"
          label="Search County"
          value={myCountyString}
          onChange={(e) => setMyCountyString(e.target.value)}
        />
      </div>

      {myCountyObject && <pre>{JSON.stringify(myCountyObject, null, 2)}</pre>}
      {myCountyObject && <StateInfo stateName={myCountyObject.state_name} />}
    </div>
  );
};

export default CountyInfo;
