import React from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const tempUnit = React.useContext(CurrentTemperatureUnitContext);
  console.log(tempUnit);

  return (
    <>
      <input
        className="ToggleSwitch__input"
        type="checkbox"
        onChange={tempUnit.handleToggleSwitch}
        id="temp-switch"
      ></input>
      <label className="ToggleSwitch__label" htmlFor="temp-switch">
        <p className="ToggleSwitch__left">F</p>
        <span className="ToggleSwitch__span"></span>
        <p className="ToggleSwitch__right">C</p>
      </label>
    </>
  );
}

export default ToggleSwitch;
