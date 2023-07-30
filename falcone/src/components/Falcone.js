import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { configEndpoint } from "../App";
import ChooseDestination from "./ChooseDestination";
import "./Falcone.css";

const numOfPlanetsToChoose = 4;

const getData = async (setData) => {
  try {
    let result = await axios.get(`${configEndpoint}/planets`);
    setData((prev) => {
      return { ...prev, planets: result.data };
    });

    result = await axios.get(`${configEndpoint}/vehicles`);
    setData((prev) => {
      return { ...prev, vehicles: result.data };
    });
  } catch (err) {
    if (err.response) {
      alert(err.response.data.error);
    } else {
      alert("Error in API call");
    }
  }
};

const createDestinationArray = (
  numSelected,
  setNumSelected,
  allData,
  chosenData,
  setChosenData,
  setTimeTaken,
  reset
) => {
  let result = [];
  for (let i = 1; i <= numOfPlanetsToChoose; i++) {
    result.push(
      <ChooseDestination
        index={i}
        numSelected={numSelected}
        setNumSelected={setNumSelected}
        allData={allData}
        chosenData={chosenData}
        setChosenData={setChosenData}
        setTimeTaken={setTimeTaken}
        reset={reset}
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
  try {
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
      navigate("/result");
    } else {
      setTotalTime(timeTaken);
      setPlanetFound("");
      navigate("/result");
    }
  } catch (err) {
    if (err.response) {
      alert(err.response.data.error);
    } else {
      alert("Error in Api call");
    }
  }
};

const Falcone = ({ setTotalTime, setPlanetFound, reset, setReset }) => {
  const [allData, setAllData] = useState({ planets: [], vehicles: [] });
  const [chosenData, setChosenData] = useState({ planets: [], vehicles: [] });
  const [timeTaken, setTimeTaken] = useState(0);
  const [numSelected, setNumSelected] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getData(setAllData);
  }, []);

  useEffect(() => {
    console.log("Reset value changed");
    setNumSelected(0);
    setTimeTaken(0);
    setChosenData({ planets: [], vehicles: [] });
  }, [reset]);

  return (
    <div className="falcone">
      <Header setReset={setReset} />
      <h1>Finding Falcone!</h1>
      <h3>Select planets you want to search in:</h3>
      <div className="content">
        <div className="destination-array">
          {createDestinationArray(
            numSelected,
            setNumSelected,
            allData,
            chosenData,
            setChosenData,
            setTimeTaken,
            reset
          )}
          <h3>Time Taken:{timeTaken}</h3>
        </div>
        <button
          disabled={numSelected < numOfPlanetsToChoose}
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
      </div>
      <Footer />
    </div>
  );
};

export default Falcone;
