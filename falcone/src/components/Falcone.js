import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import Box from "@mui/material";
import { configEndpoint } from "../App";
import ChooseDestination from "./ChooseDestination";
import "./Falcone.css";

const getData = async (setData) => {
  let result = await axios.get(`${configEndpoint}/planets`);
  setData((prev) => {
    return { ...prev, planets: result.data };
  });
  result = await axios.get(`${configEndpoint}/vehicles`);
  setData((prev) => {
    return { ...prev, vehicles: result.data };
  });
  //return result.data
};

// const getVehicles = async (setData) => {
//   let result = await axios.get(`${configEndpoint}/vehicles`);
//   setData(result.data);
//   //return result.data
// };

const apiCall = async () => {
  let planets = ["Donlon", "Enchai", "Pingasor", "Chapir"];
  let vehicle = ["Space pod", "Space rocket", "Space rocket", "Space rocket"];
  let result = await axios.get(`${configEndpoint}/planets`);
  let result2 = await axios.get(`${configEndpoint}/vehicles`);
  let result3 = await axios.post(
    `${configEndpoint}/token`,
    {},
    {
      headers: { Accept: "application/json" },
    }
  );
  let result4 = await axios.post(
    `${configEndpoint}/find`,
    {
      token: result3.data.token,
      planet_names: planets,
      vehicle_names: vehicle,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  console.log(result.data);
  console.log("POST", result3);
};

const createDestinationArray = (
  numSelected,
  setNumSelected,
  allData,
  chosenData,
  setChosenData,
  setTimeTaken
) => {
  let result = [];
  for (let i = 1; i <= 4; i++) {
    result.push(
      <ChooseDestination
        index={i}
        numSelected={numSelected}
        setNumSelected={setNumSelected}
        allData={allData}
        chosenData={chosenData}
        setChosenData={setChosenData}
        setTimeTaken={setTimeTaken}
      />
    );
  }
  return result;
};

const handleFindFalcone = async (
  chosenData,
  timeTaken,
  setTotalTime,
  setPlanetFound,
  navigate
) => {
  let result = await axios.post(
    `${configEndpoint}/token`,
    {},
    {
      headers: { Accept: "application/json" },
    }
  );
  result = await axios.post(
    `${configEndpoint}/find`,
    {
      token: result.data.token,
      planet_names: chosenData.planets,
      vehicle_names: chosenData.vehicles,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (result.data.status === "success") {
    setTotalTime(timeTaken);
    setPlanetFound(result.data.planet_name);
    navigate("/");
  } else {
    navigate("/");
  }
};

const Falcone = ({ setTotalTime, setPlanetFound }) => {
  const [allData, setAllData] = useState({ planets: [], vehicles: [] });
  //const [allVehicles, setAllVehicles] = useState();
  const [chosenData, setChosenData] = useState({ planets: [], vehicles: [] });
  const [timeTaken, setTimeTaken] = useState(0);
  //const [chosenVehicles, setChosenVehicles] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getData(setAllData);
    //getVehicles(setData)
  }, []);
  //apiCall();
  const [numSelected, setNumSelected] = useState(0);
  return (
    <div className="falcone">
      <Header />
      <h1>Finding Falcone!</h1>
      <h3>Select planets you want to search in:</h3>
      <div className="destination-array">
        {createDestinationArray(
          numSelected,
          setNumSelected,
          allData,
          chosenData,
          setChosenData,
          setTimeTaken
        )}
        <div>Time Taken:{timeTaken}</div>
      </div>
      <button
        disabled={numSelected < 4}
        onClick={() => {
          handleFindFalcone(
            chosenData,
            timeTaken,
            setTotalTime,
            setPlanetFound,
            navigate
          );
        }}
      >
        Find Falcone!
      </button>
      <Footer />
    </div>
  );
};

export default Falcone;
