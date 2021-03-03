import React from "react";
import { Combobox } from "evergreen-ui";
import { stateAbbrev } from "../data/stateAbbrev";

const LocationForm = ({
  currentState,
  setState,
  countyList,
  setCounty,
  currentCounty,
}) => {
  const stateListFormatted = stateAbbrev.map(
    (ele) => `${ele.name} (${ele.abbreviation})`
  );
  const countyListFormatted = countyList && [
    ...new Set(countyList.map((county) => county.county)),
  ];
  return (
    <>
      <Combobox
        style={{ marginBottom: "10px" }}
        items={stateListFormatted}
        onChange={(selected) => setState(selected)}
        selectedItem={currentState}
        placeholder="State"
        autocompleteProps={{
          title: "State",
        }}
      />
      <Combobox
        items={countyListFormatted}
        onChange={(selected) => setCounty(selected)}
        selectedItem={currentCounty}
        placeholder="County"
        autocompleteProps={{
          title: "County",
        }}
        disabled={!(currentState && countyList)}
      />
    </>
  );
};

export default LocationForm;
