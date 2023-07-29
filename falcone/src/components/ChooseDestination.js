import "./ChooseDestination.css";
import { useState, useEffect } from "react";

const ChooseDestination = ({ index, numSelected, setNumSelected }) => {
  const [disable, setDisable] = useState(true);
  const [disableRadio, setDisableRadio] = useState(true);

  const handleRadioClick = () => {
    setNumSelected((prev) => {
      return prev + 1;
    });
    // setDisableRadio(true);
  };

  useEffect(() => {
    if (index == numSelected + 1) {
      setDisable(false);
    } else {
      setDisable(true);
    }

    // if (index > numSelected + 1) {
    //   setDisableRadio(true);
    // } else {
    //   setDisableRadio(false);
    // }
  }, [numSelected]);

  return (
    <div>
      <div className="dropdown">
        <h5>Destination {index}</h5>
        <select
          name="planets"
          id="planets"
          onChange={() => {
            setDisableRadio(false);
          }}
          className="select-tag"
          disabled={disable}
          defaultValue={"default"}
        >
          <option value="default" disabled>
            Select a planet
          </option>
          <option value="planet1">planet</option>
          <option value="planet2">planet</option>
          <option value="planet3">planet</option>
        </select>

        {!disableRadio && (
          <div className="dropdown">
            <label for="pod1">
              <input
                type="radio"
                id="pod1"
                name={`${index}pod`}
                disabled={disable}
                onClick={() => {
                  handleRadioClick();
                }}
              />
              pod
            </label>

            <label for="pod2">
              <input
                type="radio"
                id="pod2"
                name={`${index}pod`}
                disabled={disable}
                onClick={() => {
                  handleRadioClick();
                }}
              />
              pod
            </label>

            <label for="pod3">
              <input
                type="radio"
                id="pod3"
                name={`${index}pod`}
                disabled={disable}
                onClick={() => {
                  handleRadioClick();
                }}
              />
              pod
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseDestination;
