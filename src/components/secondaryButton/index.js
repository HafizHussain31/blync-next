
import React from "react";
import "./styles.scss";

const SecondaryButton = ({
  label,
  onClick,
  disable,
  icon,
  className = ''
}) => {
  return (
    <div>
      <button
        className={`secondary-btn ${className}`}
        onClick={onClick}
        disabled={disable}
      >
        {icon != null && <img src={icon} className="left-icon"/>}
        <span className="btn-label">{label}</span>
      </button>
    </div>
  );
};

export default SecondaryButton;