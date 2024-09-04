import "./ToggleSwitch.css";

function ToggleSwitch({ handleToggleSwitch }) {
  return (
    <>
      <input
        className="ToggleSwitch__input"
        type="checkbox"
        onChange={handleToggleSwitch}
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
