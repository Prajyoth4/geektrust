import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useState } from "react";
//import Box from "@mui/material";
import { configEndpoint } from "../App";
import ChooseDestination from "./ChooseDestination";
import "./Falcone.css";

const apiCall = async () => {
  let result = await axios.get(configEndpoint);
  console.log(result.data);
};

const createDestinationArray = (numSelected, setNumSelected) => {
  let result = [];
  for (let i = 1; i <= 4; i++) {
    result.push(
      <ChooseDestination
        index={i}
        numSelected={numSelected}
        setNumSelected={setNumSelected}
      />
    );
  }
  return result;
};

const Falcone = () => {
  const [numSelected, setNumSelected] = useState(0);
  return (
    <div className="falcone">
      <Header />
      <h1>Finding Falcone!</h1>
      <h3>Select planets you want to search in:</h3>
      <div className="destination-array">
        {createDestinationArray(numSelected, setNumSelected)}
      </div>
      <button>Find Falcone!</button>
      <Footer />
    </div>
  );
};

export default Falcone;
