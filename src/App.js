import React, { useState, useEffect } from "react";
import "./App.css";
import MainView from "./MainView";

let data = [];

function App() {
  const [requireFetch, setRequireFetch] = useState(false);
  // const [requireRerender, setRequireRerender] = useState(false);
  const [isLoading, setLoading] = useState(true);
  console.log(process.env.REACT_APP_API_URL);
  return <MainView />;
}

export default App;
