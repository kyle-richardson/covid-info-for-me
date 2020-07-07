import React from "react";
import "./App.css";
import CountyInfo from "./components/CountyInfo";

function App() {
  return (
    <div className="App">
      <h1>COVID info for me</h1>
      <CountyInfo />
    </div>
  );
}

export default App;
