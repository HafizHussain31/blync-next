import React from "react";
import "./styles.scss";

const PrimaryButton = ({
  label,
  onClick,
  loginBtn,
  disable,
  cancelBtn,
  secondaryBtn,
  secondaryBtnBg,
  type="submit",
  mainBg,
}) => {
  return (
    <div>
      <button
        className={`login-btn`}
        type={type}
        onClick={onClick}
        disabled={disable}
      >
        <span className="btn-label">{label}</span>
      </button>
    </div>
  );
};

export default PrimaryButton;
