import logo from "./logo.svg";
import "./App.css";
import Falcone from "./components/Falcone";
import Result from "./components/Result";
import { useState, useEffect } from "react";
import { Redirect, Route, Routes, BrowserRouter } from "react-router";

export const configEndpoint = "https://findfalcone.geektrust.com";

function App() {
  const [planetFound, setPlanetFound] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [reset, setReset] = useState(0);
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Falcone
              setTotalTime={setTotalTime}
              setPlanetFound={setPlanetFound}
              reset={reset}
              setReset={setReset}
            />
          }
        />

        <Route
          exact
          path="/result"
          element={
            <Result
              totalTime={totalTime}
              planetFound={planetFound}
              setReset={setReset}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
