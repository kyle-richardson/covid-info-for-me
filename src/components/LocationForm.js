import React from "react";
import { Combobox } from "evergreen-ui";
import { stateAbbrev } from "../data/stateAbbrev";

const LocationForm = ({ currentState, setState, countyList, setCounty }) => {
  const stateListFormatted = stateAbbrev.map(
    (ele) => `${ele.name} (${ele.abbreviation})`
  );
  const countyListFormatted = countyList && [
    ...new Set(countyList.map((county) => county.county_name)),
  ];
  return (
    <>
      <Combobox
        style={{ marginBottom: "10px" }}
        items={stateListFormatted}
        onChange={(selected) => setState(selected)}
        placeholder="State"
        autocompleteProps={{
          // Used for the title in the autocomplete.
          title: "State",
        }}
      />
      <Combobox
        items={countyListFormatted}
        onChange={(selected) => setCounty(selected)}
        placeholder="County"
        autocompleteProps={{
          // Used for the title in the autocomplete.
          title: "County",
        }}
        disabled={!currentState || !countyList}
      />
    </>
  );
};

export default LocationForm;
