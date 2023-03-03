import React from "react";
import "./style.scss";

const SwitchButton = ({ checked, onChange }) => {
  return (
    <label className="switch-btn" htmlFor="input-switch">
      <input
        className="switch-btn__input"
        id="input-switch"
        name="input-switch"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="switch-slider switch-slider--round"></span>
    </label>
  );
};

export default SwitchButton;
