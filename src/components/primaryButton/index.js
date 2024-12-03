import React from "react";
import "./styles.scss";

const PrimaryButton = ({
  label,
  onClick,
  disable,
  type="submit",
  className = '',
}) => {
  return (
    <div>
      <button
        className={`login-btn ${className}`}
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
