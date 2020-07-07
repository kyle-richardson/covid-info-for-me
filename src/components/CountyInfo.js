import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import StateInfo from "./StateInfo";

const CountyInfo = () => {
  const [countyList, setCountyList] = useState([]);
  const [myCountyForm, setMyCountyForm] = useState("");
  const [myCountyString, setMyCountyString] = useState("");
  const [myCountyObject, setMyCountyObject] = useState("");
  const [myStateForm, setMyStateForm] = useState("");
  const [myStateString, setMyStateString] = useState("");
  const [errors, setErrors] = useState({
    county: "",
    state: "",
  });

  const setValues = (e) => {
    e.preventDefault();
    setMyCountyString(myCountyForm);
    setMyStateString(myStateForm);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/county`)
      .then((res) => {
        const list = res.data.message;
        setCountyList(list);
      })
      .catch((err) => {
        setErrors({
          ...errors,
          county: "Could not fetch county data. Try again later.",
        });
      });
  }, []);

  useEffect(() => {
    if (myCountyString && myStateString && countyList.length > 0) {
      const filtered = countyList.filter(
        (ele) =>
          ele.county_name.toLowerCase() === myCountyString.toLowerCase() &&
          ele.state_name.toLowerCase() === myStateString.toLowerCase()
      );
      if (filtered.length > 0) {
        setMyCountyObject(filtered);
        setErrors({
          ...errors,
          county: "",
        });
      } else
        setErrors({
          ...errors,
          county: "Could not find a county by that name in selected state.",
        });
    }
  }, [myCountyString, countyList, myStateString]);

  return (
    <div className="county-info-container">
      {errors.county && <p style={{ color: "red" }}>{errors.county}</p>}
      {errors.state && <p style={{ color: "red" }}>{errors.state}</p>}
      <form
        onSubmit={(e) => setValues(e)}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TextField
          required
          id="standard-basic"
          label="County"
          value={myCountyForm}
          onChange={(e) => setMyCountyForm(e.target.value)}
        />
        <TextField
          required
          id="standard-basic"
          label="State"
          value={myStateForm}
          onChange={(e) => setMyStateForm(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
      {myCountyObject && <h3>{`County: ${myCountyString}`}</h3>}
      {myCountyObject && <pre>{JSON.stringify(myCountyObject, null, 2)}</pre>}
      {myCountyObject && (
        <StateInfo
          stateName={myStateString}
          setErrors={setErrors}
          errors={errors}
        />
      )}
    </div>
  );
};

export default CountyInfo;
