import React, { useState, useEffect } from "react";
import "./App.css";
import MainView from "./MainView";

let data = [];

function App() {
  const [requireFetch, setRequireFetch] = useState(false);
  // const [requireRerender, setRequireRerender] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const getData = () => {
    fetch("http://localhost:8080/getFileData")
      .then((response) => response.json())
      .then((response) => {
        console.log("Trying to fetch data");
        data[0] = response.Sensor1;
        data[1] = response.Sensor2;
        data[2] = response.Sensor3;
        data[3] = response.Sensor4;
        data[4] = response.Sensor5;
        data[5] = response.Sensor6;
        data[6] = response.Sensor7;
        data[7] = response.Sensor8;
        data[8] = response.Sensor9;
        data[9] = response.Sensor10;
        data[10] = response.Sensor11;
        data[11] = response.Sensor12;
        data[12] = response.Sensor13;
        data[13] = response.Sensor14;
        data[14] = response.Sensor15;
        data[15] = response.Sensor16;
        setLoading(false);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  // if (isLoading)
  //   return (
  //     <div>
  //       <h1> fetching data from the server </h1>
  //     </div>
  //   );

  return <MainView refetch={getData} data={data} requireRerender />;
}

export default App;
