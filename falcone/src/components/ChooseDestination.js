import "./ChooseDestination.css";
import { useState, useEffect } from "react";

const ChooseDestination = ({
  index,
  numSelected,
  setNumSelected,
  allData,
  chosenData,
  setChosenData,
  setTimeTaken,
  reset,
}) => {
  const [disable, setDisable] = useState(true);
  const [disableRadio, setDisableRadio] = useState(true);
  useEffect(() => {
    setDisableRadio(true);
  }, [reset]);

  const handleRadioClick = (ele) => {
    setChosenData((prev) => {
      return {
        vehicles: [...prev.vehicles, ele.name],
        planets: prev.planets,
      };
    });
    setNumSelected((prev) => {
      return prev + 1;
    });
    let distance = getCurDistance();
    let time = distance / ele.speed;
    setTimeTaken((prev) => prev + time);
  };

  const handleSelectChange = (e) => {
    setDisableRadio(false);

    setChosenData((prev) => {
      let planetArray = prev.planets;
      planetArray = planetArray.slice(0, index - 1);
      return {
        vehicles: prev.vehicles,
        planets: [...planetArray, e.target.value],
      };
    });
  };

  const getCurDistance = () => {
    let planet = chosenData.planets[chosenData.planets.length - 1];
    let distance;
    for (let i = 0; i < allData.planets.length; i++) {
      if (planet === allData.planets[i].name) {
        distance = allData.planets[i].distance;
        break;
      }
    }
    return distance;
  };

  const vehicleIsValid = (ele) => {
    let disableVehicle = disable;
    let numVehicle = ele.total_no;
    for (let i = 0; i < chosenData.vehicles.length; i++) {
      if (chosenData.vehicles[i] === ele.name) {
        numVehicle -= 1;
      }
    }
    if (numVehicle === 0) {
      disableVehicle = true;
    }
    if (ele.max_distance < getCurDistance()) {
      disableVehicle = true;
    }
    return [disableVehicle, numVehicle];
  };

  useEffect(() => {
    if (index == numSelected + 1) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [numSelected]);

  return (
    <div className="dropdown">
      <h5>Destination {index}</h5>
      <select
        name="planets"
        id="planets"
        onChange={(e) => {
          handleSelectChange(e);
        }}
        className="select-tag"
        disabled={disable}
        defaultValue={"default"}
      >
        <option value="default" disabled>
          Select a planet
        </option>
        {allData.planets.map((ele) => {
          let disablePlanet = false;
          for (let i = 0; i < chosenData.planets.length; i++) {
            if (ele.name === chosenData.planets[i]) {
              disablePlanet = true;
              break;
            }
          }
          return (
            <option value={ele.name} disabled={disablePlanet}>
              {ele.name}
            </option>
          );
        })}
      </select>

      {!disableRadio && (
        <div className="dropdown">
          {allData.vehicles.map((ele) => {
            let [disableVehicle, numVehicle] = vehicleIsValid(ele);
            return (
              <label for={ele.name}>
                <input
                  type="radio"
                  id={ele.name}
                  name={`${index}pod`}
                  disabled={disableVehicle}
                  onClick={() => {
                    handleRadioClick(ele);
                  }}
                />
                {ele.name + ` (${numVehicle})`}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChooseDestination;
